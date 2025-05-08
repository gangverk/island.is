import { TypedDocumentNode } from '@apollo/client'
import { gql } from '@apollo/client'
import {
  GetAllTaxReturnsByKennitalaQuery,
  GetAllTaxReturnsByKennitalaQueryVariables,
  GetTaxPayerByKennitalaQuery,
  GetTaxPayerByKennitalaQueryVariables,
  GetTaxPayerIncomeByTaxReturnIdQuery,
  GetTaxPayerIncomeByTaxReturnIdQueryVariables,
  GetTaxPayerRealEstateAssetsAndVehiclesByTaxReturnIdQuery,
  GetTaxPayerResidentialLoansAndLiabilitiesByTaxReturnIdQuery,
  GetTaxPayerResidentialLoansAndLiabilitiesByTaxReturnIdQueryVariables,
} from './schema'

// Using TypedDocumentNode to provide type safety for the query
const GET_ALL_TAX_RETURNS_BY_KENNITALA: TypedDocumentNode<
  GetAllTaxReturnsByKennitalaQuery,
  GetAllTaxReturnsByKennitalaQueryVariables
> = gql`
  query GetAllTaxReturnsByKennitala($kennitala: String!) {
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
  GetTaxPayerByKennitalaQuery,
  GetTaxPayerByKennitalaQueryVariables
> = gql`
  query GetTaxPayerByKennitala($kennitala: String!) {
    taxPayerByKennitala(kennitala: $kennitala) {
      taxPayerID
      kennitala
      name
      address
      phoneNumber
      emailAddress
      bankAccountNumber
    }
  }
`

export const GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID: TypedDocumentNode<
  GetTaxPayerIncomeByTaxReturnIdQuery,
  GetTaxPayerIncomeByTaxReturnIdQueryVariables
> = gql`
  query GetTaxPayerIncomeByTaxReturnId($taxReturnId: String!) {
    taxReturnById(taxReturnId: $taxReturnId) {
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
`

export const GET_TAX_PAYER_REAL_ESTATE_ASSETS_AND_VEHICLES_BY_TAX_RETURN_ID: TypedDocumentNode<
  GetTaxPayerRealEstateAssetsAndVehiclesByTaxReturnIdQuery,
  GetTaxPayerRealEstateAssetsAndVehiclesByTaxReturnIdQuery
> = gql`
  query GetTaxPayerRealEstateAssetsByTaxReturnId($taxReturnId: String!) {
    taxReturnById(taxReturnId: $taxReturnId) {
      taxReturnID
      realEstateAssets {
        realEstateAssetID
        address
        estimatedValue {
          amount
        }
      }
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
`

export const GET_TAX_PAYER_RESIDENTIAL_LOANS_AND_LIABILITIES_BY_TAX_RETURN_ID: TypedDocumentNode<
  GetTaxPayerResidentialLoansAndLiabilitiesByTaxReturnIdQuery,
  GetTaxPayerResidentialLoansAndLiabilitiesByTaxReturnIdQueryVariables
> = gql`
  query GetTaxPayerResidentialLoansByTaxReturnId($taxReturnId: String!) {
    taxReturnById(taxReturnId: $taxReturnId) {
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
`

export const QUERIES = {
  GET_ALL_TAX_RETURNS_BY_KENNITALA,
  GET_TAX_PAYER_BY_KENNITALA,
  GET_TAX_PAYER_INCOME_BY_TAX_RETURN_ID,
  GET_TAX_PAYER_REAL_ESTATE_ASSETS_AND_VEHICLES_BY_TAX_RETURN_ID,
  GET_TAX_PAYER_RESIDENTIAL_LOANS_AND_LIABILITIES_BY_TAX_RETURN_ID,
}
