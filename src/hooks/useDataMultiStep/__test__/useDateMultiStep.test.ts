import { waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
// Hooks
import useDataMultiStep from '../'

type MockDefaultState = {
  step1: {
    name: string;
    surname: string;
  },
  step2: {
    email: string;
    password: string;
  }
}

const mockDefaultState: MockDefaultState = {
	step1: {
		name: 'John',
		surname: 'Doe'
	},
	step2: {
		email: 'example@gmail.com',
		password: 'abcd1234'
	}
}

const mockOnlyUpdatedPart: Pick<MockDefaultState, 'step2'> = {
	step2: {
		email: 'example@my-domain.com',
		password: '00000000'
	}
}

describe('useDataMultiStep hook: ', () => {
	describe('dataMultiStepState state: ', () => {
		it('should be equal to the defaultState', () => {
			const { result } = renderHook(() => useDataMultiStep(mockDefaultState))
      
			expect(result.current.dataMultiStepState).toEqual(mockDefaultState)
		})
	})
	
	describe('updateDataMultiStep function: ', () => {
		it('should update correctly the internal state', async () => {
			const { result } = renderHook(() => useDataMultiStep(mockDefaultState))

			act(() => result.current.updateDataMultiStep(mockOnlyUpdatedPart))
      
			await waitFor(() => expect(result.current.dataMultiStepState).toEqual({...mockDefaultState, ...mockOnlyUpdatedPart}))
		})
	})
	
	describe('removeDataSpecificStep function: ', () => {
		it('should remove the correct data from the internal state', async () => {
			const { result } = renderHook(() => useDataMultiStep(mockDefaultState))

			act(() => result.current.updateDataMultiStep(mockOnlyUpdatedPart))
      
			await waitFor(() => expect(result.current.dataMultiStepState).toEqual({...mockDefaultState, ...mockOnlyUpdatedPart}))

			act(() => result.current.removeDataSpecificStep(1))
      
			await waitFor(() => expect(result.current.dataMultiStepState).toEqual(mockDefaultState))
		})
	})
})