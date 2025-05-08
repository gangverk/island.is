import { Box, Text, Button, Stack } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'

// Dummy data for summary
const dummySummary = {
  name: 'Jökull Þórðarson',
  kennitala: '120389-4569',
  year: 2025,
  income: '12.000.000',
  assets: '50.000.000',
  liabilities: '10.000.000',
  status: 'Skattframtali 2025 vegna tekna ársins 2024 hefur verið skilað',
  date: '14.03.2025 – 22:10:44',
  receipt: '000000',
}

const SummaryPage = () => {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStep = stepKeys.indexOf('summary')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

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
      <Box marginBottom={6}>
        <Text as="h1" variant="h1" marginBottom={2}>
          Kvittun fyrir skilum á skattframtali {dummySummary.year}
        </Text>
        <Text color="blue400" fontWeight="semiBold" marginBottom={1}>
          {dummySummary.date}
        </Text>
        <Text color="dark200" marginBottom={2}>
          Móttökunúmer: {dummySummary.receipt}
        </Text>
        <Text marginBottom={4}>{dummySummary.status}</Text>
        <Box
          borderBottomWidth="standard"
          borderColor="blue100"
          marginBottom={4}
        />
        <Text fontWeight="semiBold" variant="h3" marginBottom={1}>
          {dummySummary.name}
        </Text>
        <Text>{dummySummary.kennitala}</Text>
      </Box>
      <Stack space={2}>
        <Text variant="h4">Yfirlit</Text>
        <Text>Tekjur: {dummySummary.income} kr.</Text>
        <Text>Eignir: {dummySummary.assets} kr.</Text>
        <Text>Skuldir: {dummySummary.liabilities} kr.</Text>
      </Stack>
    </FormScreenLayout>
  )
}

export default SummaryPage
