const {expect} = require('chai')

const {factoryEquivalent: factory, instance} = require('./index')

// TEST1
expect(
	factory(
		undefined,
		createAction(actions.REGISTER, { ID: 23 })
	)
).to.deep.equal({
	23: instance(undefined, createAction(actions.REGISTER))
}, 'Initial states should equal')

// TEST2
const initial2 = {
	25: instance(undefined, createAction(actions.REGISTER))
}
const action2 = createAction(actions.REGISTER, { ID: 23 })
expect(
	factory(
		initial2,
		action2
	)
).to.deep.equal({
	...initial2,
	23: instance(undefined, action2)
}, 'Should persist prev state')

// TEST3
const action3 = createAction(actions.FOO, { ID: 23 })
expect(
	factory(
		undefined,
		action3
	)
).to.deep.equal({
	23: instance(undefined, action3)
}, 'Should port actions')


// TEST4
const initial4 = {
	25: instance(undefined, {}),
	23: instance(undefined, {})
}
expect(
	factory(
		initial4,
		createAction(actions.UNREGISTER, { ID: 23 })
	)
).to.deep.equal({
	25: instance(undefined, {}),
	23: undefined
})


console.log(
	'all tests pass'
)
