import { test, expect, Page } from '@playwright/test'
import { baseURL } from 'playwright/config/index'

let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Welcome Navigation Links', () => {
  test.beforeEach(async () => {
    await page.goto(baseURL)
    await page.getByTestId('desktop-menu-link').getByText('ログアウト').click()
    await page.waitForURL('http://localhost:4000', {
      timeout: 60000,
    })
    await page.waitForSelector('[data-testid="how-to-use-link"]', {
      timeout: 60000,
    })
    await page.getByTestId('how-to-use-link').getByText('使い方').click()
    await page.waitForURL('http://localhost:4000/how-to-use', {
      timeout: 60000,
    })
  })

  test('should navigate to how-to-use page when how-to-use-link is clicked', async () => {
    await page.waitForSelector('[data-testid="welcome-page-from-how-to-use-page"]', {
      timeout: 60000,
    })
    const content = await page.textContent('[data-testid="welcome-page-from-how-to-use-page"]')
    expect(content).toContain('トップページに戻る')
  })

  test('should navigate to welcome page when welcome-page-from-how-to-use-page is clicked', async () => {
    await page
      .getByTestId('welcome-page-from-how-to-use-page')
      .getByText('トップページに戻る')
      .click()
    await page.waitForURL('http://localhost:4000', {
      timeout: 60000,
    })
    await page.waitForSelector('[data-testid="how-to-use-link"]', {
      timeout: 60000,
    })
    const content = await page.textContent('[data-testid="how-to-use-link"]')
    expect(content).toContain('使い方')
  })
})
