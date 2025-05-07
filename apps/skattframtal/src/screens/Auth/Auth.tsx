import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Input,
  Text,
  Logo,
} from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import DividerWithText from '../../components/DividerWithText/DividerWithText'
import { iconContainer, formContainer } from './Auth.css'
const Auth = () => {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [rememberPhone, setRememberPhone] = useState(false)

  const handleAuthenticate = () => {
    router.push('/skattframtol/application')
  }

  const handlePhoneNumberChange = (value: string) => {
    // remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '')
    // add - after 3rd digit
    const formattedValue = numericValue.replace(/(\d{3})(?=\d)/, '$1-')
    setPhoneNumber(formattedValue)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <div className={formContainer}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          border="standard"
          borderColor="blue200"
          padding={[2, 4]}
          marginTop={14}
          borderRadius="large"
        >
          <div className={iconContainer}>
            <Logo iconOnly />
          </div>

          <Box
            marginTop={4}
            marginBottom={2}
            textAlign="center"
            display="flex"
            flexDirection="column"
            rowGap={1}
          >
            <Text variant="eyebrow" color="blue400">
              Rafræn skilríki í síma
            </Text>
            <Text as="h1" variant="h2">
              Skráðu þig inn
            </Text>
            <Text>Ísland.is - Mínar síður</Text>
          </Box>

          <Box width="full" marginTop={4}>
            <form>
              <Box marginBottom={2}>
                <Input
                  id="phonenumber"
                  name="phonenumber"
                  label="Símanúmer"
                  backgroundColor="blue"
                  placeholder="000-0000"
                  maxLength={8}
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  autoFocus
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
                  disabled={phoneNumber.length !== 8}
                  variant="primary"
                  fluid
                  onClick={handleAuthenticate}
                  type="submit"
                >
                  Auðkenna
                </Button>
              </Box>

              <Box marginY={2}>
                <DividerWithText>eða skráðu þig með</DividerWithText>
              </Box>

              <Box marginY={2}>
                <Button variant="ghost" size="small" fluid>
                  Auðkennisappinu
                </Button>
              </Box>

              <Box marginY={2}>
                <Button variant="ghost" size="small" fluid>
                  Skilríki á korti
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </div>
    </Box>
  )
}

export default Auth
