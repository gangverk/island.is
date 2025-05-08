import { Box, Button, Input, useBreakpoint } from '@island.is/island-ui/core'
import { useState, type ReactNode } from 'react'
import type { BoxProps } from '@island.is/island-ui/core'

interface TableRowProps {
  left: ReactNode
  leftValue: string
  middle?: ReactNode
  middleValue: string
  rightValue: string
  hideRightValue?: boolean
  children?: ReactNode
  background?: BoxProps['background']
  className?: string
  isNew?: boolean
  onChange?: (values: { left: string; middle: string; right: string }) => void
}

const TableRow = ({
  left,
  leftValue,
  middle,
  middleValue,
  hideRightValue,
  rightValue,
  children,
  background,
  className,
  isNew,
  onChange,
}: TableRowProps) => {
  const { md } = useBreakpoint()
  const isMobile = !md
  const [values, setValues] = useState({
    left: leftValue,
    middle: middleValue,
    right: rightValue,
  })

  const handleChange = (key: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleBlur = () => {
    onChange?.(values)
  }

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
      {isNew ? (
        <Box background="blue100">
          <Input
            name={`table-row-${left}`}
            id={`table-row-${left}`}
            value={values.left}
            onChange={(e) => handleChange('left', e.target.value)}
            rightAlign
            size="sm"
          />
          <Input
            name={`table-row-${middle}`}
            id={`table-row-${middle}`}
            value={values.middle}
            onChange={(e) => handleChange('middle', e.target.value)}
            rightAlign
            size="sm"
          />
          <Input
            name={`table-row-${rightValue}`}
            id={`table-row-${rightValue}`}
            value={values.right}
            onChange={(e) => handleChange('right', e.target.value)}
            rightAlign
            size="sm"
          />
          <Button variant="text" size="small" onClick={handleBlur}>
            Bæta við
          </Button>
        </Box>
      ) : (
        <>
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
          {!hideRightValue && (
            <Box
              width={isMobile ? 'full' : undefined}
              flexGrow={isMobile ? undefined : 1}
              textAlign={isMobile ? 'left' : 'right'}
              paddingRight={isMobile ? 0 : 2}
            >
              <Box
                width={isMobile ? 'full' : undefined}
                style={{
                  maxWidth: isMobile ? '100%' : 180,
                  marginLeft: isMobile ? 0 : 'auto',
                }}
              >
                <Input
                  name={`table-row-${rightValue}`}
                  id={`table-row-${rightValue}`}
                  value={values.right}
                  rightAlign
                  size="sm"
                  backgroundColor="blue"
                  onBlur={handleBlur}
                  onChange={(e) => handleChange('right', e.target.value)}
                />
              </Box>
            </Box>
          )}
          {children}
        </>
      )}
    </Box>
  )
}

export default TableRow
