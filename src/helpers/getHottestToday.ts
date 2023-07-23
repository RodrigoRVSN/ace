import puppeteer from 'puppeteer'
import { IPromotion } from '@App/@types/IPromotion'

const BASE_URL = 'https://www.pelando.com.br'
const PROMOTIONS_URL = `${BASE_URL}/mais-quentes`

export const getHottestToday = async (): Promise<IPromotion[]> => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.goto(PROMOTIONS_URL)

  await page.waitForSelector("button[data-testid='see-deal-link'")

  await page.click("button[title='Abrir dropdown']")

  await page.click('input[type="checkbox"]')

  await page.waitForSelector('button[class="sc-317bc911-4 gMznWX"]')

  await page.click('button[class="sc-317bc911-4 gMznWX"]')

  await page.waitForSelector("button[data-testid='see-deal-link'")

  const promotionsOfDay = await page.evaluate(() => {
    const listOfPromotions = document.querySelectorAll('li[class="sc-cb8be5d8-2 cvjKca"]')
    const promotions: IPromotion[] = []

    listOfPromotions.forEach((item, index) => {
      const titleElement = item.querySelector('a[class="sc-khsqcC bxrYfz"]')
      const title = String(titleElement?.textContent)
      const imageURL = String(item.querySelector('img')?.getAttribute('src'))
      const priceElement = item.querySelector('div[class="sc-iAEawV gDfGVi sc-iOeugr gZuqIb"]')
      const price = String(priceElement?.textContent)
      const promotionURL = `https://www.pelando.com.br${String(titleElement?.getAttribute('href'))}`

      promotions.push({
        title,
        imageURL,
        price,
        promotionURL,
        id: index
      })
    })

    return promotions
  })

  return promotionsOfDay
}
