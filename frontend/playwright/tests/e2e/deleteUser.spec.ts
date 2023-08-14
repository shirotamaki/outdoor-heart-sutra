import { test, expect, Page } from '@playwright/test'
import { baseURL } from 'playwright/config/index'

let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()

  await page.route('*/**/api/v1/sutras', async (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: 'mocked data' }),
    })
  })
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Delete User', () => {
  test('should cancel user deletion when the cancel button is selected', async () => {
    await page.goto(baseURL)
    await page.getByRole('link', { name: 'マイページ' }).click()
    await page.waitForURL('http://localhost:4000/mypage', {
      timeout: 60000,
    })
    await page.getByRole('link', { name: '退会する' }).click()
    await page.waitForSelector('[data-testid="delete-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('delete-button').click()
    await page.waitForSelector('[data-testid="delete-user-cancel-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('delete-user-cancel-button').click()
    await page.waitForSelector('[data-testid="delete-button"]', {
      timeout: 60000,
    })
    const content = await page.textContent('[data-testid="delete-button"]')
    expect(content).toContain('アカウントを削除する')
  })

  // ユーザー情報を削除完了できたか確認するテストはバックエンドのリクエストスペックに任せる
  // backend/spec/requests/api/v1/users_api_spec.rb
  test('should user deletion when the decision button is selected', async () => {
    await page.goto(baseURL)
    await page.getByRole('link', { name: 'マイページ' }).click()
    await page.waitForURL('http://localhost:4000/mypage', {
      timeout: 60000,
    })
    await page.getByRole('link', { name: '退会する' }).click()
    await page.waitForSelector('[data-testid="delete-button"]', {
      timeout: 60000,
    })
    await page.getByTestId('delete-button').click()
    await page.waitForSelector('[data-testid="delete-user-confirm-button"]', {
      timeout: 60000,
    })
    const content = await page.textContent('[data-testid="delete-user-confirm-button"]')
    expect(content).toContain('はい')
  })
})
