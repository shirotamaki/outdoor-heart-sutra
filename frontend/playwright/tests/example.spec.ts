import { test, expect, Page } from '@playwright/test'

let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
})

test.afterAll(async () => {
  await page.close()
})

test.describe('Sing in on home page', async () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeAll(async () => {
    await page.goto('/')
  })

  test('hogehoge', async () => {
    await page.goto('/about')
    await page.waitForURL('http://localhost:4000/about')
    const content = await page.textContent('h1')
    expect(content).toContain('アウトドア')

    await page.goto('/mypage')
    await page.waitForURL('http://localhost:4000/mypage')
    const content2 = await page.textContent('li')
    expect(content2).toContain('ユーザ名：テスト太郎')

    await page.screenshot({ path: 'playwright/screenshots/example.png' })
  })
})
