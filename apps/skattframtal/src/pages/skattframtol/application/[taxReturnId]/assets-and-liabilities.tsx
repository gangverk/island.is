import { Box, Text, Tooltip, Icon } from '@island.is/island-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import FormScreenLayout from '../../../../components/FormScreenLayout'
import Table from '../../../../components/table/Table'
import { stepKeys, stepLabels, goToStep } from '../../../../constants/formSteps'
import { QUERIES } from 'apps/skattframtal/src/graphql/queries'
import { useQuery } from '@apollo/client'
import type { Money } from '../../../../graphql/schema'
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

  console.log({ assetsData })

  const realEstateAssets = assetsData?.taxReturnById?.realEstateAssets ?? []
  const vehicleAssets = assetsData?.taxReturnById?.vehicleAssets ?? []
  const realEstateRows = realEstateAssets.map((asset) => ({
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
          {/* @ts-expect-error: propertyNumber may not exist on asset type, fallback to ID */}
          {asset.propertyNumber ?? asset.realEstateAssetID?.slice(0, 8)}
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
    right: formatMoney(asset.estimatedValue),
  }))

  const realEstateSum: Money = {
    amount: realEstateAssets.reduce(
      (acc, asset) => acc + asset.estimatedValue.amount,
      0,
    ),
  }

  const vehicleSum: Money = {
    amount: vehicleAssets.reduce(
      (acc, asset) => acc + asset.purchaseAmount.amount,
      0,
    ),
  }

  const vehicleRows = vehicleAssets.map((asset) => ({
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
      <Text as="h1" variant="h1" marginBottom={6}>
        Eignir í árslok
      </Text>
      {loading && <Text>Hleður gögnum...</Text>}
      {error && <Text>Villa kom upp: {error.message}</Text>}
      {assetsData && <Table data={tableData} />}
    </FormScreenLayout>
  )
}

export default AssetsAndLiabilitiesPage
