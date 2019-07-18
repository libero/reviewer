import * as React from 'react'
import App from './App'
import { render } from '@testing-library/react'

describe('App', () => {
    it('should render correctly', () => {
        expect(() => render(<App/>)).not.toThrow()
    })
})