import path from 'path'
import { test, expect, Page } from '@playwright/test'
import axios from 'axios'

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

test.describe('Photo Save Workflow For Md Layout', () => {
  test.beforeEach(async () => {
    await page.setViewportSize({ width: 375, height: 720 })
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    await page.getByRole('link', { name: '摩' }).nth(0).click()

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
      const response = await axios.get('http://localhost:3000/api/v1/photos/find', {
        params: {
          // 1だとコンフリクトするため3にする
          sutraId: 3,
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
      console.error('Error occurred during API request:', error)
    }
  })

  test('should return to reselection mode when clicked reselect-file-input-button', async () => {
    await page.waitForSelector('[data-testid="reselect-file-input-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('reselect-file-input-button').click()

    const content = await page.textContent('h1')
    expect(content).toContain('摩')
  })

  test('should return to cropping mode when clicked cancel-photo-button', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="cancel-photo-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('cancel-photo-button').click()

    await page.waitForSelector('[data-testid="reselect-file-input-button"]', {
      timeout: 60000,
    })
    const text = await page.textContent('[data-testid="reselect-file-input-button"]')
    expect(text).toMatch('写真を再選択')
  })

  test('should successfully save photo', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="save-photo-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('save-photo-button').click()

    await page.waitForSelector('[data-testid="photo-address-for-md-layout"]', {
      timeout: 60000,
    })
    const text = await page.textContent('[data-testid="photo-address-for-md-layout"]')
    expect(text).toMatch(/住所/)
  })

  test('should return to reselection mode when clicked reselect-file-input-after-saving-photo-button-for-md-layout after saving photo', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="save-photo-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('save-photo-button').click()

    await page.waitForSelector(
      '[data-testid="reselect-file-input-after-saving-photo-button-for-md-layout"]',
      {
        timeout: 60000,
      },
    )
    await page.getByTestId('reselect-file-input-after-saving-photo-button-for-md-layout').click()
    const content = await page.textContent('h1')
    expect(content).toContain('摩')
  })

  test('should successfully delete photo', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="save-photo-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('save-photo-button').click()

    await page.waitForSelector('[data-testid="delete-photo-button-for-md-layout"]', {
      timeout: 60000,
    })
    await page.getByTestId('delete-photo-button-for-md-layout').click()

    await page.waitForSelector('[data-testid="delete-photo-cancel-button-for-md-layout"]', {
      timeout: 60000,
    })
    await page.getByTestId('delete-photo-cancel-button-for-md-layout').click()

    await page.waitForSelector('[data-testid="delete-photo-button-for-md-layout"]', {
      timeout: 60000,
    })
    await page.getByTestId('delete-photo-button-for-md-layout').click()

    await page.waitForSelector('[data-testid="delete-photo-confirm-button-for-md-layout"]', {
      timeout: 60000,
    })
    await page.getByTestId('delete-photo-confirm-button-for-md-layout').click()

    const thirdKanjiElement = page.locator('[data-testid="kanji"]').nth(2)
    const content = await thirdKanjiElement.textContent()
    expect(content).toContain('摩')
  })
})
