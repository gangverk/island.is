import { Box, Text } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table from '../../../../components/table/Table'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'
import { QUERIES } from '../../../../graphql/queries'
import { useQuery } from '@apollo/client'
import type {
  Money,
  TaxReturnIcelandicRealEstate,
  TaxReturnVehicle,
} from '../../../../graphql/schema'
import { formatMoney } from '../../../../utils/money'

const AssetsAndLiabilitiesPage = () => {
  const router = useRouter()
  const taxReturnId = router.query.taxReturnId as string
  const currentStep = stepKeys.indexOf('assetsAndLiabilities')
  const stepLabelList = stepKeys.map((key) => stepLabels[key])

  const {
    data: assetsData,
    loading,
    error,
  } = useQuery(
    QUERIES.GET_TAX_PAYER_REAL_ESTATE_ASSETS_AND_VEHICLES_BY_TAX_RETURN_ID,
    {
      variables: { taxReturnId },
      skip: !taxReturnId,
    },
  )

  const realEstateAssets = assetsData?.taxReturnById?.realEstateAssets ?? []
  const vehicleAssets = assetsData?.taxReturnById?.vehicleAssets ?? []

  const realEstateRows = realEstateAssets.map(
    (asset: TaxReturnIcelandicRealEstate) => ({
      left: (
        <Box>
          <Box display="flex" alignItems="center">
            <Text>Fastanúmer</Text>
          </Box>
          <Text color="dark400" variant="small">
            {asset.realEstateAssetID?.slice(0, 8)}
          </Text>
        </Box>
      ),
      middle: (
        <Box>
          <Text>{asset.address}</Text>
          <Text color="dark400" variant="small">
            Fasteignamat
          </Text>
        </Box>
      ),
      rightValue: formatMoney(asset.estimatedValue),
    }),
  )

  const realEstateSum: Money = {
    amount: realEstateAssets.reduce(
      (acc: number, asset: TaxReturnIcelandicRealEstate) =>
        acc + asset.estimatedValue.amount,
      0,
    ),
  }

  const vehicleSum: Money = {
    amount: vehicleAssets.reduce(
      (acc: number, asset: TaxReturnVehicle) =>
        acc + asset.purchaseAmount.amount,
      0,
    ),
  }

  const vehicleRows = vehicleAssets.map((asset: TaxReturnVehicle) => ({
    left: (
      <Box>
        <Text fontWeight="semiBold">Skráningarnúmer</Text>
        <Text color="dark400" variant="small">
          {asset.registrationNumber}
        </Text>
      </Box>
    ),
    middle: (
      <Box>
        <Text fontWeight="semiBold">Kaupár</Text>
        <Text color="dark400" variant="small">
          {asset.yearOfPurchase}
        </Text>
      </Box>
    ),
    right: (
      <Box>
        <Text fontWeight="semiBold">Kaupfjárhæð</Text>
        <Text color="dark400" variant="small">
          {formatMoney(asset.purchaseAmount)}
        </Text>
      </Box>
    ),
    rightValue: formatMoney(asset.purchaseAmount),
  }))

  const vehicleSection = {
    section: {
      title: 'Bifreiðir',
      sectionNumber: '2.2',
    },
    rows: vehicleRows,
    sum: formatMoney(vehicleSum),
  }

  const tableData = [
    {
      section: {
        title: 'Innlendar fasteignir',
        sectionNumber: '4.1',
      },
      rows: realEstateRows,
      sum: formatMoney(realEstateSum),
    },
    vehicleSection,
  ]

  return (
    <FormScreenLayout
      currentStep={currentStep}
      stepLabels={stepLabelList}
      onStepChange={(stepIdx) =>
        goToStep(router, taxReturnId, stepIdx, stepKeys)
      }
    >
      <Text as="h1" variant="h3" marginBottom={6}>
        Eignir í árslok
      </Text>
      {loading && <Text>Hleður gögnum...</Text>}
      {error && <Text>Villa kom upp: {error.message}</Text>}
      {assetsData && <Table data={tableData} />}
    </FormScreenLayout>
  )
}

export default AssetsAndLiabilitiesPage
