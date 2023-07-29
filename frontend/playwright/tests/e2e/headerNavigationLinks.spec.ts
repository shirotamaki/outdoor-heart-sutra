import { test, expect, Page } from '@playwright/test'

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

test.describe('Header Desktop Menu Navigation Links', () => {
  test.beforeEach(async () => {
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('should navigate to maps page when maps-link is clicked', async () => {
    await page.goto('/')
    await page.getByRole('link', { name: '全体地図' }).click()
    await page.waitForURL('http://localhost:4000/maps')
    const currentURL = page.url()
    expect(currentURL).toBe('http://localhost:4000/maps')
  })

  test('should navigate to about page when about-link is clicked', async () => {
    await page.goto('/')
    await page.getByRole('link', { name: '説明' }).click()
    await page.waitForURL('http://localhost:4000/about')
    const content = await page.textContent('h1')
    expect(content).toContain('アウトドア般若心経とは...')
  })

  test('should navigate to mypage page when mypage-link is clicked', async () => {
    await page.goto('/')
    await page.getByRole('link', { name: 'マイページ' }).click()
    await page.waitForURL('http://localhost:4000/mypage')
    const content = await page.textContent('li')
    expect(content).toContain('ユーザ名：テスト太郎')
  })
})

test.describe('Header Desktop Logout Navigation Links', () => {
  test.beforeEach(async () => {
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('should navigate to Top page when logout-link is clicked', async () => {
    await page.goto('/')
    await page.getByTestId('desktop-menu-link').getByText('ログアウト').click()
    await page.waitForURL('http://localhost:4000')
    await page.waitForSelector('[data-testid="login-button"]')
    const content = await page.textContent('[data-testid="login-button"]')
    expect(content).toContain('Googleでログインして始める')
  })
})

test.describe('Header Mobile Menu Navigation Links', () => {
  test.beforeEach(async () => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.click('[data-testid="mobile-menu-button"]')
  })

  test('should navigate to maps page when maps-link is clicked', async () => {
    await page.getByRole('link', { name: '全体地図' }).click()
    await page.waitForURL('http://localhost:4000/maps')
    const currentURL = page.url()
    expect(currentURL).toBe('http://localhost:4000/maps')
  })

  test('should navigate to about page when about-link is clicked', async () => {
    await page.getByRole('link', { name: '説明' }).click()
    await page.waitForURL('http://localhost:4000/about')
    const content = await page.textContent('h1')
    expect(content).toContain('アウトドア般若心経とは...')
  })

  test('should navigate to mypage page when mypage-link is clicked', async () => {
    await page.getByRole('link', { name: 'マイページ' }).click()
    await page.waitForURL('http://localhost:4000/mypage')
    const content = await page.textContent('li')
    expect(content).toContain('ユーザ名：テスト太郎')
  })
})

test.describe('Header Mobile Logout Navigation Links', () => {
  test.beforeEach(async () => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.click('[data-testid="mobile-menu-button"]')
  })

  test('should navigate to Top page when logout-link is clicked', async () => {
    await page.getByTestId('mobile-menu-link').getByText('ログアウト').click()
    await page.waitForURL('http://localhost:4000')
    await page.waitForSelector('[data-testid="login-button"]')
    const content = await page.textContent('[data-testid="login-button"]')
    expect(content).toContain('Googleでログインして始める')
  })
})
