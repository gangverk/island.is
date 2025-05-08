import React, { ReactNode } from 'react'
import { render, act, RenderResult } from '@testing-library/react'
import { ColorSchemeContext } from '@island.is/island-ui/core'

import { Footer } from './Footer'

// Create a test wrapper with necessary context providers
const TestWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ColorSchemeContext.Provider value={{ colorScheme: 'white' }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

describe('Index', () => {
  it('should render the footer component', async () => {
    let renderResult: RenderResult
    await act(async () => {
      renderResult = render(<Footer />, { wrapper: TestWrapper })
    })
    expect(renderResult!.baseElement).toBeTruthy()
  })
})
