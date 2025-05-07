import type React from 'react'
import { Box, Text, Icon, Link } from '@island.is/island-ui/core'
import * as styles from './ActionLink.css'

interface ActionLinkProps {
  href?: string
  children: React.ReactNode
  onClick?: () => void
}

const ActionLink: React.FC<ActionLinkProps> = ({ href, children, onClick }) => {
  return (
    <Box
      component={href ? Link : 'div'}
      href={href}
      onClick={onClick}
      display="inlineBlock"
      color="blue400"
    >
      <Text
        variant="small"
        color="blue400"
        fontWeight="semiBold"
        lineHeight="sm"
      >
        {children}
        <span className={styles.iconWrap}>
          <Icon icon="open" type="outline" size="small" color="currentColor" />
        </span>
      </Text>
    </Box>
  )
}

export default ActionLink
