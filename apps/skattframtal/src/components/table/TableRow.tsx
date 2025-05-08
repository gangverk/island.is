import {
  Box,
  Button,
  Input,
  toast,
  useBreakpoint,
} from '@island.is/island-ui/core'
import { useEffect, useState, type ReactNode } from 'react'
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
  onDelete?: () => void
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
  onDelete,
}: TableRowProps) => {
  const { md } = useBreakpoint()
  const isMobile = !md
  const [values, setValues] = useState({
    left: leftValue,
    middle: middleValue,
    right: rightValue,
  })

  const [errors, setErrors] = useState({
    left: false,
    middle: false,
    right: false,
  })

  useEffect(() => {
    setValues({
      left: leftValue,
      middle: middleValue,
      right: rightValue,
    })
  }, [leftValue, middleValue, rightValue])

  const handleChange = (key: keyof typeof values, value: string) => {
    if (key === 'right') {
      // Remove all non-numeric characters
      value = value.replace(/[^0-9]/g, '')
    }
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleBlur = () => {
    if (values.right === '') {
      setValues((prev) => ({ ...prev, right: '0' }))
    }
    if (!values.left) {
      return
    }
    onChange?.(values)
  }

  const handleNew = () => {
    setErrors((prev) => ({ ...prev, left: false, right: false }))
    if (values.right === '') {
      setErrors((prev) => ({ ...prev, right: true }))
      return
    }
    if (!values.left) {
      setErrors((prev) => ({ ...prev, left: true }))
      return
    }
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
        <Box display="flex" flexDirection="column" rowGap={2} paddingRight={2}>
          <Box
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
            rowGap={1}
            columnGap={1}
            width="full"
          >
            <Input
              name={`table-row-${left}`}
              id={`table-row-${left}`}
              value={values.left}
              onChange={(e) => handleChange('left', e.target.value)}
              label="Greiðandi"
              size="sm"
              required
              errorMessage={errors.left ? 'Greiðandi er krafist' : undefined}
            />
            <Input
              name={`table-row-${middle}`}
              id={`table-row-${middle}`}
              value={values.middle}
              onChange={(e) => handleChange('middle', e.target.value)}
              label="Lýsing"
              size="sm"
            />
            <Input
              name={`table-row-${rightValue}`}
              id={`table-row-${rightValue}`}
              value={values.right}
              onChange={(e) => handleChange('right', e.target.value)}
              label="Upphæð"
              size="sm"
              type="number"
              required
              errorMessage={errors.right ? 'Upphæð er krafist' : undefined}
            />
          </Box>
          <Box display="flex" columnGap={2}>
            <Button variant="ghost" size="small" onClick={onDelete}>
              Hætta við
            </Button>
            <Button variant="primary" size="small" onClick={handleNew}>
              Bæta við
            </Button>
          </Box>
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
