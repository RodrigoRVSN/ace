import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { EmailTemplate } from '@App/components/EmailTemplate'
import { getHottestToday } from '@App/helpers/getHottestToday'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET () {
  try {
    console.info('🔥 Getting today promotions...')

    const promotionsOfDay = await getHottestToday()

    const todayDate = new Intl.DateTimeFormat('en-US').format(new Date())

    console.info('📧 Sending email...')

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['rodrigovictor81@gmail.com'],
      subject: `Pelando hoje [${todayDate}] 🔥`,
      react: EmailTemplate(promotionsOfDay)
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error, message: (error as Error).message })
  }
}
