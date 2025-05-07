import { Box, Text } from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import TableSection from '../../../../components/table/TableSection'
import TableRow from '../../../../components/table/TableRow'
import TableSumRow from '../../../../components/table/TableSumRow'
import AddLineButton from '../../../../components/table/AddLineButton'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'

const incomeData = [
  {
    section: {
      title: 'Launatekjur og starfsgreindar greiðslur',
      sectionNumber: '2.1',
    },
    rows: [
      {
        left: (
          <>
            <Text>Norðurljós Software ehf</Text>
            <Text variant="small">123456-7890</Text>
          </>
        ),
        right: '9.360.000',
      },
      {
        left: (
          <>
            <Text fontWeight="semiBold">Mús og merki ehf</Text>
            <Text variant="small">123456-7890</Text>
          </>
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
        left: <Text>Dagpeningar</Text>,
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
        left: <Text>Íþróttastyrkur</Text>,
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
        left: <Text>Starfsmenntastyrkur</Text>,
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
      {incomeData.map((section) => (
        <Box key={section.section.sectionNumber} marginBottom={4}>
          <TableSection
            title={section.section.title}
            sectionNumber={section.section.sectionNumber}
          />
          {section.rows.map((row, rIdx) => (
            <TableRow
              key={`${section.section.sectionNumber}-${rIdx}`}
              left={row.left}
              right={row.right}
            />
          ))}
          <TableSumRow
            sumLabel="Samtals"
            sumValue={section.sum}
            left={<AddLineButton onClick={() => {}} />}
          />
        </Box>
      ))}
    </FormScreenLayout>
  )
}

export default IncomePage
