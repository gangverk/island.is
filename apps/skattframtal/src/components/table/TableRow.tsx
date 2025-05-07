import { Box, Text, Input } from '@island.is/island-ui/core'
import type { ReactNode } from 'react'

interface TableRowProps {
  left: ReactNode
  right: ReactNode
  children?: ReactNode
}

const TableRow = ({ left, right, children }: TableRowProps) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="spaceBetween"
    paddingY={2}
    paddingLeft={2}
    borderBottomWidth="standard"
    borderColor="blue100"
    borderStyle="solid"
  >
    <Box>
      {typeof left === 'string' || typeof left === 'number' ? (
        <Text>{left}</Text>
      ) : (
        left
      )}
    </Box>
    <Box style={{ width: 180 }}>
      {typeof right === 'string' || typeof right === 'number' ? (
        <Input
          name={`table-row-${left}`}
          id={`table-row-${left}`}
          value={right}
          rightAlign
          size="sm"
          backgroundColor="blue"
        />
      ) : (
        right
      )}
    </Box>
    {children}
  </Box>
)

export default TableRow
