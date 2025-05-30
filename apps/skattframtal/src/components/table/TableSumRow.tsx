import { Box, Text, useBreakpoint } from '@island.is/island-ui/core'
import type { ReactNode } from 'react'

interface TableSumRowProps {
  sumLabel: string
  sumValue: string | number
  left?: ReactNode
}

const TableSumRow = ({ sumLabel, sumValue, left }: TableSumRowProps) => {
  const { md } = useBreakpoint()
  const isMobile = !md
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="spaceBetween"
      paddingY={2}
      paddingLeft={2}
      paddingRight={isMobile ? 0 : 2}
      borderBottomWidth="standard"
      borderColor="blue100"
      borderStyle="solid"
    >
      <Box>{left}</Box>
      <Box textAlign="right">
        <Text variant="default" color="dark400" fontWeight="semiBold">
          {sumLabel}
        </Text>
        <Text variant="default" color="dark400">
          {sumValue}
        </Text>
      </Box>
    </Box>
  )
}

export default TableSumRow
