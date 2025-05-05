import {
  Box,
  Text,
  GridContainer,
  GridRow,
  GridColumn,
  Button,
  Accordion,
  AccordionItem,
  Stack,
  Icon,
  Link,
  LinkContext,
} from '@island.is/island-ui/core'

export default function Leidbeiningar() {
  return (
    <GridContainer>
      <GridRow marginBottom={6}>
        <GridColumn
          span={['12/12', '12/12', '8/12']}
          offset={['0', '0', '2/12']}
        >
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
        </GridColumn>
      </GridRow>

      <GridRow marginBottom={6}>
        <GridColumn
          span={['12/12', '12/12', '8/12']}
          offset={['0', '0', '2/12']}
        >
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
        </GridColumn>
      </GridRow>

      <GridRow marginBottom={6}>
        <GridColumn
          span={['12/12', '12/12', '8/12']}
          offset={['0', '0', '2/12']}
        >
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
        </GridColumn>
      </GridRow>
    </GridContainer>
  )
}
