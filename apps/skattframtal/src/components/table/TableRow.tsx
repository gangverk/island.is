import { Box, Text, Input, useBreakpoint } from '@island.is/island-ui/core'
import type { ReactNode } from 'react'
import type { BoxProps } from '@island.is/island-ui/core'

interface TableRowProps {
  left: ReactNode
  right: ReactNode
  children?: ReactNode
  background?: BoxProps['background']
  className?: string
}

const TableRow = ({
  left,
  right,
  children,
  background,
  className,
}: TableRowProps) => {
  const { md } = useBreakpoint()
  const isMobile = !md
  return (
    <Box
      display="flex"
      flexDirection={['column', 'row']}
      alignItems={['flexStart', 'center']}
      justifyContent="spaceBetween"
      paddingY={2}
      paddingLeft={2}
      borderBottomWidth="standard"
      borderColor="blue100"
      borderStyle="solid"
      background={background}
      className={className}
      width="full"
    >
      <Box width="full">{left}</Box>
      <Box width={isMobile ? 'full' : undefined} marginTop={[2, 0]}>
        {typeof right === 'string' || typeof right === 'number' ? (
          <Box width="full">
            <Input
              name={`table-row-${left}`}
              id={`table-row-${left}`}
              value={right}
              rightAlign
              size="sm"
              backgroundColor="blue"
            />
          </Box>
        ) : (
          right
        )}
      </Box>
      {children}
    </Box>
  )
}

export default TableRow
