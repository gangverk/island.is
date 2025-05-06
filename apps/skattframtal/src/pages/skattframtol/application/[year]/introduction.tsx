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
    <Box
      background="purple100"
      style={{ minHeight: '100vh' }}
      paddingY={[2, 4, 8]}
    >
      <GridContainer>
        <GridRow>
          {/* Stepper: on mobile, show above card; on desktop, show right */}
          <GridColumn span={['12/12', '12/12', '4/12']} order={[0, 0, 1]}>
            <Box display={['block', 'block', 'none']} marginBottom={6}>
              {/* Show stepper above card for screens < 1000px */}
              <Text variant="h4" fontWeight="semiBold" marginBottom={4}>
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
            <Box display={['none', 'none', 'block']}>
              {/* Show stepper on right for screens >= 1000px */}
              <Text variant="h4" fontWeight="semiBold" marginBottom={4}>
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
          {/* Card: full width on mobile, centered on mid screens, left on desktop */}
          <GridColumn
            span={['12/12', '8/12', '8/12']}
            offset={['0', '2/12', '0']}
            order={[1, 1, 0]}
          >
            {/* Mobile: centered, maxWidth */}
            <Box
              display={['block', 'none', 'none']}
              marginX="auto"
              style={{ maxWidth: '480px' }}
            >
              <Box
                background="white"
                borderRadius="large"
                padding={[4, 8, 8]}
                paddingX={[2, 6, 12]}
                width="full"
              >
                <Text variant="h1" as="h1" marginBottom={4}>
                  {stepLabels.introduction}
                </Text>
                <Text>
                  Inngangur að skattframtali er mikilvægur þáttur í að tryggja
                  að allt sé rétt og skýrt. Það er gott að byrja á því að safna
                  saman öllum nauðsynlegum gögnum og skjölum, svo sem
                  launaseðlum og öðrum tekjum. Með því að vera vel undirbúinn
                  geturðu auðveldað ferlið og forðast mistök.
                </Text>
                <Box
                  display="flex"
                  justifyContent="spaceBetween"
                  marginTop={14}
                >
                  <Button variant="ghost">Til baka</Button>
                  <Button icon="arrowForward" iconType="filled">
                    Halda áfram
                  </Button>
                </Box>
              </Box>
            </Box>
            {/* Tablet/Desktop: full width */}
            <Box display={['none', 'block', 'block']}>
              <Box
                background="white"
                borderRadius="large"
                padding={[4, 8, 8]}
                paddingX={[2, 6, 12]}
                width="full"
              >
                <Text variant="h1" as="h1" marginBottom={4}>
                  {stepLabels.introduction}
                </Text>
                <Text>
                  Inngangur að skattframtali er mikilvægur þáttur í að tryggja
                  að allt sé rétt og skýrt. Það er gott að byrja á því að safna
                  saman öllum nauðsynlegum gögnum og skjölum, svo sem
                  launaseðlum og öðrum tekjum. Með því að vera vel undirbúinn
                  geturðu auðveldað ferlið og forðast mistök.
                </Text>
                <Box
                  display="flex"
                  justifyContent="spaceBetween"
                  marginTop={14}
                >
                  <Button variant="ghost">Til baka</Button>
                  <Button icon="arrowForward" iconType="filled">
                    Halda áfram
                  </Button>
                </Box>
              </Box>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}
