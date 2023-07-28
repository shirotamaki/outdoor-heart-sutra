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

test.describe('Desktop Menu Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('should navigate to home page when home-button is clicked', async () => {
    await page.goto('/')
    await page.getByRole('link', { name: '説明' }).click()
    await page.waitForURL('http://localhost:4000/about')

    await page.locator('[data-testid="homebutton-xl-link"]').click()
    await page.waitForURL('http://localhost:4000')
    await page.screenshot({ path: 'playwright/screenshots/example.png' })
    const content = await page.textContent('[data-testid="kanji"]')
    expect(content).toContain('仏')
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

test.describe('Desktop Logout Navigation', () => {
  test.beforeEach(async ({ page }) => {
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

test.describe('Mobile Menu Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="mobile-menu-button"]')
  })

  test('should navigate to home page when home-button is clicked', async ({ page }) => {
    await page.getByRole('link', { name: '説明' }).click()
    await page.waitForURL('http://localhost:4000/about')

    await page.locator('[data-testid="homebutton-sm-link"]').click()
    await page.waitForURL('http://localhost:4000')
    await page.screenshot({ path: 'playwright/screenshots/example.png' })
    const content = await page.textContent('[data-testid="kanji"]')
    expect(content).toContain('仏')
  })
  test('should navigate to maps page when maps-link is clicked', async ({ page }) => {
    await page.getByRole('link', { name: '全体地図' }).click()
    await page.waitForURL('http://localhost:4000/maps')
    const currentURL = page.url()
    expect(currentURL).toBe('http://localhost:4000/maps')
  })

  test('should navigate to about page when about-link is clicked', async ({ page }) => {
    await page.getByRole('link', { name: '説明' }).click()
    await page.waitForURL('http://localhost:4000/about')
    const content = await page.textContent('h1')
    expect(content).toContain('アウトドア般若心経とは...')
  })

  test('should navigate to mypage page when mypage-link is clicked', async ({ page }) => {
    await page.getByRole('link', { name: 'マイページ' }).click()
    await page.waitForURL('http://localhost:4000/mypage')
    const content = await page.textContent('li')
    expect(content).toContain('ユーザ名：テスト太郎')
  })
})

test.describe('Mobile Logout Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      await page.click('[data-testid="mobile-menu-button"]')
    })

    test('should navigate to Top page when logout-link is clicked', async ({ page }) => {
      await page.getByTestId('mobile-menu-link').getByText('ログアウト').click()
      await page.waitForURL('http://localhost:4000')
      await page.waitForSelector('[data-testid="login-button"]')
      const content = await page.textContent('[data-testid="login-button"]')
      expect(content).toContain('Googleでログインして始める')
    })
  })
})

test.describe('Footer Navigation', () => {
  test('should navigate to terms-of-service page when terms-of-service-link is clicked', async () => {
    await page.goto('/')
    await page.getByRole('link', { name: '利用規約' }).click()
    await page.waitForSelector('[data-testid="terms-of-service"]')
    const content = await page.textContent('h1')
    expect(content).toContain('利用規約')
  })

  test('should navigate to privacy-policy page when privacy-policy-link is clicked', async () => {
    await page.goto('/')
    await page.getByRole('link', { name: 'プライバシーポリシー' }).click()
    await page.waitForSelector('[data-testid="privacy-policy"]')
    const content = await page.textContent('h1')
    expect(content).toContain('プライバシーポリシー')
  })

  test('should have correct url for twitter-link', async () => {
    await page.goto('/')
    const twitterLink = await page.getByTestId('twitter-link').getAttribute('href')
    expect(twitterLink).toBe('https://twitter.com/od_heart_sutra')
  })

  test('should have correct url for github-link', async () => {
    await page.goto('/')
    const githubLink = await page.getByTestId('github-link').getAttribute('href')
    expect(githubLink).toBe('https://github.com/shirotamaki/outdoor-heart-sutra')
  })
})
