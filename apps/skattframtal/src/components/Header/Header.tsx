/* eslint-disable jsx-a11y/anchor-is-valid */
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
} from '@island.is/island-ui/core'

interface HeaderProps {
  buttonColorScheme?: ButtonTypes['colorScheme']
}

const marginLeft = [1, 1, 1, 2] as ResponsiveSpace

export const Header: FC<React.PropsWithChildren<HeaderProps>> = ({
  buttonColorScheme = 'default',
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
                  <FocusableBox href="/" data-testid="link-back-home">
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
                      <Link href="/minarsidur/" skipTab>
                        <Button
                          colorScheme={buttonColorScheme}
                          variant="utility"
                          icon="person"
                        >
                          Mínar síður
                        </Button>
                      </Link>
                    </Box>

                    <Box
                      marginLeft={marginLeft}
                      display={['none', 'none', 'none', 'block']}
                    >
                      <Button colorScheme={buttonColorScheme} variant="utility">
                        EN
                      </Button>
                    </Box>
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
