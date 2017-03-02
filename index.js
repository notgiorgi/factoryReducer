
const createAction = (type, payload = {}) => ({ type, payload })

const actions = {
	REGISTER: 'REG',
	UNREGISTER: 'UNREG',
	FOO: 'FOO',
	BAR: 'BAR',
}

const instanceInitial = {
	foo: 0,
	bar: [1,2,3]
}

function instance(state = instanceInitial, { type, payload }) {
	switch (type) {
		case actions.FOO:
			return {
				...state,
				foo: state.foo + 1,
			}
		case actions.BAR:
			
		default:
			return state
	}
}

function factory(state = {}, action) {
	// We need this ID in every case
	const ID = action.payload && action.payload.ID

	switch (action.type) {
		// Registers an instance on unique ID
		case actions.REGISTER: {
			return {
				...state,
				[ID]: instance(state[ID], action)
			}
		}
			
		// Removes instance on unique ID
		case actions.UNREGISTER: {
			return {
				...state,
				[ID]: undefined
			}
		}
			
		// All other actions are just ported
		case actions.FOO:
		case actions.BAR:
			return {
				...state,
				// The partial state and the action are passed down
				[ID]: instance(state[ID], action)
			}
			
		// default case
		default:
			return state
	}
}



const factoryEquivalent = createFactoryReducer({
	REGISTER: actions.REGISTER,
	UNREGISTER: actions.UNREGISTER,
}, 'ID', instance)


module.exports.instance = instance
module.exports.factory = factory
module.exports.factoryEquivalent = factoryEquivalent
