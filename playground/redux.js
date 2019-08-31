// common js
const { createStore, combineReducers } = require('redux')

//reducers - regular js functions, through this, based on meeting condition, we return the new state value, reducers are pure fucntions
const countReducer = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT' :
            return state + 1
        case 'RESET' :
            return 0
        default:
            return state
    }
}

const customersReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_CUSTOMER' :
            return [...state, action.payload]
        default:
            return [...state]
    }
}

const rootReducer = {
    count: countReducer,
    customers: customersReducer
}

const store = createStore(combineReducers(rootReducer))

console.log(store.getState())
store.subscribe(() => {
    console.log(store.getState())
})


//action creators/ generators
const increment = () => {
    return { type: 'INCREMENT' } // action -> { type: ''}
}

//action creators/ generators
const reset = () => {
    return { type: 'RESET' } // action
}

//action creators/ generators
const addCustomer = (customer) => {
    return { type: 'ADD_CUSTOMER', payload: customer}  //action
}

store.dispatch(increment())

store.dispatch(increment())

store.dispatch(increment())

store.dispatch(reset())

store.dispatch(addCustomer({ id: Number(new Date()), name: 'customer 1'}))


