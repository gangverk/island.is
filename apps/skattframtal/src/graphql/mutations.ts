import { gql, TypedDocumentNode } from '@apollo/client'
import {
  AddTaxReturnIncomeMutation,
  AddTaxReturnIncomeMutationVariables,
  UpdateTaxReturnIncomeMutation,
  UpdateTaxReturnIncomeMutationVariables,
} from './schema'

const ADD_TAX_RETURN_INCOME: TypedDocumentNode<
  AddTaxReturnIncomeMutation,
  AddTaxReturnIncomeMutationVariables
> = gql`
  mutation AddTaxReturnIncome(
    $taxReturnId: String!
    $input: TaxReturnIncomeInput!
  ) {
    addTaxReturnIncome(taxReturnId: $taxReturnId, input: $input) {
      incomeID
    }
  }
`

const UPDATE_TAX_RETURN_INCOME: TypedDocumentNode<
  UpdateTaxReturnIncomeMutation,
  UpdateTaxReturnIncomeMutationVariables
> = gql`
  mutation UpdateTaxReturnIncome(
    $incomeId: String!
    $input: TaxReturnIncomeInput!
  ) {
    updateTaxReturnIncome(incomeId: $incomeId, input: $input) {
      incomeID
    }
  }
`

export const MUTATIONS = {
  ADD_TAX_RETURN_INCOME,
  UPDATE_TAX_RETURN_INCOME,
}
