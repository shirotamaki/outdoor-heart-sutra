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

test.describe('Footer Navigation Links', () => {
  test('should navigate to terms-of-service page when terms-of-service-link is clicked', async () => {
    await page.goto(baseURL)
    await page.getByRole('link', { name: '利用規約' }).click()
    await page.waitForSelector('[data-testid="terms-of-service"]', {
      timeout: 60000,
    })
    const content = await page.textContent('h1')
    expect(content).toContain('利用規約')
  })

  test('should navigate to privacy-policy page when privacy-policy-link is clicked', async () => {
    await page.goto(baseURL)
    await page.getByRole('link', { name: 'プライバシーポリシー' }).click()
    await page.waitForSelector('[data-testid="privacy-policy"]', {
      timeout: 60000,
    })
    const content = await page.textContent('h1')
    expect(content).toContain('プライバシーポリシー')
  })

  test('should have correct url for twitter-link', async () => {
    await page.goto(baseURL)
    const twitterLink = await page.getByTestId('twitter-link').getAttribute('href')
    expect(twitterLink).toBe('https://twitter.com/od_heart_sutra')
  })

  test('should have correct url for github-link', async () => {
    await page.goto(baseURL)
    const githubLink = await page.getByTestId('github-link').getAttribute('href')
    expect(githubLink).toBe('https://github.com/shirotamaki/outdoor-heart-sutra')
  })

  test('should have correct url for suzuri-link', async () => {
    await page.goto(baseURL)
    const suzuriLink = await page.getByTestId('suzuri-link').getAttribute('href')
    expect(suzuriLink).toBe('https://suzuri.jp/od_heart_sutra')
  })
})
