import React from 'react'
import { Box, Text } from '@island.is/island-ui/core'

interface DividerWithTextProps {
  children: React.ReactNode
}

const DividerWithText = ({ children }: DividerWithTextProps) => {
  return (
    <Box position="relative" paddingY={2} display="flex" alignItems="center">
      <Box
        position="absolute"
        width="full"
        style={{ height: '1px' }}
        background="blue200"
      />
      <Box position="relative" paddingX={2} background="white" marginX="auto">
        <Text variant="small" color="dark400">
          {children}
        </Text>
      </Box>
    </Box>
  )
}

export default DividerWithText
