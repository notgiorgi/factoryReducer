function createFactoryReducer({REGISTER, UNREGISTER}, UID, instance) {
	return function (state = {}, action) {
		const ID = action.payload && action.payload[UID]
		switch (action.type) {
			case UNREGISTER:
				return {
					...state,
					[ID]: undefined
				}

			default: {
				if (ID) return {
					...state,
					[ID]: instance(state[ID], action)
				}

				return state
			}
				
		}
	}
}

module.exports = createFactoryReducer
