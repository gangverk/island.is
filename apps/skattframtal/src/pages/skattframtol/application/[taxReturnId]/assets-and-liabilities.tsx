import { Box, Text, Tooltip, Icon } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table from '../../../../components/table/Table'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'

const data = [
  {
    section: {
      title: 'Innlendar fasteignir',
      sectionNumber: '4.1',
    },
    rows: [
      {
        left: (
          <Box>
            <Box display="flex" alignItems="center">
              <Text>Fastanúmer</Text>
              <Box marginLeft={1}>
                <Tooltip text="Sérstakt númer fasteignar.">
                  <Icon icon="informationCircle" color="dark200" size="small" />
                </Tooltip>
              </Box>
            </Box>
            <Text color="dark400" variant="small">
              210-9876
            </Text>
          </Box>
        ),
        middle: (
          <Box>
            <Text>Bláfjallagata</Text>
            <Text color="dark400" variant="small">
              Fasteignamat
            </Text>
          </Box>
        ),
        right: '52.000.000',
      },
    ],
    sum: '52.000.000',
  },
  {
    section: {
      title: 'Bifreiðir',
      sectionNumber: '2.2',
    },
    rows: [
      {
        left: (
          <Box>
            <Text>Nissan Leaf</Text>
            <Text color="dark400" variant="small">
              Svartur – KB521
            </Text>
          </Box>
        ),
        middle: (
          <Box>
            <Text>Kaupár</Text>
            <Text color="dark400" variant="small">
              2021
            </Text>
          </Box>
        ),
        right: '3.100.000',
      },
      {
        left: (
          <Box>
            <Text>Range Rover</Text>
            <Text color="dark400" variant="small">
              Bleikur – JUJ29
            </Text>
          </Box>
        ),
        middle: (
          <Box>
            <Text>Kaupár</Text>
            <Text color="dark400" variant="small">
              2012
            </Text>
          </Box>
        ),
        right: '430.000',
      },
    ],
    sum: '3.530.000',
  },
]

const AssetsAndLiabilitiesPage = () => {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStep = stepKeys.indexOf('assetsAndLiabilities')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  return (
    <FormScreenLayout
      currentStep={currentStep}
      stepLabels={stepLabelList}
      onStepChange={(stepIdx) =>
        goToStep(router, taxReturnId, stepIdx, stepKeys)
      }
    >
      <Text as="h1" variant="h1" marginBottom={6}>
        Eignir í árslok
      </Text>
      <Table data={data} />
    </FormScreenLayout>
  )
}

export default AssetsAndLiabilitiesPage
