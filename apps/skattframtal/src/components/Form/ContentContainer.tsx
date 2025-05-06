import React, { ReactNode } from 'react'
import { Box } from '@island.is/island-ui/core'

interface ContentContainerProps {
  children: ReactNode
  paddingBottom?: boolean
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  paddingBottom = true,
}) => {
  return (
    <Box
      paddingX={[3, 3, 4]}
      paddingTop={[3, 3, 4]}
      paddingBottom={paddingBottom ? [3, 3, 4] : undefined}
      marginBottom={paddingBottom ? [9, 9, 10] : undefined}
    >
      {children}
    </Box>
  )
}

export default ContentContainer
