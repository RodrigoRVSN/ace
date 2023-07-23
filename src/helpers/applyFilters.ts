import { Page } from 'puppeteer-core'
import { delay } from './delay'

export const applyFilters = async (page: Page): Promise<void> => {
  console.info('🔎 Applying filters...')

  await page.waitForSelector("button[data-testid='see-deal-link'")

  await page.click("button[class='sc-yUtDh AuSJm']")
  await delay(3000)

  await page.waitForSelector('button[class="sc-317bc911-4 gMznWX"]')
  await page.click('button[class="sc-317bc911-4 gMznWX"]')

  await page.click('input[type="checkbox"]', { count: 2 })

  await delay(5000)
}
