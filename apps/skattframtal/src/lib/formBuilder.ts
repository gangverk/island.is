import {
  buildForm,
  buildSection,
  buildMultiField,
  buildTextField,
  buildDescriptionField,
  buildSubmitField,
  buildDividerField,
} from '@island.is/application/core'
import { DefaultEvents, FormModes, Form } from '@island.is/application/types'

export const buildPersonalInfoSection = () => {
  return buildSection({
    id: 'personalInfo',
    title: 'Persónuupplýsingar',
    children: [
      buildMultiField({
        id: 'personalInfoFields',
        title: 'Persónuupplýsingar',
        description:
          'Vinsamlegast fylltu út eftirfarandi upplýsingar til að halda áfram.',
        children: [
          buildTextField({
            id: 'name',
            title: 'Nafn',
            backgroundColor: 'blue',
            required: true,
          }),
          buildTextField({
            id: 'nationalId',
            title: 'Kennitala',
            backgroundColor: 'blue',
            placeholder: '######-####',
            required: true,
          }),
          buildTextField({
            id: 'email',
            title: 'Netfang',
            variant: 'email',
            backgroundColor: 'blue',
            required: true,
          }),
          buildTextField({
            id: 'phoneNumber',
            title: 'Símanúmer',
            variant: 'tel',
            backgroundColor: 'blue',
            required: true,
          }),
          buildTextField({
            id: 'address',
            title: 'Heimilisfang',
            backgroundColor: 'blue',
            required: true,
          }),
          buildTextField({
            id: 'postalCode',
            title: 'Póstnúmer',
            backgroundColor: 'blue',
            placeholder: '###',
            required: true,
          }),
          buildTextField({
            id: 'city',
            title: 'Staður',
            backgroundColor: 'blue',
            required: true,
          }),
        ],
      }),
    ],
  })
}

export const buildIncomeSection = () => {
  return buildSection({
    id: 'incomeInfo',
    title: 'Tekjuupplýsingar',
    children: [
      buildMultiField({
        id: 'incomeFields',
        title: 'Tekjuupplýsingar',
        description:
          'Vinsamlegast fylltu út eftirfarandi upplýsingar um tekjur þínar.',
        children: [
          buildTextField({
            id: 'salary',
            title: 'Laun og hlunnindi',
            variant: 'number',
            backgroundColor: 'blue',
            required: true,
          }),
          buildTextField({
            id: 'otherIncome',
            title: 'Aðrar tekjur',
            variant: 'number',
            backgroundColor: 'blue',
          }),
          buildTextField({
            id: 'capitalGains',
            title: 'Fjármagnstekjur',
            variant: 'number',
            backgroundColor: 'blue',
          }),
        ],
      }),
    ],
  })
}

export const buildDeductionsSection = () => {
  return buildSection({
    id: 'deductions',
    title: 'Frádráttarliðir',
    children: [
      buildMultiField({
        id: 'deductionFields',
        title: 'Frádráttarliðir',
        description:
          'Vinsamlegast fylltu út eftirfarandi upplýsingar um frádráttarliði.',
        children: [
          buildTextField({
            id: 'pensionFund',
            title: 'Lífeyrissjóðsiðgjöld',
            variant: 'number',
            backgroundColor: 'blue',
          }),
          buildTextField({
            id: 'unionFees',
            title: 'Stéttarfélagsgjöld',
            variant: 'number',
            backgroundColor: 'blue',
          }),
          buildTextField({
            id: 'otherDeductions',
            title: 'Aðrir frádráttarliðir',
            variant: 'number',
            backgroundColor: 'blue',
          }),
        ],
      }),
    ],
  })
}

export const buildAssetsSection = () => {
  return buildSection({
    id: 'assets',
    title: 'Eignir',
    children: [
      buildMultiField({
        id: 'assetFields',
        title: 'Eignir',
        description:
          'Vinsamlegast fylltu út eftirfarandi upplýsingar um eignir þínar.',
        children: [
          buildTextField({
            id: 'realEstate',
            title: 'Fasteignir',
            variant: 'number',
            backgroundColor: 'blue',
          }),
          buildTextField({
            id: 'vehicles',
            title: 'Ökutæki',
            variant: 'number',
            backgroundColor: 'blue',
          }),
          buildTextField({
            id: 'bankAccounts',
            title: 'Bankainnistæður',
            variant: 'number',
            backgroundColor: 'blue',
          }),
          buildTextField({
            id: 'otherAssets',
            title: 'Aðrar eignir',
            variant: 'number',
            backgroundColor: 'blue',
          }),
        ],
      }),
    ],
  })
}

export const buildDebtsSection = () => {
  return buildSection({
    id: 'debts',
    title: 'Skuldir',
    children: [
      buildMultiField({
        id: 'debtFields',
        title: 'Skuldir',
        description:
          'Vinsamlegast fylltu út eftirfarandi upplýsingar um skuldir þínar.',
        children: [
          buildTextField({
            id: 'mortgages',
            title: 'Fasteignaveðlán',
            variant: 'number',
            backgroundColor: 'blue',
          }),
          buildTextField({
            id: 'studentLoans',
            title: 'Námslán',
            variant: 'number',
            backgroundColor: 'blue',
          }),
          buildTextField({
            id: 'otherLoans',
            title: 'Önnur lán',
            variant: 'number',
            backgroundColor: 'blue',
          }),
        ],
      }),
    ],
  })
}

export const buildOverviewSection = () => {
  return buildSection({
    id: 'overview',
    title: 'Yfirlit',
    children: [
      buildMultiField({
        id: 'overviewFields',
        title: 'Yfirlit skattframtals',
        description:
          'Vinsamlegast farðu yfir upplýsingarnar áður en þú staðfestir skattframtalið.',
        children: [
          buildDescriptionField({
            id: 'personalOverview',
            title: 'Persónuupplýsingar',
            titleVariant: 'h3',
          }),
          buildDividerField({}),
          buildDescriptionField({
            id: 'incomeOverview',
            title: 'Tekjur',
            titleVariant: 'h3',
          }),
          buildDividerField({}),
          buildDescriptionField({
            id: 'deductionsOverview',
            title: 'Frádráttarliðir',
            titleVariant: 'h3',
          }),
          buildDividerField({}),
          buildDescriptionField({
            id: 'assetsOverview',
            title: 'Eignir',
            titleVariant: 'h3',
          }),
          buildDividerField({}),
          buildDescriptionField({
            id: 'debtsOverview',
            title: 'Skuldir',
            titleVariant: 'h3',
          }),
          buildDividerField({}),
          buildSubmitField({
            id: 'submit',
            placement: 'footer',
            title: 'Senda skattframtal',
            actions: [
              {
                event: DefaultEvents.SUBMIT,
                name: 'Senda skattframtal',
                type: 'primary',
              },
            ],
          }),
        ],
      }),
    ],
  })
}

export const SkattframtalForm: Form = buildForm({
  id: 'skattframtalForm',
  title: 'Skattframtal',
  mode: FormModes.DRAFT,
  children: [
    buildPersonalInfoSection(),
    buildIncomeSection(),
    buildDeductionsSection(),
    buildAssetsSection(),
    buildDebtsSection(),
    buildOverviewSection(),
  ],
})
