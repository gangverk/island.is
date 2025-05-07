import { Box, Input, useBreakpoint } from '@island.is/island-ui/core'
import type { ReactNode } from 'react'
import type { BoxProps } from '@island.is/island-ui/core'

interface TableRowProps {
  left: ReactNode
  middle?: ReactNode
  right: ReactNode
  children?: ReactNode
  background?: BoxProps['background']
  className?: string
}

const TableRow = ({
  left,
  middle,
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
      flexDirection={isMobile ? 'column' : 'row'}
      alignItems={isMobile ? 'flexStart' : 'center'}
      justifyContent="flexStart"
      paddingY={2}
      paddingLeft={2}
      borderBottomWidth="standard"
      borderColor="blue100"
      borderStyle="solid"
      background={background}
      className={className}
      width="full"
      columnGap={isMobile ? undefined : 3}
      rowGap={isMobile ? 1 : undefined}
    >
      <Box
        width={isMobile ? 'full' : undefined}
        flexGrow={isMobile ? undefined : 1}
        textAlign="left"
      >
        {left}
      </Box>
      {middle && (
        <Box
          width={isMobile ? 'full' : undefined}
          flexGrow={isMobile ? undefined : 1}
          textAlign="left"
        >
          {middle}
        </Box>
      )}
      <Box
        width={isMobile ? 'full' : undefined}
        flexGrow={isMobile ? undefined : 1}
        textAlign={isMobile ? 'left' : 'right'}
        paddingRight={isMobile ? 0 : 2}
      >
        {typeof right === 'string' || typeof right === 'number' ? (
          <Box
            width={isMobile ? 'full' : undefined}
            style={{
              maxWidth: isMobile ? '100%' : 180,
              marginLeft: isMobile ? 0 : 'auto',
            }}
          >
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
