import { TypedDocumentNode } from '@apollo/client'
import { gql } from '@apollo/client'
import { QueryTaxPayerByKennitalaArgs, TaxPayer } from '@island.is/api/schema'

interface TaxPayerQueryResponse {
  taxPayerByKennitala: TaxPayer
}

// Using TypedDocumentNode to provide type safety for the query
const GET_ALL_TAX_RETURNS_BY_KENNITALA: TypedDocumentNode<
  TaxPayerQueryResponse,
  QueryTaxPayerByKennitalaArgs
> = gql`
  query GetTaxPayerData($kennitala: String!) {
    taxPayerByKennitala(kennitala: $kennitala) {
      taxPayerID
      taxReturns {
        taxReturnID
        fiscalYear
      }
    }
  }
`

export const GET_TAX_PAYER_BY_KENNITALA: TypedDocumentNode<
  TaxPayerQueryResponse,
  QueryTaxPayerByKennitalaArgs
> = gql`
  query GetTaxPayerData($kennitala: String!) {
    taxPayerByKennitala(kennitala: $kennitala) {
      taxPayerID
      kennitala
      name
      address
      phoneNumber
      emailAddress
    }
  }
`

export const GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID: TypedDocumentNode<
  TaxPayerQueryResponse,
  QueryTaxPayerByKennitalaArgs
> = gql`
  query GetTaxPayerIncomeByTaxReturnID($taxReturnID: String!) {
    taxPayerByKennitala(taxReturnID: $taxReturnID) {
      taxPayerID
      taxReturns {
        taxReturnID
        income {
          incomeID
          category
          description
          amount {
            amount
          }
          payer
        }
      }
    }
  }
`

export const GET_TAX_PAYER_REAL_ESTATE_ASSETS_BY_TAX_RETURN_ID: TypedDocumentNode<
  TaxPayerQueryResponse,
  QueryTaxPayerByKennitalaArgs
> = gql`
  query GetTaxPayerRealEstateAssetsByTaxReturnID($taxReturnID: String!) {
    taxPayerByKennitala(taxReturnID: $taxReturnID) {
      taxPayerID
      taxReturns {
        taxReturnID
        realEstateAssets {
          realEstateAssetID
          address
          estimatedValue {
            amount
          }
        }
      }
    }
  }
`

export const GET_TAX_PAYER_VEHICLE_ASSETS_BY_TAX_RETURN_ID: TypedDocumentNode<
  TaxPayerQueryResponse,
  QueryTaxPayerByKennitalaArgs
> = gql`
  query GetTaxPayerVehicleAssetsByTaxReturnID($taxReturnID: String!) {
    taxPayerByKennitala(taxReturnID: $taxReturnID) {
      taxPayerID
      taxReturns {
        taxReturnID
        vehicleAssets {
          vehicleAssetID
          registrationNumber
          yearOfPurchase
          purchaseAmount {
            amount
          }
        }
      }
    }
  }
`

export const GET_TAX_PAYER_RESIDENTIAL_LOANS_BY_TAX_RETURN_ID: TypedDocumentNode<
  TaxPayerQueryResponse,
  QueryTaxPayerByKennitalaArgs
> = gql`
  query GetTaxPayerResidentialLoansByTaxReturnID($taxReturnID: String!) {
    taxPayerByKennitala(taxReturnID: $taxReturnID) {
      taxPayerID
      taxReturns {
        taxReturnID
        residentialLoans {
          residentialLoanID
          yearOfPurchase
          address
          lenderKennitala
          lenderName
          loanNumber
          dateOfIssuance
          remainingTermYears
          amountPaidInFiscalYear {
            amount
          }
          interestPaidInFiscalYear {
            amount
          }
        }
      }
    }
  }
`

export const GET_TAX_PAYER_LIABILITIES_BY_TAX_RETURN_ID: TypedDocumentNode<
  TaxPayerQueryResponse,
  QueryTaxPayerByKennitalaArgs
> = gql`
  query GetTaxPayerLiabilitiesByTaxReturnID($taxReturnID: String!) {
    taxPayerByKennitala(taxReturnID: $taxReturnID) {
      taxPayerID
      taxReturns {
        taxReturnID
        liabilities {
          liabilityID
          description
          interestPaid {
            amount
          }
          amountRemaining {
            amount
          }
        }
      }
    }
  }
`

export const QUERIES = {
  GET_ALL_TAX_RETURNS_BY_KENNITALA,
  GET_TAX_PAYER_BY_KENNITALA,
  GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID,
  GET_TAX_PAYER_REAL_ESTATE_ASSETS_BY_TAX_RETURN_ID,
  GET_TAX_PAYER_VEHICLE_ASSETS_BY_TAX_RETURN_ID,
  GET_TAX_PAYER_RESIDENTIAL_LOANS_BY_TAX_RETURN_ID,
  GET_TAX_PAYER_LIABILITIES_BY_TAX_RETURN_ID,
}
