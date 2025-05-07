import { Box, Text, Tooltip, Icon } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table from '../../../../components/table/Table'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'
import { useQuery } from '@apollo/client'
import { QUERIES } from '../../../../graphql/queries'

const IncomePage = () => {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStep = stepKeys.indexOf('income')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  const { data, loading, error } = useQuery(
    QUERIES.GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID,
    {
      variables: { taxReturnId },
    },
  )

  console.log(data)

  const tableData = [
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
                    <Tooltip text="Upplýsingar um launagreiðandann Norðurljós Software ehf">
                      <Icon
                        icon="informationCircle"
                        color="dark200"
                        size="small"
                      />
                    </Tooltip>
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
                  <Tooltip text="Upplýsingar um launagreiðandann Mús og merki ehf">
                    <Icon
                      icon="informationCircle"
                      color="dark200"
                      size="small"
                    />
                  </Tooltip>
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
                <Tooltip text="Dagpeningar eru greiðslur sem launþegi fær vegna ferða eða dvalar utan heimilis.">
                  <Icon icon="informationCircle" color="dark200" size="small" />
                </Tooltip>
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
                <Tooltip text="Íþróttastyrkur er styrkur sem veittur er vegna þátttöku í íþróttum.">
                  <Icon icon="informationCircle" color="dark200" size="small" />
                </Tooltip>
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
                <Tooltip text="Starfsmenntastyrkur er styrkur til starfsmenntunar eða endurmenntunar.">
                  <Icon icon="informationCircle" color="dark200" size="small" />
                </Tooltip>
              </Box>
            </Box>
          ),
          right: '130.000',
        },
      ],
      sum: '205.000',
    },
  ]

  return (
    <FormScreenLayout
      currentStep={currentStep}
      stepLabels={stepLabelList}
      onStepChange={(stepIdx) =>
        goToStep(router, taxReturnId, stepIdx, stepKeys)
      }
    >
      <Text as="h1" variant="h1" marginBottom={6}>
        Tekjur ársins 2024
      </Text>
      {loading && <Text>Hleður gögnum...</Text>}
      {error && <Text>Villa kom upp: {error.message}</Text>}
      {data && <Table data={tableData} />}
    </FormScreenLayout>
  )
}

export default IncomePage
