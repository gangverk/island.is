import { Box, Text } from '@island.is/island-ui/core'
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
        <Text variant="default" color="dark400">
          {left}
        </Text>
      ) : (
        left
      )}
    </Box>
    <Box>
      {typeof right === 'string' || typeof right === 'number' ? (
        <Text variant="default" color="dark400">
          {right}
        </Text>
      ) : (
        right
      )}
    </Box>
    {children}
  </Box>
)

export default TableRow
