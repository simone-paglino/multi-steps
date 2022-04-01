import { useState, useEffect } from 'react'
// Types
import { useDataMultiStepReturnValue } from '../../types/hooks'

const useDataMultiStep = <T extends Record<string, unknown>,>(
	defaultState: T
): useDataMultiStepReturnValue<T> => {
	const [dataMultiStepState, setDataMultiStepState] = useState<T>(defaultState)

	useEffect(() => {
		setDataMultiStepState(defaultState)
	}, [defaultState])

	const updateDataMultiStep = (updatedValue: Record<string, unknown>): void => {
		setDataMultiStepState(previousState => ({
			...previousState,
			...updatedValue
		}))
	}
  
	const removeDataSpecificStep = (step: number): void => {
		const keyToReset = Object.keys(dataMultiStepState)[step]

		updateDataMultiStep({[keyToReset]: defaultState[keyToReset]})
	}
  
	return {
		dataMultiStepState,
		updateDataMultiStep,
		removeDataSpecificStep
	}
}

export default useDataMultiStep