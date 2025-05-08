import React, { ReactNode } from 'react'
import { render, act, RenderResult } from '@testing-library/react'
import { ColorSchemeContext } from '@island.is/island-ui/core'

import { Header } from './Header'

// Create a test wrapper with necessary context providers
const TestWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ColorSchemeContext.Provider value={{ colorScheme: 'white' }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

describe('Index', () => {
  it('should render the header component', async () => {
    let renderResult: RenderResult
    await act(async () => {
      renderResult = render(<Header />, { wrapper: TestWrapper })
    })
    expect(renderResult!.baseElement).toBeTruthy()
  })

  it('should render when authenticated', async () => {
    let renderResult: RenderResult
    await act(async () => {
      renderResult = render(<Header authenticated />, { wrapper: TestWrapper })
    })
    expect(renderResult!.baseElement).toBeTruthy()
  })
})
