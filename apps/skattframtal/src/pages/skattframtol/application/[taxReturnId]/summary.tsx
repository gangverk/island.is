import { Box, Text, Button, Stack } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import { stepKeys, stepLabels } from '../../../../constants/formSteps'
import { useQuery } from '@apollo/client'
import { QUERIES } from '../../../../graphql/queries'

// Dummy values for fields not available in the tax payer query
const dummySummary = {
  year: 2025,
  status: 'Skattframtali 2025 vegna tekna ársins 2024 hefur verið skilað',
  date: '14.03.2025 – 22:10:44',
  receipt: '144535',
}

const SummaryPage = () => {
  const router = useRouter()
  const currentStep = stepKeys.indexOf('summary')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  const { data, loading, error } = useQuery(
    QUERIES.GET_TAX_PAYER_BY_KENNITALA,
    { variables: { kennitala: '1203894569' } },
  )

  return (
    <FormScreenLayout
      currentStep={currentStep}
      stepLabels={stepLabelList}
      onStepChange={() => router.replace('/skattframtol')}
      secondaryButton={
        <Button icon="download" iconType="outline" fluid={true}>
          Sækja PDF
        </Button>
      }
      primaryButton={
        <Button icon="print" iconType="outline" fluid={true}>
          Prenta
        </Button>
      }
    >
      <Text variant="h1" as="h1" marginBottom={3}>
        Kvittun fyrir skilum á skattframtali {dummySummary.year}
      </Text>
      {loading && <Text>Hleður gögnum...</Text>}
      {error && <Text>Villa kom upp: {error.message}</Text>}
      {data && (
        <Box marginBottom={6}>
          <Text color="blue400" fontWeight="semiBold" marginBottom={1}>
            {dummySummary.date}
          </Text>
          <Text color="dark300" marginBottom={2}>
            Móttökunúmer: {dummySummary.receipt}
          </Text>
          <Text marginBottom={4}>{dummySummary.status}</Text>
          <Box
            borderBottomWidth="standard"
            borderColor="blue100"
            marginBottom={4}
          />
          <Text fontWeight="semiBold" variant="h3" marginBottom={1}>
            {data.taxPayerByKennitala.name}
          </Text>
          <Text>{data.taxPayerByKennitala.kennitala}</Text>
        </Box>
      )}
    </FormScreenLayout>
  )
}

export default SummaryPage
