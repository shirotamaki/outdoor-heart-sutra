import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { userEmail, userPassword, baseURL } from 'playwright/config/index'

chromium.use(StealthPlugin())

const authFile = 'playwright/setup/storage-state.json'

async function globalSetup(): Promise<void> {
  const browser = await chromium.launch({ headless: true })

  const page = await browser.newPage()

  await page.goto(baseURL)
  await page.getByText('Googleでログインして始める').click()
  const html = await page.locator('body').innerHTML()

  if (html.includes('aria-label="Google"')) {
    // Old Google sign in form
    await page.fill('#Email', userEmail)
    await page.locator('#next').click()
    await page.fill('#password', userPassword)
    await page.locator('#submit').click()
  } else {
    // New Google sign in form
    await page.fill('input[type="email"]', userEmail)
    await page.locator('#identifierNext >> button').click()
    await page.fill('#password >> input[type="password"]', userPassword)
    await page.locator('button >> nth=1').click()
  }
    await page.waitForURL(baseURL, { timeout: 10000 })
    await page.context().storageState({ path: authFile })
    await browser.close()
}

export default globalSetup
