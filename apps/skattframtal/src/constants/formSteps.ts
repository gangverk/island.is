import type { NextRouter } from 'next/router'

export const stepKeys = [
  'introduction',
  'personalInfo',
  'income',
  'assetsAndLiabilities',
  'liabilities',
  'review',
  'confirmAndSubmit',
] as const

export const stepLabels: Record<typeof stepKeys[number], string> = {
  introduction: 'Inngangur',
  personalInfo: 'Mínar upplýsingar',
  income: 'Tekjur',
  assetsAndLiabilities: 'Eignir og skuldir',
  liabilities: 'Skuldir',
  review: 'Yfirfara',
  confirmAndSubmit: 'Staðfesta og senda',
}

export const goToStep = (
  router: NextRouter,
  taxReturnId: string,
  stepIdx: number,
  stepKeys: readonly string[],
) => {
  if (stepIdx >= 0 && stepIdx < stepKeys.length) {
    const stepKey = stepKeys[stepIdx]
    let path = `/skattframtol/application/${taxReturnId}/`
    if (stepKey === 'introduction') {
      path += 'introduction'
    } else if (stepKey === 'personalInfo') {
      path += 'my-information'
    } else {
      path += stepKey.replace(/([A-Z])/g, '-$1').toLowerCase()
    }
    router.push(path)
  }
}
