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
  toast,
} from '@island.is/island-ui/core'

type NextButtonIcon = 'arrowForward' | 'checkmark'

interface FormScreenLayoutProps {
  currentStep: number
  stepLabels: string[]
  onStepChange: (stepIdx: number) => void
  children: React.ReactNode
  nextButtonLabel?: string
  nextButtonIcon?: NextButtonIcon
}

const FormScreenLayout: React.FC<FormScreenLayoutProps> = ({
  currentStep,
  stepLabels,
  onStepChange,
  children,
  nextButtonLabel = 'Halda áfram',
  nextButtonIcon = 'arrowForward',
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
                {/* Responsive button bar: mobile (column, Halda áfram first), desktop (row, Til baka left) */}
                {/* Mobile layout: column, Halda áfram, Vista, Til baka */}
                <Box
                  display={['flex', 'none', 'none']}
                  flexDirection="column"
                  rowGap={2}
                  marginTop={14}
                >
                  <Button
                    icon={nextButtonIcon}
                    iconType="filled"
                    onClick={handleNext}
                    fluid={true}
                  >
                    {nextButtonLabel}
                  </Button>
                  {currentStep > 1 && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toast.success('Framtal vistað')
                      }}
                      fluid={true}
                    >
                      Vista
                    </Button>
                  )}
                  <Button variant="ghost" onClick={handleBack} fluid={true}>
                    Til baka
                  </Button>
                </Box>
                {/* Desktop/tablet layout: row, Til baka left, Vista/Halda áfram right */}
                <Box
                  display={['none', 'flex', 'flex']}
                  flexDirection="row"
                  justifyContent="spaceBetween"
                  alignItems="center"
                  marginTop={14}
                  columnGap={2}
                >
                  {/* Left: Til baka */}
                  <Box style={{ minWidth: 120 }}>
                    <Button variant="ghost" onClick={handleBack} fluid={true}>
                      Til baka
                    </Button>
                  </Box>
                  {/* Spacer */}
                  <Box flexGrow={1} />
                  {/* Right: Vista + Halda áfram */}
                  <Box display="flex" flexDirection="row" columnGap={2}>
                    {currentStep > 1 && (
                      <Box style={{ minWidth: 120 }}>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            toast.success('Framtal vistað')
                          }}
                          fluid={true}
                        >
                          Vista
                        </Button>
                      </Box>
                    )}
                    <Box style={{ minWidth: 160 }}>
                      <Button
                        icon={nextButtonIcon}
                        iconType="filled"
                        onClick={handleNext}
                        fluid={true}
                      >
                        {nextButtonLabel}
                      </Button>
                    </Box>
                  </Box>
                </Box>
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
                {/* Responsive button bar: mobile (column, Halda áfram first), desktop (row, Til baka left) */}
                {/* Mobile layout: column, Halda áfram, Vista, Til baka */}
                <Box
                  display={['flex', 'none', 'none']}
                  flexDirection="column"
                  rowGap={2}
                  marginTop={14}
                >
                  <Button
                    icon={nextButtonIcon}
                    iconType="filled"
                    onClick={handleNext}
                    fluid={true}
                  >
                    {nextButtonLabel}
                  </Button>
                  {currentStep > 1 && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toast.success('Framtal vistað')
                      }}
                      fluid={true}
                    >
                      Vista
                    </Button>
                  )}
                  <Button variant="ghost" onClick={handleBack} fluid={true}>
                    Til baka
                  </Button>
                </Box>
                {/* Desktop/tablet layout: row, Til baka left, Vista/Halda áfram right */}
                <Box
                  display={['none', 'flex', 'flex']}
                  flexDirection="row"
                  justifyContent="spaceBetween"
                  alignItems="center"
                  marginTop={14}
                  columnGap={2}
                >
                  {/* Left: Til baka */}
                  <Box style={{ minWidth: 120 }}>
                    <Button variant="ghost" onClick={handleBack} fluid={true}>
                      Til baka
                    </Button>
                  </Box>
                  {/* Spacer */}
                  <Box flexGrow={1} />
                  {/* Right: Vista + Halda áfram */}
                  <Box display="flex" flexDirection="row" columnGap={2}>
                    {currentStep > 1 && (
                      <Box style={{ minWidth: 120 }}>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            toast.success('Framtal vistað')
                          }}
                          fluid={true}
                        >
                          Vista
                        </Button>
                      </Box>
                    )}
                    <Box style={{ minWidth: 160 }}>
                      <Button
                        icon={nextButtonIcon}
                        iconType="filled"
                        onClick={handleNext}
                        fluid={true}
                      >
                        {nextButtonLabel}
                      </Button>
                    </Box>
                  </Box>
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
