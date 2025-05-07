import { Box, useBreakpoint } from '@island.is/island-ui/core'
import type { ResponsiveSpace } from '@island.is/island-ui/core'
import type { ReactNode } from 'react'

export interface MultiColumn {
  content: ReactNode
  width?: string // e.g. '25%', '50%', etc. Only used on desktop
  textAlign?: 'left' | 'center' | 'right'
  key?: string | number // Optional unique key for better React keying
}

interface MultiColumnRowProps {
  columns: MultiColumn[]
  background?: 'white' | 'blue100' | 'purple100' | 'transparent'
  className?: string
  paddingY?: number
  paddingLeft?: number
  paddingRight?: number
  borderBottom?: boolean
}

const MultiColumnRow = ({
  columns,
  background,
  className,
  paddingY = 2,
  paddingLeft = 2,
  paddingRight = 0,
  borderBottom = true,
}: MultiColumnRowProps) => {
  const { md } = useBreakpoint()
  const isMobile = !md

  // Always four columns: fill with empty boxes if needed
  const filledColumns = [...columns]
  while (filledColumns.length < 4) {
    filledColumns.push({ content: null })
  }

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      alignItems={isMobile ? 'flexStart' : 'center'}
      justifyContent="flexStart"
      paddingY={String(paddingY) as ResponsiveSpace}
      paddingLeft={String(paddingLeft) as ResponsiveSpace}
      paddingRight={String(paddingRight) as ResponsiveSpace}
      borderBottomWidth={borderBottom ? 'standard' : undefined}
      borderColor={borderBottom ? 'blue100' : undefined}
      borderStyle={borderBottom ? 'solid' : undefined}
      background={background}
      className={className}
      width="full"
      columnGap={isMobile ? undefined : 3}
      rowGap={isMobile ? 1 : undefined}
    >
      {filledColumns.map((col, idx) => (
        <Box
          key={col.key ?? idx}
          width={isMobile ? 'full' : undefined}
          style={isMobile ? undefined : { flexBasis: '25%', maxWidth: '25%' }}
          textAlign={col.textAlign || 'left'}
        >
          {col.content}
        </Box>
      ))}
    </Box>
  )
}

export default MultiColumnRow
