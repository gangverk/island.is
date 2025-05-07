import { Button } from '@island.is/island-ui/core'

interface AddLineButtonProps {
  onClick: () => void
}

const AddLineButton = ({ onClick }: AddLineButtonProps) => (
  <Button
    onClick={onClick}
    variant="text"
    colorScheme="default"
    icon="add"
    iconType="outline"
    size="small"
  >
    Bæta við línu
  </Button>
)

export default AddLineButton
