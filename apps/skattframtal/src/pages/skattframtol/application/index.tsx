import {
  Box,
  Text,
  Button,
  Stack,
  Link,
  Breadcrumbs,
  Icon,
  Navigation,
} from '@island.is/island-ui/core'
import SidebarLayout from '../../../screens/Layouts/SidebarLayout'
import { useQuery } from '@apollo/client'
import NextLink from 'next/link'
import { QUERIES } from '../../../graphql/queries'

const navigationItems = [
  {
    title: 'Nýjasta framtal',
    href: '/skattframtol/application',
    active: true,
  },
  {
    title: 'Eldri framtöl',
    href: '/skattframtol/application/older',
    active: false,
  },
]

export default function Applications() {
  const { loading, error, data } = useQuery(
    QUERIES.GET_ALL_TAX_RETURNS_BY_KENNITALA,
    {
      variables: { kennitala: '1203894569' },
    },
  )

  const taxReturns = data?.taxPayerByKennitala?.taxReturns.filter(
    (taxReturn) =>
      taxReturn.fiscalYear === (new Date().getFullYear() - 1).toString(),
  )

  return (
    <>
      <SidebarLayout
        sidebarContent={
          <Stack space={3}>
            <Box display={['none', 'none', 'block']} printHidden>
              <Link href="/skattframtol" skipTab>
                <Button size="small" type="button" variant="text" truncate>
                  <Box display="flex" alignItems="center" columnGap={1}>
                    <Icon icon="arrowBack" type="filled" size="small" />
                    Til baka í yfirlit
                  </Box>
                </Button>
              </Link>
            </Box>
            <Navigation
              items={navigationItems}
              baseId="skattframtal-application"
              title="Skattframtal"
              renderLink={(link, item) => {
                return (
                  <NextLink href={item?.href ?? '#'} passHref legacyBehavior>
                    {link}
                  </NextLink>
                )
              }}
            />
          </Stack>
        }
      >
        <Box
          display={['none', 'none', 'block']}
          printHidden
          paddingBottom={[2, 2, 4]}
        >
          <Box className="rs_read">
            <Breadcrumbs
              items={[
                {
                  title: 'island.is',
                },
                {
                  title: 'Skattframtal',
                },
                {
                  title: 'Nýjasta framtal',
                },
              ]}
              renderLink={(link) => {
                return (
                  <Link href={'#'} skipTab>
                    {link}
                  </Link>
                )
              }}
            />
          </Box>
        </Box>
        <Box
          display={['flex', 'flex', 'none']}
          justifyContent="spaceBetween"
          alignItems="center"
          printHidden
          paddingBottom={[2, 2, 4]}
        >
          <Box flexGrow={1} marginRight={6} overflow={'hidden'}>
            <Link href="/skattframtol" skipTab>
              <Button size="small" type="button" variant="text" truncate>
                <Box display="flex" alignItems="center" columnGap={1}>
                  <Icon icon="arrowBack" type="filled" size="small" />
                  Til baka í yfirlit
                </Box>
              </Button>
            </Link>
          </Box>
        </Box>

        <Box printHidden paddingY={2} display={['block', 'block', 'none']}>
          <Navigation
            items={navigationItems}
            baseId="skattframtal-application"
            title="Skattframtal"
            isMenuDialog
            renderLink={(link, item) => {
              return (
                <NextLink href={item?.href ?? '#'} passHref legacyBehavior>
                  {link}
                </NextLink>
              )
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column" rowGap={8}>
          <Stack space={4}>
            <Text variant="h3" as="h1">
              Nýjasta framtal
            </Text>

            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Stack>

          {loading && <Text>Hleður gögnum...</Text>}
          {error && <Text>Villa kom upp: {error.message}</Text>}

          {taxReturns?.map((taxReturn) => (
            <Box
              key={taxReturn.taxReturnID}
              display="flex"
              justifyContent="spaceBetween"
              alignItems="center"
              padding={3}
              columnGap={4}
              borderColor="blue200"
              border="standard"
              borderRadius="large"
              flexWrap="wrap"
              flexDirection={['column', 'column', 'row']}
              rowGap={[3, 3, 0]}
            >
              <Box>
                <Text variant="h3">Skattframtal {taxReturn.fiscalYear}</Text>
                <Text>
                  Skattframtal {taxReturn.fiscalYear} er núna opið til skila
                </Text>
              </Box>
              <Box>
                <NextLink
                  href={`/skattframtol/application/${taxReturn.taxReturnID}/introduction`}
                >
                  <Button size="medium" nowrap variant="primary">
                    Hefja skattframtal
                  </Button>
                </NextLink>
              </Box>
            </Box>
          ))}
        </Box>
      </SidebarLayout>
    </>
  )
}
