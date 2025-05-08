import React, { useState } from 'react'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import { Text, Box, Button, Input, toast } from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'
import { useMutation, useQuery } from '@apollo/client'
import { QUERIES } from '../../../../graphql/queries'
import { MUTATIONS } from '../../../../graphql/mutations'

type EditableField = 'emailAddress' | 'phoneNumber' | 'bankAccountNumber' | null

export default function MyInformation() {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStepIndex = 1

  // State for inline editing
  const [editField, setEditField] = useState<EditableField>(null)
  const [fieldValue, setFieldValue] = useState('')

  const { data, loading, error } = useQuery(
    QUERIES.GET_TAX_PAYER_BY_KENNITALA,
    {
      variables: { kennitala: '1203894569' },
    },
  )

  const [updateTaxPayer, { loading: updateTaxPayerLoading }] = useMutation(
    MUTATIONS.UPDATE_TAX_PAYER,
    {
      onCompleted: () => {
        // Clear edit state after successful update
        setEditField(null)
        toast.success('Upplýsingar vistaðar')
      },
      refetchQueries: [
        {
          query: QUERIES.GET_TAX_PAYER_BY_KENNITALA,
          variables: { kennitala: '1203894569' },
        },
      ],
    },
  )

  const handleEditClick = (field: EditableField, value: string) => {
    setEditField(field)
    setFieldValue(value)
  }

  const handleCancel = () => {
    setEditField(null)
  }

  const handleSave = () => {
    if (editField && data?.taxPayerByKennitala) {
      const variables: any = {
        id: data.taxPayerByKennitala.taxPayerID,
        phoneNumber: data.taxPayerByKennitala.phoneNumber || '',
        emailAddress: data.taxPayerByKennitala.emailAddress || '',
        bankAccountNumber: data.taxPayerByKennitala.bankAccountNumber || '',
      }

      // Update the field being edited
      variables[editField] = fieldValue

      updateTaxPayer({
        variables,
      })
    }
  }

  const renderEditButtons = () => (
    <Box display="flex">
      <Box marginRight={1}>
        <Button
          size="small"
          variant="ghost"
          onClick={handleCancel}
          disabled={updateTaxPayerLoading}
        >
          Hætta
        </Button>
      </Box>
      <Button
        size="small"
        variant="primary"
        onClick={handleSave}
        loading={updateTaxPayerLoading}
      >
        Vista
      </Button>
    </Box>
  )

  return (
    <FormScreenLayout
      currentStep={currentStepIndex}
      stepLabels={stepKeys.map((key) => stepLabels[key])}
      onStepChange={(stepIdx) =>
        goToStep(router, taxReturnId, stepIdx, stepKeys)
      }
      secondaryButton={null}
    >
      <Text variant="h3" as="h1" marginBottom={3}>
        Mínar upplýsingar
      </Text>
      <Text marginBottom={7}>
        Hér eru gögn um þig og fjölskyldu þína sem sótt eru til Þjóðskrár. Með
        því að smella á skoða upplýsingar er hægt að óska eftir breytingum á
        þeim upplýsingum.
      </Text>
      {loading && <Text>Hleður gögnum...</Text>}
      {error && <Text>Villa kom upp: {error.message}</Text>}
      {data && (
        <Box marginTop={7} style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              minWidth: 500,
              maxWidth: '100%',
              borderCollapse: 'collapse',
              background: '#fff',
            }}
          >
            <tbody>
              {/* Basic info - not editable */}
              <TableRow
                label="Full nafn"
                value={data.taxPayerByKennitala.name}
                action={
                  <Button
                    size="small"
                    variant="text"
                    icon="open"
                    iconType="outline"
                  >
                    Breyta í þjóðskrá
                  </Button>
                }
                isLast={false}
              />
              <TableRow
                label="Kennitala"
                value={data.taxPayerByKennitala.kennitala}
                action={null}
                isLast={false}
                inputType="number"
              />
              <TableRow
                label="Lögheimili"
                value={data.taxPayerByKennitala.address || ''}
                action={
                  <Button
                    size="small"
                    variant="text"
                    icon="open"
                    iconType="outline"
                  >
                    Breyta í þjóðskrá
                  </Button>
                }
                isLast={false}
              />

              {/* Email - editable */}
              <TableRow
                label="Netfang"
                value={data.taxPayerByKennitala.emailAddress || ''}
                isEditing={editField === 'emailAddress'}
                editValue={fieldValue}
                onEditValueChange={setFieldValue}
                inputType="email"
                action={
                  editField === 'emailAddress' ? (
                    renderEditButtons()
                  ) : (
                    <Button
                      size="small"
                      variant="text"
                      icon="pencil"
                      onClick={() =>
                        handleEditClick(
                          'emailAddress',
                          data.taxPayerByKennitala.emailAddress || '',
                        )
                      }
                    >
                      Breyta
                    </Button>
                  )
                }
                isLast={false}
                loading={updateTaxPayerLoading}
              />

              {/* Phone number - editable */}
              <TableRow
                label="Símanúmer"
                value={data.taxPayerByKennitala.phoneNumber || ''}
                isEditing={editField === 'phoneNumber'}
                editValue={fieldValue}
                onEditValueChange={setFieldValue}
                inputType="tel"
                action={
                  editField === 'phoneNumber' ? (
                    renderEditButtons()
                  ) : (
                    <Button
                      size="small"
                      variant="text"
                      icon="pencil"
                      onClick={() =>
                        handleEditClick(
                          'phoneNumber',
                          data.taxPayerByKennitala.phoneNumber || '',
                        )
                      }
                    >
                      Breyta
                    </Button>
                  )
                }
                isLast={false}
                loading={updateTaxPayerLoading}
              />

              {/* Bank account - editable */}
              <TableRow
                label="Bankaupplýsingar"
                value={data.taxPayerByKennitala.bankAccountNumber || ''}
                isEditing={editField === 'bankAccountNumber'}
                editValue={fieldValue}
                onEditValueChange={setFieldValue}
                inputType="number"
                action={
                  editField === 'bankAccountNumber' ? (
                    renderEditButtons()
                  ) : (
                    <Button
                      size="small"
                      variant="text"
                      icon="pencil"
                      onClick={() =>
                        handleEditClick(
                          'bankAccountNumber',
                          data.taxPayerByKennitala.bankAccountNumber || '',
                        )
                      }
                    >
                      Breyta
                    </Button>
                  )
                }
                isLast={true}
                loading={updateTaxPayerLoading}
              />
            </tbody>
          </table>
        </Box>
      )}
    </FormScreenLayout>
  )
}

