import { waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
// Hooks
import useDataMultiStep from '../'
// Mocks
import { mockDefaultState, mockOnlyUpdatedPart } from '../../../__mocks__/useDataMultiStepMock'

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