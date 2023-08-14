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

test.describe('HomeButton navigation on different viewport sizes', () => {
  test('should navigate to home page when homebutton-xl-link is clicked', async () => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto(`${baseURL}/about`)
    await page.click('[data-testid="homebutton-xl-link"]')
    await page.waitForURL('http://localhost:4000', {
      timeout: 60000,
    })
    const content = await page.textContent('[data-testid="kanji"]')
    expect(content).toContain('仏')
  })

  test('should navigate to home page when homebutton-md-link is clicked', async () => {
    await page.setViewportSize({ width: 768, height: 720 })
    await page.goto(`${baseURL}/about`)
    await page.click('[data-testid="homebutton-md-link"]')
    await page.waitForURL('http://localhost:4000', {
      timeout: 60000,
    })
    const content = await page.textContent('[data-testid="kanji"]')
    expect(content).toContain('仏')
  })

  test('should navigate to home page when homebutton-sm-link is clicked', async () => {
    await page.setViewportSize({ width: 375, height: 720 })
    await page.goto(`${baseURL}/about`)
    await page.click('[data-testid="homebutton-sm-link"]')
    await page.waitForURL('http://localhost:4000', {
      timeout: 60000,
    })
    const content = await page.textContent('[data-testid="kanji"]')
    expect(content).toContain('仏')
  })
})
