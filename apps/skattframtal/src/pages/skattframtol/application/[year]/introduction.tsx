import React from 'react'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Text,
  Button,
  FormStepperV2,
  Section,
} from '@island.is/island-ui/core'

const stepKeys = [
  'introduction',
  'personalInfo',
  'income',
  'assetsAndLiabilities',
  'liabilities',
  'review',
  'confirmAndSubmit',
]

const stepLabels: Record<string, string> = {
  introduction: 'Inngangur',
  personalInfo: 'Mínar upplýsingar',
  income: 'Tekjur',
  assetsAndLiabilities: 'Eignir og skuldir',
  liabilities: 'Skuldir',
  review: 'Yfirfara',
  confirmAndSubmit: 'Staðfesta og senda',
}

export default function Introduction() {
  return (
    <Box background="purple100" style={{ minHeight: '100vh' }} paddingY={4}>
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '8/12']}>
            <Box
              background="white"
              borderRadius="large"
              padding={8}
              paddingX={12}
            >
              <Text variant="h1" as="h1" marginBottom={4}>
                {stepLabels.introduction}
              </Text>
              <Text>
                Inngangur að skattframtali er mikilvægur þáttur í að tryggja að
                allt sé rétt og skýrt. Það er gott að byrja á því að safna saman
                öllum nauðsynlegum gögnum og skjölum, svo sem launaseðlum og
                öðrum tekjum. Með því að vera vel undirbúinn geturðu auðveldað
                ferlið og forðast mistök.
              </Text>
              <Box display="flex" justifyContent="spaceBetween" marginTop={14}>
                <Button variant="ghost">Til baka</Button>
                <Button icon="arrowForward" iconType="filled">
                  Halda áfram
                </Button>
              </Box>
            </Box>
          </GridColumn>
          <GridColumn span={['12/12', '4/12']}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flexStart"
              marginTop={[8, 0]}
            >
              <Text variant="h4" fontWeight="semiBold">
                Framtal
              </Text>
              <FormStepperV2
                sections={stepKeys.map((key, idx) => (
                  <Section
                    key={key}
                    section={stepLabels[key]}
                    sectionIndex={idx}
                    isActive={idx === 0}
                    isComplete={idx < 0}
                  />
                ))}
              />
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}
