import { Box, Text, Tooltip, Icon } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table, { TableRowData } from '../../../../components/table/Table'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { QUERIES } from '../../../../graphql/queries'
import { Money, TaxReturnIncomeCategory } from '../../../../graphql/schema'
import { formatMoney, parseMoney } from '../../../../utils/money'
import { MUTATIONS } from '../../../../graphql/mutations'

const IncomePage = () => {
  const router = useRouter()
  const client = useApolloClient()
  const taxReturnId = router.query.taxReturnId as string
  const currentStep = stepKeys.indexOf('income')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  const {
    data: incomeData,
    loading,
    error,
  } = useQuery(QUERIES.GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID, {
    variables: { taxReturnId },
    skip: !taxReturnId,
  })

  console.log('incomeData', incomeData)

  const [updateIncome] = useMutation(MUTATIONS.UPDATE_TAX_RETURN_INCOME, {
    refetchQueries: [QUERIES.GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID],
  })
  const [addIncome] = useMutation(MUTATIONS.ADD_TAX_RETURN_INCOME, {
    refetchQueries: [QUERIES.GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID],
  })

  const income = incomeData?.taxReturnById.income

  const incomeSection = income?.filter(
    (income) => income.category === TaxReturnIncomeCategory.Salary,
  )
  const incomeSectionSum = incomeSection?.reduce(
    (acc, income) => ({
      amount: acc.amount + income.amount.amount,
    }),
    { amount: 0 } satisfies Money,
  )

  console.log('incomeSectionSum', incomeSectionSum)

  const perDiemSection = income?.filter(
    (income) => income.category === TaxReturnIncomeCategory.Benefit,
  )
  const perDiemSectionSum = perDiemSection?.reduce(
    (acc, income) => ({
      amount: acc.amount + income.amount.amount,
    }),
    { amount: 0 } satisfies Money,
  )

  const grantsSection = income?.filter(
    (income) => income.category === TaxReturnIncomeCategory.Grant,
  )
  const grantsSectionSum = grantsSection?.reduce(
    (acc, income) => ({
      amount: acc.amount + income.amount.amount,
    }),
    { amount: 0 } satisfies Money,
  )

  const tableData = [
    {
      section: {
        title: 'Launatekjur og starfsgreindar greiðslur',
        sectionNumber: '2.1',
      },
      rows: incomeSection?.map((income) => ({
        id: income.incomeID,
        left: (
          <Box>
            <Box display="flex" alignItems="center">
              <Text>{income.payer}</Text>
            </Box>
            <Text color="dark400" variant="small">
              {income.description}
            </Text>
          </Box>
        ),
        leftValue: income.payer,
        rightValue: formatMoney(income.amount),
        middleValue: income.description,
      })) || [],
      sum: incomeSectionSum ? formatMoney(incomeSectionSum) : '0',
    },
    {
      section: {
        title: 'Ökutækjastyrkur. Dagpeningar. Hlunnindi',
        sectionNumber: '2.2',
      },
      rows: perDiemSection?.map((income) => ({
        id: income.incomeID,
        left: (
          <Box>
            <Box display="flex" alignItems="center">
              <Text>{income.payer}</Text>
            </Box>
            <Text color="dark400" variant="small">
              {income.description}
            </Text>
          </Box>
          ),
        leftValue: income.payer,
        rightValue: formatMoney(income.amount),
        middleValue: income.description,
      })) || [],
      sum: perDiemSectionSum ? formatMoney(perDiemSectionSum) : '0',
    },
    {
      section: {
        title:
          'Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl.',
        sectionNumber: '2.3',
      },
      rows: grantsSection?.map((income) => (
      [
        {
          id: income.incomeID,
          backgroundColor: 'purple100',
          leftValue: income.payer,
          left: (
            <Box>
              <Text>{income.payer}</Text>
            </Box>
          ),
          rightValue: '',
          hideRightValue: true,
          middleValue: '',
        },
        {
          id: income.incomeID,
          left: (
            <Box display="flex" alignItems="center">
              <Text>{income.description}</Text>
            </Box>
          ),
          leftValue: '',
          rightValue: formatMoney(income.amount),
          middleValue: '',
        },
      ] satisfies TableRowData[])).flat() || [],
      sum: grantsSectionSum ? formatMoney(grantsSectionSum) : '0',
    },
  ]

  const handleChange = async (values: { id: string, left: string; middle: string; right: string }) => {
    if (values.id) {
      await updateIncome({
        variables: {
          incomeId: values.id,
          input: {
            amount: parseMoney(values.right),
            category: TaxReturnIncomeCategory.Salary,
            description: values.middle,
            payer: values.left,
          },
        },
      })
    } else {
      await addIncome({
        variables: {
          taxReturnId,
          input: {
            amount: parseMoney(values.right),
            category: TaxReturnIncomeCategory.Benefit,
            description: values.middle,
            payer: values.left,
          },
        },
      })
    }
  }

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
      {incomeData && <Table key={incomeSectionSum?.amount} data={tableData} onChange={handleChange} />}
    </FormScreenLayout>
  )
}

export default IncomePage
