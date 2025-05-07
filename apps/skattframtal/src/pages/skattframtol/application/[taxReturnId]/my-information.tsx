import React from 'react'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import { Text, Box } from '@island.is/island-ui/core'
import ActionLink from '../../../../components/ActionLink'
import { useRouter } from 'next/router'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'
import { useQuery } from '@apollo/client'
import { QUERIES } from '../../../../graphql/queries'

export default function MyInformation() {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStepIndex = 1

  const { data, loading, error } = useQuery(
    QUERIES.GET_TAX_PAYER_BY_KENNITALA,
    {
      variables: { kennitala: '1203894569' },
    },
  )

  return (
    <FormScreenLayout
      currentStep={currentStepIndex}
      stepLabels={stepKeys.map((key) => stepLabels[key])}
      onStepChange={(stepIdx) =>
        goToStep(router, taxReturnId, stepIdx, stepKeys)
      }
    >
      <Text variant="h1" as="h1" marginBottom={3}>
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
              {[
                {
                  label: 'Full nafn',
                  value: data.taxPayerByKennitala.name,
                  action: (
                    <ActionLink href="skra.is">Breyta í þjóðskrá</ActionLink>
                  ),
                },
                {
                  label: 'Kennitala',
                  value: data.taxPayerByKennitala.kennitala,
                  action: null,
                },
                {
                  label: 'Lögheimili',
                  value: data.taxPayerByKennitala.address,
                  action: (
                    <ActionLink href="skra.is">Breyta í þjóðskrá</ActionLink>
                  ),
                },
                {
                  label: 'Netfang',
                  value: data.taxPayerByKennitala.emailAddress,
                  action: <ActionLink href="skra.is">Breyta</ActionLink>,
                },
                {
                  label: 'Símanúmer',
                  value: data.taxPayerByKennitala.phoneNumber,
                  action: <ActionLink href="skra.is">Breyta</ActionLink>,
                },
                {
                  label: 'Bankaupplýsingar',
                  value: 'TO DO',
                  action: <ActionLink href="skra.is">Breyta</ActionLink>,
                },
              ].map((row, idx, arr) => {
                const isLast = idx === arr.length - 1
                const cellStyle = {
                  borderBottom: isLast ? undefined : '1px solid #F2F7FF',
                  background: '#fff',
                  padding: '16px 8px',
                }
                return (
                  <tr key={row.label}>
                    <th
                      style={{
                        ...cellStyle,
                        textAlign: 'left',
                        fontWeight: 600,
                        width: 180,
                      }}
                    >
                      <Text variant="default" fontWeight="semiBold">
                        {row.label}
                      </Text>
                    </th>
                    <td style={cellStyle}>
                      <Text>{row.value}</Text>
                    </td>
                    <td
                      style={{ ...cellStyle, textAlign: 'right', width: 160 }}
                    >
                      {row.action}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Box>
      )}
    </FormScreenLayout>
  )
}
