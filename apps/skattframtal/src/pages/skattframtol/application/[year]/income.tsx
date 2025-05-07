import { Box, Text, Tooltip, Icon } from '@island.is/island-ui/core'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table from '../../../../components/table/Table'
import ClientOnly from '../../../../components/ClientOnly'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'

const data = [
  {
    section: {
      title: 'Launatekjur og starfsgreindar greiðslur',
      sectionNumber: '2.1',
    },
    rows: [
      {
        left: (
          <>
            <Box>
              <Box display="flex" alignItems="center">
                <Text>Norðurljós Software ehf</Text>
                <Box marginLeft={1}>
                  <ClientOnly>
                    <Tooltip text="Upplýsingar um launagreiðandann Norðurljós Software ehf">
                      <Icon
                        icon="informationCircle"
                        color="dark200"
                        size="small"
                      />
                    </Tooltip>
                  </ClientOnly>
                </Box>
              </Box>
              <Text color="dark400" variant="small">
                123456-7890
              </Text>
            </Box>
          </>
        ),
        right: '9.360.000',
      },
      {
        left: (
          <Box>
            <Box display="flex" alignItems="center">
              <Text>Mús og merki ehf</Text>
              <Box marginLeft={1}>
                <ClientOnly>
                  <Tooltip text="Upplýsingar um launagreiðandann Mús og merki ehf">
                    <Icon
                      icon="informationCircle"
                      color="dark200"
                      size="small"
                    />
                  </Tooltip>
                </ClientOnly>
              </Box>
            </Box>
            <Text color="dark400" variant="small">
              123456-7890
            </Text>
          </Box>
        ),
        right: '900.000',
      },
    ],
    sum: '10.260.000',
  },
  {
    section: {
      title: 'Ökutækjastyrkur',
      sectionNumber: '2.2',
    },
    rows: [
      {
        left: (
          <Box display="flex" alignItems="center">
            <Text>Dagpeningar</Text>
            <Box marginLeft={1}>
              <ClientOnly>
                <Tooltip text="Dagpeningar eru greiðslur sem launþegi fær vegna ferða eða dvalar utan heimilis.">
                  <Icon icon="informationCircle" color="dark200" size="small" />
                </Tooltip>
              </ClientOnly>
            </Box>
          </Box>
        ),
        right: '120.000',
      },
    ],
    sum: '120.000',
  },
  {
    section: {
      title:
        'Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl.',
      sectionNumber: '2.3',
    },
    rows: [
      {
        left: (
          <Box>
            <Text>Norðurljós Software ehf</Text>
            <Text variant="small">123456-7890</Text>
          </Box>
        ),
        right: null,
      },
      {
        left: (
          <Box display="flex" alignItems="center">
            <Text>Íþróttastyrkur</Text>
            <Box marginLeft={1}>
              <ClientOnly>
                <Tooltip text="Íþróttastyrkur er styrkur sem veittur er vegna þátttöku í íþróttum.">
                  <Icon icon="informationCircle" color="dark200" size="small" />
                </Tooltip>
              </ClientOnly>
            </Box>
          </Box>
        ),
        right: '75.000',
      },
      {
        left: (
          <Box>
            <Text>VR</Text>
            <Text variant="small">123456-7890</Text>
          </Box>
        ),
        right: null,
      },
      {
        left: (
          <Box display="flex" alignItems="center">
            <Text>Starfsmenntastyrkur</Text>
            <Box marginLeft={1}>
              <ClientOnly>
                <Tooltip text="Starfsmenntastyrkur er styrkur til starfsmenntunar eða endurmenntunar.">
                  <Icon icon="informationCircle" color="dark200" size="small" />
                </Tooltip>
              </ClientOnly>
            </Box>
          </Box>
        ),
        right: '130.000',
      },
    ],
    sum: '205.000',
  },
]

const IncomePage = () => {
  const router = useRouter()
  const { year } = router.query
  const currentStep = stepKeys.indexOf('income')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  return (
    <FormScreenLayout
      currentStep={currentStep}
      stepLabels={stepLabelList}
      onBack={() => {
        goToStep(router, String(year), currentStep - 1, stepKeys)
      }}
      onNext={() => {
        goToStep(router, String(year), currentStep + 1, stepKeys)
      }}
    >
      <Text as="h1" variant="h1" marginBottom={6}>
        Tekjur ársins 2024
      </Text>
      <Table data={data} />
    </FormScreenLayout>
  )
}

export default IncomePage
