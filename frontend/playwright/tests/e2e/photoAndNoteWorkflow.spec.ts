import path from 'path'
import { test, expect, Page } from '@playwright/test'
import axios from 'axios'

let page: Page

// Rails API の delete処理がバッティングするため、Serial mode で実行する
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

test.describe('Photo Save Workflow For Over Md Layout', () => {
  test.beforeEach(async () => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    await page.getByRole('link', { name: '仏' }).nth(0).click()
    await page.waitForSelector('[data-testid="file-input"]')
    // `ファイルを選択`ボタンのクリック操作は不要。以下isVisible()を実行すると自動的にinput操作が実行されるため。
    const fileInputVisible = await page.getByRole('button').isVisible()

    if (!fileInputVisible) {
      await page.waitForSelector('input[type="file"]', { timeout: 10000 })
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
          sutraId: 1,
          userId: 1,
        },
      })
      // responseが空の場合は何もせず終了する
      if (!response.data.photo_id) {
        return
      }
      const photoId = response.data.photo_id
      const deleteResponse = await axios.delete(`http://localhost:3000/api/v1/photos/${photoId}`)
      expect(deleteResponse.status).toBe(204)
    } catch (error) {
      // エラー発生しても何もしない。delete処理を実行したいだけ。
    }
  })

  test('should return to reselection mode when clicked reselect-file-input-button', async () => {
    await page.waitForSelector('[data-testid="reselect-file-input-button"]')
    await page.getByTestId('reselect-file-input-button').click()

    const content = await page.textContent('h1')
    expect(content).toContain('仏')
  })

  test('should return to cropping mode when clicked cancel-photo-button', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]')
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="cancel-photo-button"]')
    await page.getByTestId('cancel-photo-button').click()

    await page.waitForSelector('[data-testid="reselect-file-input-button"]')
    const text = await page.textContent('[data-testid="reselect-file-input-button"]')
    expect(text).toMatch('写真を再選択')
  })

  test('should successfully save photo', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]')
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="save-photo-button"]')
    await page.getByTestId('save-photo-button').click()

    await page.waitForSelector('[data-testid="photo-address-for-over-md-layout"]')
    const text = await page.textContent('[data-testid="photo-address-for-over-md-layout"]')
    expect(text).toMatch(/住所/)
  })

  test('should successfully delete photo', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]')
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="save-photo-button"]')
    await page.getByTestId('save-photo-button').click()

    await page.waitForSelector('[data-testid="delete-photo-button-for-over-md-layout"]')
    await page.getByTestId('delete-photo-button-for-over-md-layout').click()

    await page.waitForSelector('[data-testid="delete-photo-cancel-button-for-over-md-layout"]')
    await page.getByTestId('delete-photo-cancel-button-for-over-md-layout').click()

    await page.waitForSelector('[data-testid="delete-photo-button-for-over-md-layout"]')
    await page.getByTestId('delete-photo-button-for-over-md-layout').click()

    await page.waitForSelector('[data-testid="delete-photo-confirm-button-for-over-md-layout"]')
    await page.getByTestId('delete-photo-confirm-button-for-over-md-layout').click()

    const content = await page.textContent('[data-testid="kanji"]')
    expect(content).toContain('仏')
    await page.screenshot({ path: 'playwright/screenshots/example.png' })
  })

  test('should return to reselection mode when clicked reselection-file-input-after-saving-photo-button-for-over-md-layout after saving photo', async () => {
    await page.waitForSelector('[data-testid="file-input-confirm-button"]')
    await page.getByTestId('file-input-confirm-button').click()

    await page.waitForSelector('[data-testid="save-photo-button"]')
    await page.getByTestId('save-photo-button').click()

    await page.waitForSelector(
      '[data-testid="reselection-file-input-after-saving-photo-button-for-over-md-layout"]',
    )
    await page
      .getByTestId('reselection-file-input-after-saving-photo-button-for-over-md-layout')
      .click()
    const content = await page.textContent('h1')
    expect(content).toContain('仏')
    await page.screenshot({ path: 'playwright/screenshots/example.png' })
  })
})
