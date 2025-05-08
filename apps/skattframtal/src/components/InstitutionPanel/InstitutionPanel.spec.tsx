import React, { ReactNode } from 'react'
import { render, act, RenderResult } from '@testing-library/react'
import { ColorSchemeContext } from '@island.is/island-ui/core'

import { InstitutionPanel } from './InstitutionPanel'

// Create a test wrapper with necessary context providers
const TestWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ColorSchemeContext.Provider value={{ colorScheme: 'white' }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

describe('Index', () => {
  it('should render the institution panel component', async () => {
    let renderResult: RenderResult
    await act(async () => {
      renderResult = render(
        <InstitutionPanel
          institutionTitle="Test"
          institution="Test"
          locale="is"
        />,
        { wrapper: TestWrapper },
      )
    })
    expect(renderResult!.baseElement).toBeTruthy()
  })

  it('should render the institution panel component with img', async () => {
    let renderResult: RenderResult
    await act(async () => {
      renderResult = render(
        <InstitutionPanel
          institutionTitle="Test"
          institution="Test"
          locale="is"
          img="https://www.google.com"
        />,
        { wrapper: TestWrapper },
      )
    })
  })
})
