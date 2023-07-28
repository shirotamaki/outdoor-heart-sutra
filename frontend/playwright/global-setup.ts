import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { userEmail, userPassword } from 'playwright/config/index'

chromium.use(StealthPlugin())

const baseURL = 'http://localhost:4000'

const authFile = 'playwright/.auth/user.json'

async function globalSetup(): Promise<void> {
  const browser = await chromium.launch({ headless: true })

  const page = await browser.newPage()

  // Open log in page on tested site

  await page.goto(baseURL)
  await page.getByText('Googleでログインして始める').click()
  // Click redirects page to Google auth form,
  // parse https://accounts.google.com/ page
  const html = await page.locator('body').innerHTML()

  // Determine type of Google sign in form
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

  // Wait for redirect back to tested site after authentication
  await page.waitForURL(baseURL)
  // Save signed in state
  await page.context().storageState({ path: authFile })

  await browser.close()
}

export default globalSetup
