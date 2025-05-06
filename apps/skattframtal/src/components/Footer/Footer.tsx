import React from 'react'
import { Footer as IslandUIFooter } from '@island.is/island-ui/core'

export const Footer = () => {
  const topLinksInfo = [
    {
      title: 'Stafrænt Ísland',
      href: 'https://stafraent.island.is/',
    },
    {
      title: 'Stofnanir',
      href: '/stofnanir',
    },
    {
      title: 'Þjónusta Ísland.is',
      href: 'https://island.is/flokkur/vorur-og-thjonusta-island-is',
    },
  ]

  const bottomLinks = [
    {
      title: 'Mínar síður',
      href: 'https://minarsidur.island.is/',
    },
    {
      title: 'Heilsuvera',
      href: 'https://www.heilsuvera.is/',
    },
    {
      title: 'Opinber nýsköpun',
      href: 'https://opinbernyskopun.island.is/',
    },
    {
      title: 'Samráðsgátt',
      href: 'https://samradsgatt.island.is/',
    },
    {
      title: 'Mannanöfn',
      href: 'https://island.is/mannanofn/',
    },
    {
      title: 'Undirskriftarlistar',
      href: 'http://vefur.island.is/undirskriftalistar',
    },
    {
      title: 'Opnir reikningar ríkisins',
      href: 'http://www.opnirreikningar.is/',
    },
    {
      title: 'Tekjusagan',
      href: 'https://tekjusagan.is/',
    },
  ]

  const middleLinks = [
    {
      title: 'Þjónustuflokkar',
      href: '#',
    },
    {
      title: 'Akstur og bifreiðar',
      href: '#',
    },
    {
      title: 'Atvinnurekstur og sjálfstætt starfandi',
      href: '#',
    },
    {
      title: 'Dómstólar og réttarfar',
      href: '#',
    },
    {
      title: 'Fjármál og skattar',
      href: '#',
    },
    {
      title: 'Fjölskylda og velferð',
      href: '#',
    },
    {
      title: 'Heilbrigðismál',
      href: '#',
    },
    {
      title: 'Húsnæðismál',
      href: '#',
    },
    {
      title: 'Iðnaður',
      href: '#',
    },
    {
      title: 'Innflytjendamál',
      href: '#',
    },
    {
      title: 'Launþegi, réttindi og lífeyrir',
      href: '#',
    },
    {
      title: 'Málefni fatlaðs fólks',
      href: '#',
    },
    {
      title: 'Menntun',
      href: '#',
    },
    {
      title: 'Neytendamál',
      href: '#',
    },
    {
      title: 'Samfélag og réttindi',
      href: '#',
    },
    {
      title: 'Samgöngur',
      href: '#',
    },
    {
      title: 'Umhverfismál',
      href: '#',
    },
    {
      title: 'Vegabréf, ferðalög og búseta erlendis',
      href: '#',
    },
  ]

  return (
    <IslandUIFooter
      topLinks={topLinksInfo}
      bottomLinks={bottomLinks}
      middleLinks={middleLinks}
      bottomLinksTitle="Aðrir opinberir vefir"
      middleLinksTitle="Tenglar"
      languageSwitchLink={{
        title: 'English',
        href: '/en',
      }}
      privacyPolicyLink={{
        title: 'Persónuverndarstefna',
        href: '/personuverndarstefna-stafraent-islands',
      }}
      termsLink={{
        title: 'Skilmálar',
        href: '/skilmalar-island-is',
      }}
      showMiddleLinks={true}
    />
  )
}

export default Footer
