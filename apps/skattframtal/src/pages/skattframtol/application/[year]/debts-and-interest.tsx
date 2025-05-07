import { Box, Text, Tooltip, Icon, Input } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table from '../../../../components/table/Table'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'

// Example data for debts and interest
const tableData = [
  {
    section: {
      title: 'Vaxtagjöld vegna íbúðarhúsnæðis til eigin nota',
      sectionNumber: '5.2',
    },
    rows: [
      {
        multi: [
          {
            content: (
              <Box>
                <Text variant="small" color="dark400">
                  Staðsetning
                </Text>
                <Box display="flex" alignItems="center">
                  <Text>Bláfjallagata 12</Text>
                  <Box marginLeft={1}>
                    <Tooltip text="Heimilisfang fasteignar.">
                      <Icon
                        icon="informationCircle"
                        color="dark200"
                        size="small"
                      />
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            ),
            width: '25%',
          },
          {
            content: (
              <Box>
                <Text variant="small" color="dark400">
                  Kaupár
                </Text>
                <Text>2021</Text>
              </Box>
            ),
            width: '15%',
          },
          {
            content: (
              <Box>
                <Text variant="small" color="dark400">
                  Lánveitandi
                </Text>
                <Text>Íslandsbanki hf</Text>
              </Box>
            ),
            width: '30%',
          },
          {
            content: (
              <Box>
                <Text variant="small" color="dark400">
                  Kennitala lánveitanda
                </Text>
                <Text>491008-0160</Text>
              </Box>
            ),
            width: '30%',
          },
        ],
      },
      {
        multi: [
          {
            content: (
              <Box>
                <Text variant="small" color="dark400">
                  Lánsnúmer
                </Text>
                <Text>56783900123</Text>
              </Box>
            ),
            width: '33%',
          },
          {
            content: (
              <Box>
                <Text variant="small" color="dark400">
                  Lántökudagur
                </Text>
                <Text>15.júní 2021</Text>
              </Box>
            ),
            width: '33%',
          },
          {
            content: (
              <Box>
                <Text variant="small" color="dark400">
                  Lánstími í árum
                </Text>
                <Text>30</Text>
              </Box>
            ),
            width: '33%',
          },
        ],
      },
      {
        multi: [
          {
            content: (
              <Box display="flex" flexDirection="column">
                <Text variant="small" color="dark400" marginBottom={1}>
                  Heildargreiðslur ársins
                </Text>
                <Box display="flex" alignItems="center">
                  <Box
                    background="mint100"
                    borderRadius="large"
                    padding={1}
                    marginRight={2}
                  >
                    <Icon icon="add" color="mint600" size="small" />
                  </Box>
                  <Text fontWeight="semiBold">2.280.000</Text>
                </Box>
              </Box>
            ),
          },
          {
            content: (
              <Box display="flex" flexDirection="column">
                <Text variant="small" color="dark400" marginBottom={1}>
                  Afborganir á nafnverði
                </Text>
                <Box display="flex" alignItems="center">
                  <Box
                    background="red100"
                    borderRadius="large"
                    padding={1}
                    marginRight={2}
                  >
                    <Icon icon="remove" color="red600" size="small" />
                  </Box>
                  <Text fontWeight="semiBold">1.360.000</Text>
                </Box>
              </Box>
            ),
          },
          {
            content: null,
          },
          {
            content: null,
          },
        ],
      },
      {
        multi: [
          { content: null },
          { content: null },
          {
            content: (
              <Box>
                <Input
                  name="vaxtagjold-1"
                  value="920.000"
                  label="Vaxtagjöld"
                  size="xs"
                  backgroundColor="blue"
                />
              </Box>
            ),
          },
          {
            content: (
              <Box marginTop={[2, 0]}>
                <Input
                  name="eftirstodvar-1"
                  value="28.540.000"
                  size="xs"
                  backgroundColor="blue"
                  label="Eftirstöðvar skulda"
                />
              </Box>
            ),
          },
        ],
      },
    ],
  },
  // ... Add more sections/rows as needed for the rest of the screen ...
]

const DebtsAndInterestPage = () => {
  const router = useRouter()
  const { year } = router.query
  const currentStep = stepKeys.indexOf('debtsAndInterest')
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
        Skuldir og vaxtagjöld
      </Text>
      <Table data={tableData} />
    </FormScreenLayout>
  )
}

export default DebtsAndInterestPage
