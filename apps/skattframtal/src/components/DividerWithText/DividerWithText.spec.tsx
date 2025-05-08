import React, { ReactNode } from 'react'
import { render, act, RenderResult } from '@testing-library/react'
import { ColorSchemeContext } from '@island.is/island-ui/core'

import DividerWithText from './DividerWithText'

// Create a test wrapper with necessary context providers
const TestWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ColorSchemeContext.Provider value={{ colorScheme: 'white' }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

describe('Index', () => {
  it('should render the divider with text component', async () => {
    let renderResult: RenderResult
    await act(async () => {
      renderResult = render(<DividerWithText>Test</DividerWithText>, {
        wrapper: TestWrapper,
      })
    })
    expect(renderResult!.baseElement).toBeTruthy()
  })
})
