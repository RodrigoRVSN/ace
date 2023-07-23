import { Column } from '@react-email/column'
import { Heading } from '@react-email/heading'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { IPromotion } from '@App/@types/IPromotion'

export const EmailTemplate = (promotions: IPromotion[]) => {
  return (
    <Html>
      <Heading as='h2'>Veja o que está pelando hoje:</Heading>
      <Hr />

      {promotions.map(({ imageURL, price, promotionURL, title, id }) => (
        <>
          <Link
            key={id}
            href={promotionURL}
          >
            <Column style={{ marginRight: 8 }}>
              <Img
                alt={title}
                src={imageURL}
                width={130}
                height={130}
              />
            </Column>

            <Column>
              <Heading
                as='h2'
                style={{ color: 'black' }}
              >
                {title}
              </Heading>

              <Heading
                as='h3'
                style={{ color: 'black' }}
              >
                {price}
              </Heading>
            </Column>
          </Link>
          <Hr />
        </>
      ))
      }
    </Html>
  )
}
