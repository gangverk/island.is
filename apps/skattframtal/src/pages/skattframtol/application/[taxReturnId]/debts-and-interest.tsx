import { Box, Text, Icon, Input } from '@island.is/island-ui/core'
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
  {
    section: {
      title: 'Aðrar skuldir og vaxtagjöld',
      sectionNumber: '5.5',
    },
    rows: [
      // Block 1: Eftirstöðvar á korti
      {
        left: (
          <>
            <Text color="dark400" variant="small">
              Eftirstöðvar á korti
            </Text>
            <Text color="dark400" variant="small">
              123456-7890
            </Text>
          </>
        ),
      },
      {
        multi: [
          { content: null },
          { content: null },
          {
            content: (
              <Input
                name="kort-vaxtagjold"
                value="39.200"
                size="xs"
                backgroundColor="blue"
                label="Vaxtagjöld"
              />
            ),
          },
          {
            content: (
              <Input
                name="kort-eftirstodvar"
                value="217.000"
                size="xs"
                backgroundColor="blue"
                label="Eftirstöðvar skulda"
              />
            ),
          },
        ],
      },
      // Block 2: Aukalán
      {
        left: (
          <>
            <Text color="dark400" variant="small">
              Aukalán
            </Text>
          </>
        ),
      },
      {
        multi: [
          { content: null },
          { content: null },
          {
            content: (
              <Input
                name="aukalán-vaxtagjold"
                value="86.000"
                size="xs"
                backgroundColor="blue"
                label="Vaxtagjöld"
              />
            ),
          },
          {
            content: (
              <Input
                name="aukalán-eftirstodvar"
                value="980.000"
                size="xs"
                backgroundColor="blue"
                label="Eftirstöðvar skulda"
              />
            ),
          },
        ],
      },
      // Block 3: Varðan
      {
        left: (
          <>
            <Text color="dark400" variant="small">
              Varðan
            </Text>
            <Text color="dark400" variant="small">
              0142-26-732645
            </Text>
          </>
        ),
      },
      {
        multi: [
          { content: null },
          { content: null },
          {
            content: (
              <Input
                name="vardan-vaxtagjold"
                value="14.500"
                size="xs"
                backgroundColor="blue"
                label="Vaxtagjöld"
              />
            ),
          },
          {
            content: (
              <Input
                name="vardan-eftirstodvar"
                value="62.000"
                size="xs"
                backgroundColor="blue"
                label="Eftirstöðvar skulda"
              />
            ),
          },
        ],
      },
      // Block 4: Kilómetragjald
      {
        left: (
          <>
            <Text color="dark400" variant="small">
              Kilómetragjald
            </Text>
            <Text color="dark400" variant="small">
              Skatturinn
            </Text>
          </>
        ),
      },
      {
        multi: [
          { content: null },
          { content: null },
          {
            content: (
              <Input
                name="km-vaxtagjold"
                value="0"
                size="xs"
                backgroundColor="blue"
                label="Vaxtagjöld"
              />
            ),
          },
          {
            content: (
              <Input
                name="km-eftirstodvar"
                value="2.370"
                size="xs"
                backgroundColor="blue"
                label="Eftirstöðvar skulda"
              />
            ),
          },
        ],
      },
      // Block 5: Þing og sveitarsjóðsgjöld
      {
        left: (
          <>
            <Text color="dark400" variant="small">
              Þing og sveitarsjóðsgjöld
            </Text>
            <Text color="dark400" variant="small">
              Skatturinn
            </Text>
          </>
        ),
      },
      {
        multi: [
          { content: null },
          { content: null },
          {
            content: (
              <Input
                name="thing-vaxtagjold"
                value="224"
                size="xs"
                backgroundColor="blue"
                label="Vaxtagjöld"
              />
            ),
          },
          {
            content: (
              <Input
                name="thing-eftirstodvar"
                value="0"
                size="xs"
                backgroundColor="blue"
                label="Eftirstöðvar skulda"
              />
            ),
          },
        ],
      },
      // Summary row
      {
        multi: [
          {
            content: (
              <Text fontWeight="semiBold" variant="default">
                Samtals
              </Text>
            ),
          },
          { content: null },
          {
            content: (
              <Input
                name="summary-vaxtagjold"
                value="139.924"
                size="xs"
                backgroundColor="blue"
                label="Vaxtagjöld"
              />
            ),
          },
          {
            content: (
              <Input
                name="summary-eftirstodvar"
                value="1.261.370"
                size="xs"
                backgroundColor="blue"
                label="Eftirstöðvar skulda"
              />
            ),
          },
        ],
      },
    ],
  },
]

const DebtsAndInterestPage = () => {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStep = stepKeys.indexOf('debtsAndInterest')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  return (
    <FormScreenLayout
      currentStep={currentStep}
      stepLabels={stepLabelList}
      onStepChange={(stepIdx) =>
        goToStep(router, taxReturnId, stepIdx, stepKeys)
      }
      nextButtonLabel={
        currentStep === stepKeys.length - 1 ? 'Senda inn framtal' : undefined
      }
      nextButtonIcon={
        currentStep === stepKeys.length - 1 ? 'checkmark' : undefined
      }
    >
      <Text as="h1" variant="h1" marginBottom={6}>
        Skuldir og vaxtagjöld
      </Text>
      <Table data={tableData} />
    </FormScreenLayout>
  )
}

export default DebtsAndInterestPage
