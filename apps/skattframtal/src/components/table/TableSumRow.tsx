import { Box, Text } from '@island.is/island-ui/core'
import type { ReactNode } from 'react'

interface TableSumRowProps {
  sumLabel: string
  sumValue: string | number
  left?: ReactNode
}

const TableSumRow = ({ sumLabel, sumValue, left }: TableSumRowProps) => (
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
    <Box>{left}</Box>
    <Box textAlign="right">
      <Text fontWeight="semiBold">{sumLabel}</Text>
      <Text fontWeight="semiBold">{sumValue}</Text>
    </Box>
  </Box>
)

export default TableSumRow
