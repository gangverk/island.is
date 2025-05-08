import { Box, Text, Icon, Input, Button } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table from '../../../../components/table/Table'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'
import { QUERIES } from '../../../../graphql/queries'
import { useQuery } from '@apollo/client'
import type {
  TaxReturnResidentialLoan,
  TaxReturnGenericLiability,
} from '../../../../graphql/schema'
import { formatMoney } from '../../../../utils/money'

const DebtsAndInterestPage = () => {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStep = stepKeys.indexOf('debtsAndInterest')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  const { data, loading, error } = useQuery(
    QUERIES.GET_TAX_PAYER_RESIDENTIAL_LOANS_AND_LIABILITIES_BY_TAX_RETURN_ID,
    {
      variables: { taxReturnId },
      skip: !taxReturnId,
    },
  )

  const residentialLoans: TaxReturnResidentialLoan[] =
    data?.taxReturnById?.residentialLoans ?? []
  const liabilities: TaxReturnGenericLiability[] =
    data?.taxReturnById?.liabilities ?? []

  // Section 1: Vaxtagjöld vegna íbúðarhúsnæðis til eigin nota
  const residentialLoanRows = residentialLoans.flatMap((loan) => [
    {
      multi: [
        {
          content: (
            <Box>
              <Text variant="small" color="dark400">
                Staðsetning
              </Text>
              <Box display="flex" alignItems="center">
                <Text>{loan.address}</Text>
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
              <Text>{loan.yearOfPurchase}</Text>
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
              <Text>{loan.lenderName}</Text>
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
              <Text>{loan.lenderKennitala}</Text>
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
              <Text>{loan.loanNumber}</Text>
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
              <Text>{loan.dateOfIssuance}</Text>
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
              <Text>{loan.remainingTermYears}</Text>
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
                <Text fontWeight="semiBold">
                  {formatMoney(loan.amountPaidInFiscalYear)}
                </Text>
              </Box>
            </Box>
          ),
        },
        {
          content: (
            <Box display="flex" flexDirection="column">
              <Text variant="small" color="dark400" marginBottom={1}>
                Vaxtagjöld
              </Text>
              <Box display="flex" alignItems="center">
                <Box
                  background="blue100"
                  borderRadius="large"
                  padding={1}
                  marginRight={2}
                >
                  <Icon icon="add" color="blue600" size="small" />
                </Box>
                <Text fontWeight="semiBold">
                  {formatMoney(loan.interestPaidInFiscalYear)}
                </Text>
              </Box>
            </Box>
          ),
        },
        { content: null },
        { content: null },
      ],
    },
  ])

  // Section 2: Aðrar skuldir og vaxtagjöld
  const liabilityRows = liabilities.flatMap((liability, idx) => [
    {
      left: (
        <>
          <Text color="dark400" variant="small">
            {liability.description}
          </Text>
        </>
      ),
      hideRightValue: true,
    },
    {
      multi: [
        { content: null },
        { content: null },
        {
          content: (
            <Input
              name={`liability-vaxtagjold-${idx}`}
              value={formatMoney(liability.interestPaid)}
              size="xs"
              backgroundColor="blue"
              label="Vaxtagjöld"
            />
          ),
        },
        {
          content: (
            <Input
              name={`liability-eftirstodvar-${idx}`}
              value={formatMoney(liability.amountRemaining)}
              size="xs"
              backgroundColor="blue"
              label="Eftirstöðvar skulda"
            />
          ),
        },
      ],
    },
  ])

  const tableData = [
    {
      section: {
        title: 'Vaxtagjöld vegna íbúðarhúsnæðis til eigin nota',
        sectionNumber: '5.2',
      },
      rows: residentialLoanRows,
    },
    {
      section: {
        title: 'Aðrar skuldir og vaxtagjöld',
        sectionNumber: '5.5',
      },
      rows: liabilityRows,
    },
  ]

  return (
    <FormScreenLayout
      currentStep={currentStep}
      stepLabels={stepLabelList}
      onStepChange={(stepIdx) =>
        goToStep(router, taxReturnId, stepIdx, stepKeys)
      }
      primaryButton={
        <Button
          icon="checkmark"
          iconType="filled"
          onClick={() =>
            goToStep(router, taxReturnId, currentStep + 1, stepKeys)
          }
          fluid={true}
        >
          Senda inn framtal
        </Button>
      }
    >
      <Text as="h1" variant="h3" marginBottom={6}>
        Skuldir og vaxtagjöld
      </Text>
      {loading && <Text>Hleður gögnum...</Text>}
      {error && <Text>Villa kom upp: {error.message}</Text>}
      {!loading && !error && <Table data={tableData} />}
    </FormScreenLayout>
  )
}

export default DebtsAndInterestPage
