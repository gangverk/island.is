import { TypedDocumentNode } from '@apollo/client'
import { gql } from '@apollo/client'
import { QueryTaxPayerByKennitalaArgs, TaxPayer } from '@island.is/api/schema'

interface TaxPayerQueryResponse {
  taxPayerByKennitala: TaxPayer
}

// Using TypedDocumentNode to provide type safety for the query
const GET_TAX_PAYER_DATA: TypedDocumentNode<
  TaxPayerQueryResponse,
  QueryTaxPayerByKennitalaArgs
> = gql`
  query GetTaxPayerData($kennitala: String!) {
    taxPayerByKennitala(kennitala: $kennitala) {
      taxPayerID
      name
      kennitala
      address
      phoneNumber
      emailAddress
      taxReturns {
        taxReturnID
        fiscalYear
        income {
          incomeID
          category
          description
          amount {
            amount
          }
          payer
        }
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

export const QUERIES = {
  GET_TAX_PAYER_DATA,
}
