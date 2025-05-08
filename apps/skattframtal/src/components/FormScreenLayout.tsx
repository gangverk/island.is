import type React from 'react'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Text,
  FormStepperV2,
  Section,
} from '@island.is/island-ui/core'
import FormActionBar from './FormActionBar'

interface FormScreenLayoutProps {
  currentStep: number
  stepLabels: string[]
  onStepChange: (stepIdx: number) => void
  children: React.ReactNode
  primaryButton?: React.ReactNode
  secondaryButton?: React.ReactNode
}

const FormScreenLayout: React.FC<FormScreenLayoutProps> = ({
  currentStep,
  stepLabels,
  onStepChange,
  children,
  primaryButton,
  secondaryButton,
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
      paddingBottom={[4, 8]}
      paddingTop={[0, 0, 4]}
    >
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '3/12']} order={[0, 0, 1]}>
            <Box
              display={['block', 'block', 'block']}
              marginTop={[0, 0, 8]}
              paddingLeft={[0, 0, 1]}
              position="sticky"
              top="gutter"
            >
              <Box display={['none', 'none', 'block']}>
                <Text variant="h4" fontWeight="semiBold">
                  Framtal
                </Text>
              </Box>
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
          <GridColumn span={['12/12', '12/12', '9/12']} order={[1, 1, 0]}>
            <Box
              marginX="auto"
              style={{ maxWidth: '480px' }}
              display={['block', 'none', 'none']}
            >
              <Box
                background="white"
                borderRadius="large"
                padding={[2, 4]}
                width="full"
                display="flex"
                flexDirection="column"
                style={{ minHeight: '70vh' }}
              >
                <Box flexGrow={1}>{children}</Box>
                <FormActionBar
                  onBack={handleBack}
                  onNext={handleNext}
                  primaryButton={primaryButton}
                  secondaryButton={secondaryButton}
                />
              </Box>
            </Box>
            <Box display={['none', 'block', 'block']}>
              <Box
                background="white"
                borderRadius="large"
                padding={[2, 4]}
                paddingY={[4, 8]}
                width="full"
                display="flex"
                flexDirection="column"
                style={{ minHeight: '70vh' }}
              >
                <Box flexGrow={1}>{children}</Box>
                <FormActionBar
                  onBack={handleBack}
                  onNext={handleNext}
                  primaryButton={primaryButton}
                  secondaryButton={secondaryButton}
                />
              </Box>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

export default FormScreenLayout
