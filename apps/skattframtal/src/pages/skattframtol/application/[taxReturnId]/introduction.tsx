import React from 'react'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import { Text } from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'

export default function Introduction() {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStepIndex = 0

  return (
    <FormScreenLayout
      currentStep={currentStepIndex}
      stepLabels={stepKeys.map((key) => stepLabels[key])}
      onStepChange={(stepIdx) =>
        goToStep(router, taxReturnId, stepIdx, stepKeys)
      }
      onGoBack={() => router.push('/skattframtol/application')}
      secondaryButton={null}
    >
      <Text variant="h3" as="h1" marginBottom={4}>
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
