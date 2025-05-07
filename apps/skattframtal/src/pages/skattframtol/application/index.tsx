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

import NextLink from 'next/link'

const navigationItems = [
  {
    title: 'Mín framtöl',
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
                  title: 'Mín framtöl',
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
            <Text variant="h1" as="h1">
              Mín framtöl
            </Text>

            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Stack>

          <Box
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
              <Text variant="h3">Skattaframtal 2025</Text>
              <Text>Skattframtal 2025 er núna opið til skila</Text>
            </Box>
            <Box>
              <Button
                size="medium"
                icon="open"
                iconType="outline"
                nowrap
                variant="primary"
              >
                Hefja skattframtal
              </Button>
            </Box>
          </Box>
        </Box>
      </SidebarLayout>
    </>
  )
}
