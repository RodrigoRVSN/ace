import { Page } from 'puppeteer'
import { delay } from './delay'

export const applyFilters = async (page: Page): Promise<void> => {
  console.info('🔎 Applying filters...')

  await page.waitForSelector("button[data-testid='see-deal-link'")

  await page.click('input[type="checkbox"]')
  await delay(1000)

  await page.click("button[class='sc-yUtDh AuSJm']")
  await delay(1000)

  await page.waitForSelector('button[class="sc-317bc911-4 gMznWX"]')
  await page.click('button[class="sc-317bc911-4 gMznWX"]')

  await delay(1000)
}
