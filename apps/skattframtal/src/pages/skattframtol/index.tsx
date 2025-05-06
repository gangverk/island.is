import {
  Box,
  Text,
  Button,
  Accordion,
  AccordionItem,
  Stack,
  Link,
  LinkContext,
  Tag,
  Breadcrumbs,
  Icon,
} from '@island.is/island-ui/core'
import Header from '../../components/Header/Header'
import SidebarLayout from '../../../screens/Layouts/SidebarLayout'
import InstitutionPanel from '../../components/InstitutionPanel/InstitutionPanel'
export default function Leidbeiningar() {
  return (
    <>
      <Header />
      <SidebarLayout
        sidebarContent={
          <Stack space={3}>
            <Box display={['none', 'none', 'block']} printHidden>
              <Link href="#" skipTab>
                <Button size="small" type="button" variant="text" truncate>
                  <Box display="flex" alignItems="center" columnGap={1}>
                    <Icon icon="arrowBack" type="filled" size="small" />
                    Fjármál og skattar
                  </Box>
                </Button>
              </Link>
            </Box>
            <InstitutionPanel
              institutionTitle="Þjónustuaðili"
              institution="Skatturinn"
              locale="is"
              img="/assets/skatturinn.svg"
              imgContainerDisplay={['block', 'block', 'none', 'block']}
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
                  title: 'Ísland.is',
                },
                {
                  title: 'Fjármál og skattar',
                },
                {
                  title: 'Fjármagnstekjur og skattar',
                },
              ]}
              renderLink={(link) => {
                return (
                  <Link href="#" skipTab>
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
            <Link href="#" skipTab>
              <Button size="small" type="button" variant="text" truncate>
                <Box display="flex" alignItems="center" columnGap={1}>
                  <Icon icon="arrowBack" type="filled" size="small" />
                  Fjármál og skattar
                </Box>
              </Button>
            </Link>
          </Box>
          <Box minWidth={0}>
            <Tag variant="purple" truncate disabled>
              Skatturinn
            </Tag>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={8}>
          <Stack space={4}>
            <Text variant="h1" as="h1">
              Skattframtöl
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              ultrices tempus dui, cursus sollicitudin lectus maximus volutpat.
              Duis nec sem a lorem auctor facilisis. Proin auctor gravida
              consectetur. Vivamus sed condimentum mauris. Aenean mi ipsum,
              sodales sit amet turpis eu, ultricies semper erat. Vivamus
              suscipit porta feugiat. Praesent quis sem ac velit gravida
              blandit. Curabitur viverra quis tortor at consequat. Maecenas a
              enim risus.
            </Text>
            <Text>
              Sed aliquam facilisis mauris, ac fermentum risus rhoncus id. Cras
              vitae pulvinar sapien. Ut sed dictum tortor, nec consectetur
              felis. Curabitur sollicitudin nisl purus, sed aliquam arcu
              suscipit quis. Curabitur auctor laoreet dui sit amet mollis.
              Integer porttitor bibendum commodo. Maecenas accumsan justo purus,
              a vestibulum justo aliquam at. Nulla mattis vulputate fermentum.
            </Text>
          </Stack>

          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
            padding={3}
            columnGap={4}
            background="blue100"
            borderRadius="large"
            flexWrap="wrap"
          >
            <Text variant="h3" color="blue600">
              Skattframtal
            </Text>
            <LinkContext.Provider
              value={{
                linkRenderer: (href, children) => (
                  <Link href={href} skipTab>
                    {children}
                  </Link>
                ),
              }}
            >
              <Link href="https://skatturinn.is/">
                <Button
                  size="medium"
                  icon="open"
                  iconType="outline"
                  nowrap
                  variant="primary"
                >
                  Opna skattframtal
                </Button>
              </Link>
            </LinkContext.Provider>
          </Box>

          <Stack space={4}>
            <Text variant="h3" as="h2">
              Spurt og svarað um skattframtal
            </Text>
            <Accordion>
              <AccordionItem id="faq1" label="Lorem ipsum dolor sit amet?">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  ultrices tempus dui, cursus sollicitudin lectus maximus
                  volutpat. Duis nec sem a lorem auctor facilisis. Proin auctor
                  gravida consectetur. Vivamus sed condimentum mauris. Aenean mi
                  ipsum, sodales sit amet turpis eu, ultricies semper erat.
                  Vivamus suscipit porta feugiat. Praesent quis sem ac velit
                  gravida blandit. Curabitur viverra quis tortor at consequat.
                  Maecenas a enim risus.
                </Text>
              </AccordionItem>
              <AccordionItem id="faq2" label="Vivamus sed condimentum mauris?">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  ultrices tempus dui, cursus sollicitudin lectus maximus
                  volutpat. Duis nec sem a lorem auctor facilisis. Proin auctor
                  gravida consectetur. Vivamus sed condimentum mauris. Aenean mi
                  ipsum, sodales sit amet turpis eu, ultricies semper erat.
                  Vivamus suscipit porta feugiat. Praesent quis sem ac velit
                  gravida blandit. Curabitur viverra quis tortor at consequat.
                  Maecenas a enim risus.
                </Text>
              </AccordionItem>
              <AccordionItem
                id="faq3"
                label="Phasellus maximus pharetra velit a porttitor?"
              >
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  ultrices tempus dui, cursus sollicitudin lectus maximus
                  volutpat. Duis nec sem a lorem auctor facilisis. Proin auctor
                  gravida consectetur. Vivamus sed condimentum mauris. Aenean mi
                  ipsum, sodales sit amet turpis eu, ultricies semper erat.
                  Vivamus suscipit porta feugiat. Praesent quis sem ac velit
                  gravida blandit. Curabitur viverra quis tortor at consequat.
                  Maecenas a enim risus.
                </Text>
              </AccordionItem>
              <AccordionItem id="faq4" label="Cras vitae pulvinar sapien?">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  ultrices tempus dui, cursus sollicitudin lectus maximus
                  volutpat. Duis nec sem a lorem auctor facilisis. Proin auctor
                  gravida consectetur. Vivamus sed condimentum mauris. Aenean mi
                  ipsum, sodales sit amet turpis eu, ultricies semper erat.
                  Vivamus suscipit porta feugiat. Praesent quis sem ac velit
                  gravida blandit. Curabitur viverra quis tortor at consequat.
                  Maecenas a enim risus.
                </Text>
              </AccordionItem>
            </Accordion>
          </Stack>
        </Box>
      </SidebarLayout>
    </>
  )
}
