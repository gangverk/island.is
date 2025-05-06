import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  GridColumn,
  GridContainer,
  GridRow,
  PhoneInput,
  Text,
} from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Logo from '../../components/Logo/Logo'
import DividerWithText from '../../components/DividerWithText/DividerWithText'

const Auth = () => {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [rememberPhone, setRememberPhone] = useState(false)

  const handleAuthenticate = () => {
    // Handle authentication logic here
    router.push('/dashboard')
  }

  return (
    <Box paddingY={4}>
      <GridContainer>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '8/12', '6/12']}
            offset={['0', '0', '2/12', '3/12']}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Logo />

              <Box marginTop={2} marginBottom={2} textAlign="center">
                <Text variant="eyebrow" color="blue400">
                  Rafræn skilríki í síma
                </Text>
                <Text variant="h1">Skráðu þig inn</Text>
                <Text variant="h4">Ísland.is - Mínar síður</Text>
              </Box>

              <Box width="full" marginTop={4}>
                <form>
                  <Box marginBottom={2}>
                    <PhoneInput
                      id="phonenumber"
                      name="phonenumber"
                      label="Símanúmer"
                      defaultValue={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      locale="is"
                    />
                  </Box>

                  <Box marginBottom={3}>
                    <Checkbox
                      name="rememberPhone"
                      id="rememberPhone"
                      label="Muna símanúmer"
                      checked={rememberPhone}
                      onChange={(e) => setRememberPhone(e.target.checked)}
                    />
                  </Box>

                  <Box marginBottom={4}>
                    <Button
                      variant="primary"
                      size="default"
                      fluid
                      onClick={handleAuthenticate}
                    >
                      Auðkenna
                    </Button>
                  </Box>

                  <Box marginY={3}>
                    <DividerWithText>eða skráðu þig með</DividerWithText>
                  </Box>

                  <Box marginY={3}>
                    <Button variant="ghost" size="default" fluid>
                      Auðkennisappinu
                    </Button>
                  </Box>

                  <Box marginY={3}>
                    <Button variant="ghost" size="default" fluid>
                      Skilríki á korti
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>

      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        paddingY={3}
        display="flex"
        justifyContent="spaceBetween"
        paddingX={3}
      >
        <Link href="/skilmatar" passHref legacyBehavior>
          <a>
            <Text variant="small">Skilmátar</Text>
          </a>
        </Link>
        <Box display="flex">
          <Box marginRight={2}>
            <Link href="/en" passHref legacyBehavior>
              <a>
                <Text variant="small">English</Text>
              </a>
            </Link>
          </Box>
          <Link href="/adstod" passHref legacyBehavior>
            <a>
              <Text variant="small">Aðstoð</Text>
            </a>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Auth
