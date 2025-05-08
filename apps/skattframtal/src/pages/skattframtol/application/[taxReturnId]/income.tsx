import { Box, Text, toast } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table, { TableRowData } from '../../../../components/table/Table'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'
import { useMutation, useQuery } from '@apollo/client'
import { QUERIES } from '../../../../graphql/queries'
import { Money, TaxReturnIncome, TaxReturnIncomeCategory } from '../../../../graphql/schema'
import { formatMoney, parseMoney } from '../../../../utils/money'
import { MUTATIONS } from '../../../../graphql/mutations'
import orderBy from 'lodash/orderBy'

const IncomePage = () => {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStep = stepKeys.indexOf('income')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  const {
    data: incomeData,
    error,
  } = useQuery(QUERIES.GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID, {
    variables: { taxReturnId },
    skip: !taxReturnId,
  })

  const [updateIncome] = useMutation(MUTATIONS.UPDATE_TAX_RETURN_INCOME, {
    refetchQueries: [QUERIES.GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID],
  })
  const [addIncome] = useMutation(MUTATIONS.ADD_TAX_RETURN_INCOME, {
    refetchQueries: [QUERIES.GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID],
  })

  const income = orderBy(incomeData?.taxReturnById.income, 'payer', 'asc')

  const incomeSection = income?.filter(
    (income) => income.category === TaxReturnIncomeCategory.Salary,
  )
  const incomeSectionSum = incomeSection?.reduce(
    (acc, income) => ({
      amount: acc.amount + income.amount.amount,
    }),
    { amount: 0 } as Money,
  )

  const perDiemSection = income?.filter(
    (income) => income.category === TaxReturnIncomeCategory.Benefit,
  )
  const perDiemSectionSum = perDiemSection?.reduce(
    (acc, income) => ({
      amount: acc.amount + income.amount.amount,
    }),
    { amount: 0 } as Money,
  )

  const grantsSection = income?.filter(
    (income) => income.category === TaxReturnIncomeCategory.Grant,
  )
  const grantsSectionSum = grantsSection?.reduce(
    (acc, income) => ({
      amount: acc.amount + income.amount.amount,
    }),
    { amount: 0 } as Money,
  )

  const tableData = [
    {
      section: {
        title: 'Launatekjur og starfsgreindar greiðslur',
        sectionNumber: '2.1',
      },
      defaultRawData: {
        category: TaxReturnIncomeCategory.Salary,
      },
      rows: incomeSection?.map((income) => ({
        rawData: income,
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
      defaultRawData: {
        category: TaxReturnIncomeCategory.Benefit,
      },
      rows: perDiemSection?.map((income) => ({
        rawData: income,
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
      defaultRawData: {
        category: TaxReturnIncomeCategory.Grant,
      },
      rows: grantsSection?.map((income) => (
      [
        {
          rawData: income,
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
          rawData: income,
          left: (
            <Box display="flex" alignItems="center">
              <Text>{income.description}</Text>
            </Box>
          ),
          leftValue: '',
          rightValue: formatMoney(income.amount),
          middleValue: '',
        },
      ] as TableRowData<TaxReturnIncome>[])).flat() || [],
      sum: grantsSectionSum ? formatMoney(grantsSectionSum) : '0',
    },
  ]

  const handleChange = async (values: { rawData: TaxReturnIncome, left: string; middle: string; right: string }) => {
    let success = false
    try {
      if (values.rawData.incomeID) {
        const result = await updateIncome({
          variables: {
            incomeId: values.rawData.incomeID,
            input: {
              amount: parseMoney(values.right),
              category: values.rawData.category,
              description: values.middle,
              payer: values.left,
            },
          },
        })
        success = !!result.data?.updateTaxReturnIncome.incomeID
      } else {
        const result = await addIncome({
          variables: {
            taxReturnId,
            input: {
              amount: parseMoney(values.right),
              category: values.rawData.category,
              description: values.middle,
              payer: values.left,
            },
          },
        })
        success = !!result.data?.addTaxReturnIncome.incomeID
      }
      if (!success) {
        toast.error('Villa í uppfærslu')
      }
    } catch (error) {
      toast.error('Villa í uppfærslu')
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
      <Text as="h1" variant="h3" marginBottom={6}>
        Tekjur ársins 2024
      </Text>
      {error && <Text>Villa kom upp: {error.message}</Text>}
      {incomeData && <Table data={tableData} onChange={handleChange} />}
    </FormScreenLayout>
  )
}

export default IncomePage
