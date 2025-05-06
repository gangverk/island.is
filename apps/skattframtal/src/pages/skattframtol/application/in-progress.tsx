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
import NextLink from 'next/link'
import SidebarLayout from '../../../../screens/Layouts/SidebarLayout'

const navigationItems = [
  {
    title: 'Mín framtöl',
    href: '/skattframtol/application',
    active: false,
  },
  {
    title: 'Framtöl í vinnslu',
    href: '/skattframtol/application/in-progress',
    active: true,
  },
  {
    title: 'Eldri framtöl',
    href: '/skattframtol/application/older',
    active: false,
  },
]

export default function ApplicationsInProgress() {
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
                  title: 'Framtöl í vinnslu',
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
              Framtöl í vinnslu
            </Text>

            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Stack>

          {/* No applications in progress */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={6}
            borderColor="blue200"
            border="standard"
            borderRadius="large"
            background="blue100"
          >
            <Text variant="h4" as="p">
              Engin framtöl í vinnslu
            </Text>
          </Box>
        </Box>
      </SidebarLayout>
    </>
  )
}
