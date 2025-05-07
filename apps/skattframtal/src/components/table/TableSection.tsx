import { Box, Text } from '@island.is/island-ui/core'

interface TableSectionProps {
  title: string
  sectionNumber: string
  description?: string
}

const TableSection: React.FC<TableSectionProps> = ({
  title,
  sectionNumber,
  description,
}) => (
  <Box
    display="flex"
    alignItems="center"
    paddingLeft={2}
    paddingRight={[2, 10, 20]}
    style={{
      background: '#F2F7FF',
      boxShadow: '0px -1px 0px 0px #CCDFFF inset',
      minHeight: 48,
    }}
  >
    <Text variant="h5" fontWeight="semiBold">
      {title}
    </Text>
    <Box marginLeft={1}>
      <Text variant="h5" color="purple400" fontWeight="semiBold">
        {sectionNumber}
      </Text>
    </Box>
    {description && (
      <Box marginLeft={2}>
        <Text variant="small" color="dark400">
          {description}
        </Text>
      </Box>
    )}
  </Box>
)

export default TableSection
