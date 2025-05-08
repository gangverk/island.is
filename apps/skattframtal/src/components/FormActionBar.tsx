import { Box, Button } from '@island.is/island-ui/core'
import { toast } from '@island.is/island-ui/core'
import type React from 'react'

interface FormActionBarProps {
  onBack: () => void
  onNext: () => void
  primaryButton?: React.ReactNode
  secondaryButton?: React.ReactNode | null
}

const FormActionBar: React.FC<FormActionBarProps> = ({
  onBack,
  onNext,
  primaryButton,
  secondaryButton,
}) => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="spaceBetween"
    alignItems="center"
    marginTop={14}
    columnGap={2}
    rowGap={0}
  >
    {/* Back button: icon-only on mobile/tablet, text on desktop */}
    <Box style={{ minWidth: 56 }}>
      <Box display={['block', 'none', 'none']}>
        {/* mobile/tablet */}
        <Button
          icon="arrowBack"
          circle
          variant="ghost"
          onClick={onBack}
          size="large"
          aria-label="Til baka"
        />
      </Box>
      <Box display={['none', 'block', 'block']}>
        {/* desktop */}
        <Button variant="ghost" onClick={onBack} fluid>
          Til baka
        </Button>
      </Box>
    </Box>
    <Box flexGrow={1} />
    {secondaryButton !== null && (
      <Box style={{ minWidth: 120 }}>
        {secondaryButton === undefined ? (
          <Button
            variant="ghost"
            onClick={() => {
              toast.success('Framtal vistað')
            }}
            fluid
          >
            Vista
          </Button>
        ) : (
          secondaryButton
        )}
      </Box>
    )}
    <Box style={{ minWidth: 160 }}>
      {primaryButton === undefined ? (
        <Button icon="arrowForward" iconType="filled" onClick={onNext} fluid>
          Halda áfram
        </Button>
      ) : (
        primaryButton
      )}
    </Box>
  </Box>
)

export default FormActionBar
