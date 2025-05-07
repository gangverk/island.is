import type { NextRouter } from 'next/router'

export const stepKeys = [
  'introduction',
  'personalInfo',
  'income',
  'assetsAndLiabilities',
  'debtsAndInterest',
  'review',
  'confirmAndSubmit',
] as const

export const stepLabels: Record<typeof stepKeys[number], string> = {
  introduction: 'Inngangur',
  personalInfo: 'Mínar upplýsingar',
  income: 'Tekjur',
  assetsAndLiabilities: 'Eignir og skuldir',
  debtsAndInterest: 'Skuldir',
  review: 'Yfirfara',
  confirmAndSubmit: 'Staðfesta og senda',
}

export function goToStep(
  router: NextRouter,
  year: string,
  stepIdx: number,
  stepKeys: readonly string[],
) {
  if (stepIdx >= 0 && stepIdx < stepKeys.length) {
    const stepKey = stepKeys[stepIdx]
    let path = `/skattframtol/application/${year}/`
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
