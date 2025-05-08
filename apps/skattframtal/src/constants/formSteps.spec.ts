import { goToStep, stepKeys } from './formSteps'
import { NextRouter } from 'next/router'

describe('goToStep', () => {
  // mock router
  const router = {
    push: jest.fn(),
    route: '/skattframtol/application/123',
    pathname: '/skattframtol/application/123',
    query: {},
    asPath: '/skattframtol/application/123',
    isReady: true,
    isBack: false,
  }

  beforeEach(() => {
    router.push.mockClear()
  })

  it('should go to the step', () => {
    goToStep(router as unknown as NextRouter, '123', 0, stepKeys)
    expect(router.push).toHaveBeenCalledWith(
      '/skattframtol/application/123/introduction',
    )
  })

  it('should not go to the step if the step is out of bounds', () => {
    goToStep(router as unknown as NextRouter, '123', 10, stepKeys)
    expect(router.push).not.toHaveBeenCalled()
  })

  it('should not go to the step if the step is negative', () => {
    goToStep(router as unknown as NextRouter, '123', -1, stepKeys)
    expect(router.push).not.toHaveBeenCalled()
  })

  it('should go to the personalInfo step', () => {
    goToStep(router as unknown as NextRouter, '123', 1, stepKeys)
    expect(router.push).toHaveBeenCalledWith(
      '/skattframtol/application/123/my-information',
    )
  })

  it('should not go to the step if the step key is unknown', () => {
    goToStep(router as unknown as NextRouter, '123', 2, stepKeys)
    expect(router.push).toHaveBeenCalledWith(
      '/skattframtol/application/123/income',
    )
  })
})
