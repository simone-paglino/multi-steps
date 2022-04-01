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

export const mockDefaultState: MockDefaultState = {
	step1: {
		name: 'John',
		surname: 'Doe'
	},
	step2: {
		email: 'example@gmail.com',
		password: 'abcd1234'
	}
}

export const mockOnlyUpdatedPart: Pick<MockDefaultState, 'step2'> = {
	step2: {
		email: 'example@my-domain.com',
		password: '00000000'
	}
}