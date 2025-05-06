import React, { createContext, ReactNode, useState } from 'react'

export interface TaxFormData {
  // Personal Information
  name?: string
  nationalId?: string
  email?: string
  phoneNumber?: string
  address?: string
  postalCode?: string
  city?: string

  // Income Information
  salary?: number
  otherIncome?: number
  capitalGains?: number

  // Deductions
  pensionFund?: number
  unionFees?: number
  otherDeductions?: number

  // Assets
  realEstate?: number
  vehicles?: number
  bankAccounts?: number
  otherAssets?: number

  // Debts
  mortgages?: number
  studentLoans?: number
  otherLoans?: number

  // Form control data
  submitted: boolean
  currentStep?: number
}

interface FormContextType {
  form: TaxFormData
  updateForm: (newData: Partial<TaxFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export const FormContext = createContext<FormContextType>({
  form: { submitted: false, currentStep: 1 },
  updateForm: () => {},
  nextStep: () => {},
  prevStep: () => {},
})

type FormProviderProps = {
  children: ReactNode
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [form, setForm] = useState<TaxFormData>({
    submitted: false,
    currentStep: 1,
  })

  const updateForm = (newData: Partial<TaxFormData>) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...newData,
    }))
  }

  const nextStep = () => {
    setForm((prevForm) => ({
      ...prevForm,
      currentStep: (prevForm.currentStep || 1) + 1,
    }))
  }

  const prevStep = () => {
    setForm((prevForm) => ({
      ...prevForm,
      currentStep: Math.max((prevForm.currentStep || 1) - 1, 1),
    }))
  }

  return (
    <FormContext.Provider value={{ form, updateForm, nextStep, prevStep }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
