import type React from 'react'
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

interface FormScreenLayoutProps {
  currentStep: number
  stepLabels: string[]
  onStepChange: (stepIdx: number) => void
  children: React.ReactNode
}

const FormScreenLayout: React.FC<FormScreenLayoutProps> = ({
  currentStep,
  stepLabels,
  onStepChange,
  children,
}) => {
  const handleBack = () => {
    onStepChange(currentStep - 1)
  }
  const handleNext = () => {
    onStepChange(currentStep + 1)
  }
  return (
    <Box
      background="purple100"
      style={{ minHeight: '100vh' }}
      paddingY={[2, 4, 8]}
    >
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '4/12']} order={[0, 0, 1]}>
            <Box
              display={['block', 'block', 'block']}
              marginBottom={[6, 6, 0]}
              marginTop={[0, 0, 8]}
            >
              <Text variant="h4" fontWeight="semiBold" marginBottom={4}>
                Framtal
              </Text>
              <FormStepperV2
                sections={stepLabels.map((label, idx) => (
                  <Section
                    key={label}
                    section={label}
                    sectionIndex={idx}
                    isActive={idx === currentStep}
                    isComplete={idx < currentStep}
                  />
                ))}
              />
            </Box>
          </GridColumn>
          <GridColumn
            span={['12/12', '8/12', '8/12']}
            offset={['0', '2/12', '0']}
            order={[1, 1, 0]}
          >
            <Box
              marginX="auto"
              style={{ maxWidth: '480px' }}
              display={['block', 'none', 'none']}
            >
              <Box
                background="white"
                borderRadius="large"
                padding={[4, 8, 8]}
                paddingX={[2, 6, 12]}
                width="full"
                display="flex"
                flexDirection="column"
                style={{ minHeight: '70vh' }}
              >
                <Box flexGrow={1}>{children}</Box>
                <Box
                  display="flex"
                  justifyContent="spaceBetween"
                  marginTop={14}
                >
                  <Button variant="ghost" onClick={handleBack}>
                    Til baka
                  </Button>
                  <Button
                    icon="arrowForward"
                    iconType="filled"
                    onClick={handleNext}
                  >
                    Halda áfram
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box display={['none', 'block', 'block']}>
              <Box
                background="white"
                borderRadius="large"
                padding={[4, 8, 8]}
                paddingX={[2, 6, 12]}
                width="full"
                display="flex"
                flexDirection="column"
                style={{ minHeight: '70vh' }}
              >
                <Box flexGrow={1}>{children}</Box>
                <Box
                  display="flex"
                  justifyContent="spaceBetween"
                  marginTop={14}
                >
                  <Button variant="ghost" onClick={handleBack}>
                    Til baka
                  </Button>
                  <Button
                    icon="arrowForward"
                    iconType="filled"
                    onClick={handleNext}
                  >
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

export default FormScreenLayout
