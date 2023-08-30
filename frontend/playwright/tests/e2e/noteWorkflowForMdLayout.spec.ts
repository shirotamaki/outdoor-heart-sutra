import path from 'path'
import { test, expect, Page } from '@playwright/test'
import axios from 'axios'
import { baseURL } from 'playwright/config/index'

let page: Page

// Rails API の delete処理がコンフリクトするため、Serial mode で実行する
test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext({
    geolocation: { latitude: 35.693556495897084, longitude: 139.74965396281837 },
  })

  page = await context.newPage()

  await context.route('*/**/api/v1/sutras', async (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: 'mocked data' }),
    })
  })

  await context.grantPermissions(['geolocation'], { origin: 'http://localhost:4000' })
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Note Workflow For Md Layout', () => {
  test.beforeEach(async () => {
    await page.setViewportSize({ width: 375, height: 720 })
    await page.goto(baseURL)
    await page.waitForLoadState('domcontentloaded')

    await page.getByRole('link', { name: '訶' }).nth(0).click()

    await page.waitForSelector('[data-testid="file-input"]', {
      timeout: 60000,
    })

    // `ファイルを選択`ボタンのクリック操作は不要。PlaywrightはisVisible()を呼び出すときに自動的にinput操作を実行するため。
    const fileInputVisible = await page.getByTestId('file-input').isVisible()

    if (!fileInputVisible) {
      await page.waitForSelector('input[type="file"]', { timeout: 60000 })
    }

    await page.setInputFiles(
      'input[type = "file"]',
      path.resolve(__dirname, '../fixtures/test_image.png'),
    )
  })

  test.afterEach(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/find_photos', {
        params: {
          sutraId: 4, // 訶
          userId: 1,
        },
      })
      // responseが空の場合は何もせず終了する。これにより、テストが不必要なdelete操作を試みるのを防ぐ。
      if (!response.data.photo_id) {
        return
      }
      const photoId = await response.data.photo_id
      const deleteResponse = await axios.delete(`http://localhost:3000/api/v1/photos/${photoId}`)
      expect(deleteResponse.status).toBe(204)
    } catch (error) {
      // photoの削除を行うことが目的。Rails APIを叩いても事前にphotoを保存していない場合はエラーが返ってくる。そのためエラーが発生した場合は無視する。
      // デバッグ時にコメントアウトを解除する
      // console.error('Error occurred during API request:', error)
    }
  })

  test('should save and edit note correctly', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="save-photo-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('save-photo-button').click()

    await page.waitForSelector('[data-testid="note-textarea-for-md-layout"]', {
      timeout: 60000,
    })

    await page.getByTestId('note-textarea-for-md-layout').click()
    await page.fill('[data-testid="note-textarea-for-md-layout"]', 'This is sample note.')
    await page.click('[data-testid="save-note-button-for-md-layout"] >> button')

    await page.waitForSelector('.Toastify__toast', { state: 'hidden' })

    await page.waitForSelector(
      '[data-testid="saved-note-for-md-layout"]:has-text("This is sample note.")',
      {
        timeout: 60000,
      },
    )
    const firstTextarea = await page.textContent('[data-testid="saved-note-for-md-layout"]')
    expect(firstTextarea).toContain('This is sample note.')

    await page.getByTestId('edit-note-button-for-md-layout').click()
    await page.getByTestId('note-textarea-for-md-layout').click()
    await page.fill('[data-testid="note-textarea-for-md-layout"]', 'This is edited note.')
    await page.click('[data-testid="save-note-button-for-md-layout"] >> button')

    await page.waitForSelector('.Toastify__toast', { state: 'hidden' })

    await page.waitForSelector('[data-testid="saved-note-for-md-layout"]', {
      timeout: 60000,
    })
    const editedTextarea = await page.textContent('[data-testid="saved-note-for-md-layout"]')
    expect(editedTextarea).toContain('This is edited note.')
  })
})
