import React from 'react'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import { Text } from '@island.is/island-ui/core'

const stepKeys = [
  'introduction',
  'personalInfo',
  'income',
  'assetsAndLiabilities',
  'liabilities',
  'review',
  'confirmAndSubmit',
]

const stepLabels: Record<string, string> = {
  introduction: 'Inngangur',
  personalInfo: 'Mínar upplýsingar',
  income: 'Tekjur',
  assetsAndLiabilities: 'Eignir og skuldir',
  liabilities: 'Skuldir',
  review: 'Yfirfara',
  confirmAndSubmit: 'Staðfesta og senda',
}

export default function Introduction() {
  return (
    <FormScreenLayout
      currentStep={0}
      stepLabels={stepKeys.map((key) => stepLabels[key])}
      onBack={() => undefined}
      onNext={() => undefined}
    >
      <Text variant="h1" as="h1" marginBottom={4}>
        {stepLabels.introduction}
      </Text>
      <Text>
        Inngangur að skattframtali er mikilvægur þáttur í að tryggja að allt sé
        rétt og skýrt. Það er gott að byrja á því að safna saman öllum
        nauðsynlegum gögnum og skjölum, svo sem launaseðlum og öðrum tekjum. Með
        því að vera vel undirbúinn geturðu auðveldað ferlið og forðast mistök.
      </Text>
    </FormScreenLayout>
  )
}
