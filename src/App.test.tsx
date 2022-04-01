import React from 'react'
import { render } from '@testing-library/react'
// Components
import App from './App'

describe('App component', () => {
	it('should render', () => {
		render(<App />)

		const div = document.querySelector('div')

		expect(div).toBeInTheDocument()
	})
})