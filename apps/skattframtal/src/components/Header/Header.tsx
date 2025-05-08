import React, { FC, useContext } from 'react'

import {
  Box,
  ButtonTypes,
  ColorSchemeContext,
  Column,
  Columns,
  FocusableBox,
  GridColumn,
  GridContainer,
  GridRow,
  Hidden,
  Logo,
  ResponsiveSpace,
  Button,
  Link,
  UserAvatar,
} from '@island.is/island-ui/core'

interface HeaderProps {
  buttonColorScheme?: ButtonTypes['colorScheme']
  authenticated?: boolean
}

const marginLeft = [1, 1, 1, 2] as ResponsiveSpace

export const Header: FC<React.PropsWithChildren<HeaderProps>> = ({
  buttonColorScheme = 'default',
  authenticated = false,
  children,
}) => {
  const { colorScheme } = useContext(ColorSchemeContext)
  const isWhite = colorScheme === 'white'

  return (
    <header>
      <Hidden print={true}>
        <GridContainer>
          <GridRow>
            <GridColumn span="12/12" paddingTop={4} paddingBottom={4}>
              <Columns alignY="center" space={2}>
                <Column width="content">
                  <FocusableBox
                    href="/skattframtol"
                    data-testid="link-back-home"
                  >
                    <Hidden above="md">
                      <Logo
                        id="header-logo-icon"
                        width={40}
                        iconOnly
                        solid={isWhite}
                      />
                    </Hidden>
                    <Hidden below="lg">
                      <Logo id="header-logo" width={160} solid={isWhite} />
                    </Hidden>
                  </FocusableBox>
                </Column>
                <Column>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flexEnd"
                    width="full"
                  >
                    <Box
                      marginLeft={marginLeft}
                      display={['none', 'none', 'block']}
                    >
                      <Link href="/skattframtol/application" skipTab>
                        {authenticated ? (
                          <Button
                            colorScheme={buttonColorScheme}
                            variant="utility"
                            size="small"
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              columnGap={1}
                            >
                              <UserAvatar size="small" username="J þ" />
                              Jökull Þórðarson
                            </Box>
                          </Button>
                        ) : (
                          <Button
                            colorScheme={buttonColorScheme}
                            variant="utility"
                            icon="person"
                          >
                            Mínar síður
                          </Button>
                        )}
                      </Link>
                    </Box>

                    {!authenticated && (
                      <Box
                        marginLeft={marginLeft}
                        display={['none', 'none', 'none', 'block']}
                      >
                        <Button
                          colorScheme={buttonColorScheme}
                          variant="utility"
                        >
                          EN
                        </Button>
                      </Box>
                    )}
                    {!authenticated && (
                      <Box marginLeft={marginLeft}>
                        <Button
                          variant="utility"
                          icon="menu"
                          colorScheme={buttonColorScheme}
                          data-testid="frontpage-burger-button"
                        >
                          Valmynd
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Column>
              </Columns>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </Hidden>
      {children}
    </header>
  )
}

export default Header
