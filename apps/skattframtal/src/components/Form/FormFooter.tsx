import React, { useContext } from 'react'
import { Box, Button } from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import { FormContext } from './FormProvider'

interface FormFooterProps {
  previousUrl?: string
  nextUrl?: string
  onNextButtonClick?: () => boolean | void
  onPrevButtonClick?: () => void
  nextButtonText?: string
  prevButtonText?: string
  nextIsLoading?: boolean
  previousIsDestructive?: boolean
}

export const FormFooter: React.FC<FormFooterProps> = ({
  previousUrl,
  nextUrl,
  onNextButtonClick,
  onPrevButtonClick,
  nextButtonText = 'Áfram',
  prevButtonText = 'Til baka',
  nextIsLoading = false,
  previousIsDestructive = false,
}) => {
  const router = useRouter()
  const { nextStep } = useContext(FormContext)

  const handleNextClick = () => {
    const canProceed = onNextButtonClick ? onNextButtonClick() : true
    if (canProceed !== false) {
      nextStep()
      if (nextUrl) {
        router.push(nextUrl)
      }
    }
  }

  const handlePrevClick = () => {
    if (onPrevButtonClick) {
      onPrevButtonClick()
    } else if (previousUrl) {
      router.push(previousUrl)
    }
  }

  // Determine proper button variant
  const prevButtonVariant = previousIsDestructive ? 'text' : 'ghost'

  return (
    <Box
      display="flex"
      justifyContent="spaceBetween"
      paddingY={4}
      paddingX={[3, 3, 4]}
      background="white"
      borderTopWidth="standard"
      borderColor="blue200"
      position="fixed"
      bottom={0}
      width="full"
      style={{ zIndex: 10 }}
    >
      <Box marginRight={2}>
        {previousUrl || onPrevButtonClick ? (
          <Button
            variant={prevButtonVariant as 'text' | 'ghost'}
            onClick={handlePrevClick}
          >
            {prevButtonText}
          </Button>
        ) : null}
      </Box>
      <Button
        variant="primary"
        onClick={handleNextClick}
        loading={nextIsLoading}
      >
        {nextButtonText}
      </Button>
    </Box>
  )
}

export default FormFooter
