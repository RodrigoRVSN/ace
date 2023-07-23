import puppeteer from 'puppeteer-core'
import { IPromotion } from '@App/@types/IPromotion'
import { applyFilters } from './applyFilters'
import { getOptions } from './chromeOptions'

const BASE_URL = 'https://www.pelando.com.br'
const PROMOTIONS_URL = `${BASE_URL}/mais-quentes`

const isDev = process.env.NODE_ENV !== 'production'

export const getHottestToday = async (): Promise<IPromotion[]> => {
  const options = await getOptions(isDev)
  const browser = await puppeteer.launch(options)

  const page = await browser.newPage()

  await page.goto(PROMOTIONS_URL)

  await applyFilters(page)

  console.info('🧾 Listing promotions...')
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
