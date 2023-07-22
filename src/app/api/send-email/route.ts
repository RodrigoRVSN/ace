import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET () {
  try {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.goto('https://www.pelando.com.br/mais-quentes')

    await page.waitForSelector("button[data-testid='see-deal-link'")

    await page.click("button[title='Abrir dropdown']")

    await page.waitForSelector('button[class="sc-317bc911-4 gMznWX"]')

    await page.click('button[class="sc-317bc911-4 gMznWX"]')

    await page.waitForSelector("button[data-testid='see-deal-link'")

    const promotionsOfDay = await page.evaluate(() => {
      const listOfPromotions = document.querySelectorAll('li[class="sc-cb8be5d8-2 cvjKca"]')
      const promotions = [] as string[]
      listOfPromotions.forEach(item => {
        const title = item.querySelector('a')!.title
        promotions.push(title!)
      })

      return promotions
    })

    console.log({ promotionsOfDay })

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['rodrigovictor81@gmail.com'],
      subject: 'Hello world',
      html: '<h1>Teste!</h1>'
      // react: <EmailTemplate promotions={promotions}/>
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
