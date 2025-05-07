import React from 'react'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import { Text, Box } from '@island.is/island-ui/core'
import ActionLink from '../../../../components/ActionLink'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'

export default function MyInformation() {
  const router = useRouter()
  const params = useParams() as Record<string, string | string[]> | undefined
  const year = (params?.year ||
    params?.id ||
    router.query.year ||
    router.query.id ||
    '') as string
  const currentStepIndex = 1

  return (
    <FormScreenLayout
      currentStep={currentStepIndex}
      stepLabels={stepKeys.map((key) => stepLabels[key])}
      onStepChange={(stepIdx) => goToStep(router, year, stepIdx, stepKeys)}
    >
      <Text variant="h1" as="h1" marginBottom={3}>
        Mínar upplýsingar
      </Text>
      <Text marginBottom={7}>
        Hér eru gögn um þig og fjölskyldu þína sem sótt eru til Þjóðskrár. Með
        því að smella á skoða upplýsingar er hægt að óska eftir breytingum á
        þeim upplýsingum.
      </Text>
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
                value: 'Jökull Þórðarson',
                action: (
                  <ActionLink href="skra.is">Breyta í þjóðskrá</ActionLink>
                ),
              },
              {
                label: 'Kennitala',
                value: '120389-4569',
                action: null,
              },
              {
                label: 'Lögheimili',
                value: 'Bláfjallagata 12, 105 Reykjavík',
                action: (
                  <ActionLink href="skra.is">Breyta í þjóðskrá</ActionLink>
                ),
              },
              {
                label: 'Netfang',
                value: 'jokull.thordarson@internet.is',
                action: <ActionLink href="skra.is">Breyta</ActionLink>,
              },
              {
                label: 'Símanúmer',
                value: '772-8391',
                action: <ActionLink href="skra.is">Breyta</ActionLink>,
              },
              {
                label: 'Bankaupplýsingar',
                value: '0000-00-0000000',
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
                  <td style={{ ...cellStyle, textAlign: 'right', width: 160 }}>
                    {row.action}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Box>
    </FormScreenLayout>
  )
}
