import { gql, TypedDocumentNode } from '@apollo/client'
import {
  AddTaxReturnIncomeMutation,
  AddTaxReturnIncomeMutationVariables,
  UpdateTaxPayerMutation,
  UpdateTaxPayerMutationVariables,
  UpdateTaxReturnIncomeMutation,
  UpdateTaxReturnIncomeMutationVariables,
  // UpdateTaxPayerMutation,
  // UpdateTaxPayerMutationVariables,
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

const UPDATE_TAX_PAYER: TypedDocumentNode<
  UpdateTaxPayerMutation,
  UpdateTaxPayerMutationVariables
> = gql`
  mutation UpdateTaxPayer(
    $id: String!
    $phoneNumber: String!
    $emailAddress: String!
    $bankAccountNumber: String!
  ) {
    updateTaxPayer(
      id: $id
      phoneNumber: $phoneNumber
      emailAddress: $emailAddress
      bankAccountNumber: $bankAccountNumber
    ) {
      bankAccountNumber
      emailAddress
      phoneNumber
      taxPayerID
    }
  }
`

export const MUTATIONS = {
  ADD_TAX_RETURN_INCOME,
  UPDATE_TAX_RETURN_INCOME,
  UPDATE_TAX_PAYER,
}
