import {
  Box,
  Text,
  Button,
  Stack,
  Link,
  Breadcrumbs,
  Icon,
  Navigation,
} from '@island.is/island-ui/core'
import SidebarLayout from '../../../screens/Layouts/SidebarLayout'
import { useQuery } from '@apollo/client'
import NextLink from 'next/link'
import { QUERIES } from '../../../graphql/queries'

const navigationItems = [
  {
    title: 'Nýjasta framtal',
    href: '/skattframtol/application',
    active: true,
  },
  {
    title: 'Eldri framtöl',
    href: '/skattframtol/application/older',
    active: false,
  },
]

export default function Applications() {
  const kennitala = '123456789'
  // Using useQuery with TypedDocumentNode gives us full type safety
  const { loading, error, data } = useQuery(QUERIES.GET_TAX_PAYER_DATA, {
    variables: { kennitala },
  })

  return (
    <>
      <SidebarLayout
        sidebarContent={
          <Stack space={3}>
            <Box display={['none', 'none', 'block']} printHidden>
              <Link href="/skattframtol" skipTab>
                <Button size="small" type="button" variant="text" truncate>
                  <Box display="flex" alignItems="center" columnGap={1}>
                    <Icon icon="arrowBack" type="filled" size="small" />
                    Til baka í yfirlit
                  </Box>
                </Button>
              </Link>
            </Box>
            <Navigation
              items={navigationItems}
              baseId="skattframtal-application"
              title="Skattframtal"
              renderLink={(link, item) => {
                return (
                  <NextLink href={item?.href ?? '#'} passHref legacyBehavior>
                    {link}
                  </NextLink>
                )
              }}
            />
          </Stack>
        }
      >
        <Box
          display={['none', 'none', 'block']}
          printHidden
          paddingBottom={[2, 2, 4]}
        >
          <Box className="rs_read">
            <Breadcrumbs
              items={[
                {
                  title: 'island.is',
                },
                {
                  title: 'Skattframtal',
                },
                {
                  title: 'Nýjasta framtal',
                },
              ]}
              renderLink={(link) => {
                return (
                  <Link href={'#'} skipTab>
                    {link}
                  </Link>
                )
              }}
            />
          </Box>
        </Box>
        <Box
          display={['flex', 'flex', 'none']}
          justifyContent="spaceBetween"
          alignItems="center"
          printHidden
          paddingBottom={[2, 2, 4]}
        >
          <Box flexGrow={1} marginRight={6} overflow={'hidden'}>
            <Link href="/skattframtol" skipTab>
              <Button size="small" type="button" variant="text" truncate>
                <Box display="flex" alignItems="center" columnGap={1}>
                  <Icon icon="arrowBack" type="filled" size="small" />
                  Til baka í yfirlit
                </Box>
              </Button>
            </Link>
          </Box>
        </Box>

        <Box printHidden paddingY={2} display={['block', 'block', 'none']}>
          <Navigation
            items={navigationItems}
            baseId="skattframtal-application"
            title="Skattframtal"
            isMenuDialog
            renderLink={(link, item) => {
              return (
                <NextLink href={item?.href ?? '#'} passHref legacyBehavior>
                  {link}
                </NextLink>
              )
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column" rowGap={8}>
          <Stack space={4}>
            <Text variant="h1" as="h1">
              Nýjasta framtal
            </Text>

            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Stack>

          {loading && <Text>Hleður gögnum...</Text>}
          {error && <Text>Villa kom upp: {error.message}</Text>}
          {data && (
            <Box paddingY={3}>
              <Text variant="h3">Upplýsingar skattgreiðanda</Text>
              <Box paddingY={2}>
                <Text>Nafn: {data.taxPayerByKennitala.name}</Text>
                <Text>Kennitala: {data.taxPayerByKennitala.kennitala}</Text>
                <Text>Heimilisfang: {data.taxPayerByKennitala.address}</Text>
              </Box>
              {data.taxPayerByKennitala.taxReturns &&
                data.taxPayerByKennitala.taxReturns.length > 0 && (
                  <Box paddingY={2}>
                    <Text variant="h4">Skattframtöl</Text>
                    {data.taxPayerByKennitala.taxReturns.map((taxReturn) => (
                      <Box
                        key={taxReturn.taxReturnID}
                        paddingY={2}
                        borderBottomWidth="standard"
                        borderColor="blue200"
                      >
                        <Text fontWeight="semiBold">
                          Ártal: {taxReturn.fiscalYear}
                        </Text>

                        {/* Income section */}
                        {taxReturn.income && taxReturn.income.length > 0 && (
                          <Box paddingY={1}>
                            <Text variant="h5">Tekjur</Text>
                            {taxReturn.income.map((income) => (
                              <Box
                                key={income.incomeID}
                                paddingY={1}
                                paddingLeft={2}
                              >
                                <Text>
                                  {income.description}: {income.amount?.amount}
                                </Text>
                                <Text variant="small">
                                  Greiðandi: {income.payer}
                                </Text>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {/* Real Estate Assets section */}
                        {taxReturn.realEstateAssets &&
                          taxReturn.realEstateAssets.length > 0 && (
                            <Box paddingY={1}>
                              <Text variant="h5">Fasteignir</Text>
                              {taxReturn.realEstateAssets.map((asset) => (
                                <Box
                                  key={asset.realEstateAssetID}
                                  paddingY={1}
                                  paddingLeft={2}
                                >
                                  <Text>Heimilisfang: {asset.address}</Text>
                                  <Text variant="small">
                                    Áætlað verðmæti:{' '}
                                    {asset.estimatedValue.amount}
                                  </Text>
                                </Box>
                              ))}
                            </Box>
                          )}

                        {/* Vehicle Assets section */}
                        {taxReturn.vehicleAssets &&
                          taxReturn.vehicleAssets.length > 0 && (
                            <Box paddingY={1}>
                              <Text variant="h5">Ökutæki</Text>
                              {taxReturn.vehicleAssets.map((asset) => (
                                <Box
                                  key={asset.vehicleAssetID}
                                  paddingY={1}
                                  paddingLeft={2}
                                >
                                  <Text>Númer: {asset.registrationNumber}</Text>
                                  <Text variant="small">
                                    Árgerð: {asset.yearOfPurchase}
                                  </Text>
                                  <Text variant="small">
                                    Kaupverð: {asset.purchaseAmount.amount}
                                  </Text>
                                </Box>
                              ))}
                            </Box>
                          )}

                        {/* Liabilities section */}
                        {taxReturn.liabilities &&
                          taxReturn.liabilities.length > 0 && (
                            <Box paddingY={1}>
                              <Text variant="h5">Skuldir</Text>
                              {taxReturn.liabilities.map((liability) => (
                                <Box
                                  key={liability.liabilityID}
                                  paddingY={1}
                                  paddingLeft={2}
                                >
                                  <Text>{liability.description}</Text>
                                  <Text variant="small">
                                    Greiddir vextir:{' '}
                                    {liability.interestPaid.amount}
                                  </Text>
                                  <Text variant="small">
                                    Eftirstöðvar:{' '}
                                    {liability.amountRemaining.amount}
                                  </Text>
                                </Box>
                              ))}
                            </Box>
                          )}

                        {/* Residential Loans section */}
                        {taxReturn.residentialLoans &&
                          taxReturn.residentialLoans.length > 0 && (
                            <Box paddingY={1}>
                              <Text variant="h5">Íbúðalán</Text>
                              {taxReturn.residentialLoans.map((loan) => (
                                <Box
                                  key={loan.residentialLoanID}
                                  paddingY={1}
                                  paddingLeft={2}
                                >
                                  <Text>Heimilisfang: {loan.address}</Text>
                                  <Text variant="small">
                                    Lánveitandi: {loan.lenderName}
                                  </Text>
                                  <Text variant="small">
                                    Lán nr: {loan.loanNumber}
                                  </Text>
                                  <Text variant="small">
                                    Greiðsla á árinu:{' '}
                                    {loan.amountPaidInFiscalYear.amount}
                                  </Text>
                                  <Text variant="small">
                                    Vextir á árinu:{' '}
                                    {loan.interestPaidInFiscalYear.amount}
                                  </Text>
                                </Box>
                              ))}
                            </Box>
                          )}
                      </Box>
                    ))}
                  </Box>
                )}
            </Box>
          )}

          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
            padding={3}
            columnGap={4}
            borderColor="blue200"
            border="standard"
            borderRadius="large"
            flexWrap="wrap"
            flexDirection={['column', 'column', 'row']}
            rowGap={[3, 3, 0]}
          >
            <Box>
              <Text variant="h3">Skattaframtal 2025</Text>
              <Text>Skattframtal 2025 er núna opið til skila</Text>
            </Box>
            <Box>
              <Button size="medium" nowrap variant="primary">
                Hefja skattframtal
              </Button>
            </Box>
          </Box>
        </Box>
      </SidebarLayout>
    </>
  )
}