interface TableRowProps {
  label: string
  value: string | null
  action?: React.ReactNode
  isLast: boolean
  isEditing?: boolean
  editValue?: string
  onEditValueChange?: (value: string) => void
  loading?: boolean
  inputType?: 'number' | 'text' | 'email' | 'tel' | 'password'
}

const TableRow = ({
  label,
  value,
  action,
  isLast,
  isEditing,
  editValue,
  onEditValueChange,
  loading,
  inputType,
}: TableRowProps) => {
  const cellStyle = {
    borderBottom: isLast ? undefined : '1px solid #F2F7FF',
    background: '#fff',
    padding: '16px 8px',
  }

  return (
    <tr>
      <th
        style={{
          ...cellStyle,
          textAlign: 'left',
          fontWeight: 600,
          width: 180,
        }}
      >
        <Text variant="default" fontWeight="semiBold">
          {label}
        </Text>
      </th>
      <td style={cellStyle}>
        {isEditing && editValue !== undefined && onEditValueChange ? (
          <Input
            name={label}
            value={editValue}
            onChange={(e) => onEditValueChange(e.target.value)}
            disabled={loading}
            size="sm"
            {...(inputType ? { type: inputType } : {})}
          />
        ) : (
          <Text>{value}</Text>
        )}
      </td>
      <td style={{ ...cellStyle, textAlign: 'right', width: 160 }}>{action}</td>
    </tr>
  )
}
