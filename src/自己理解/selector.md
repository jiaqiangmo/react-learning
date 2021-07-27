import React, { useState } from "react";

  import { configureStore } from '@reduxjs/toolkit'
  function counterReducer(state = initialState, action) {
    // Check to see if the reducer cares about this action
    if (action.type === 'counter/increment') {
      // If so, make a copy of `state`
      return {
        ...state,
        // and update the copy with the new value
        value: state.value + 1
      }
    }
    // otherwise return the existing state unchanged
    return state
  }
  const actions = [
    { type: 'counter/increment' },
    { type: 'counter/increment' },
    { type: 'counter/increment' }
  ]
  
  const initialState = { value: 0 }
  
  const store = configureStore({ reducer: counterReducer })
  
  store.dispatch({ type: 'counter/increment' })
  
  console.log(store.getState())
  // {value: 1}
//  ++++++++++++++++++++++++++++++++++++++++++++
  const increment = () => {
    return {
      type: 'counter/increment'
    }
  }
  
  store.dispatch(increment())
  
  console.log(store.getState())
  // {value: 2}
//  ++++++++++++++++++++++++++++++++++++++++++++
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2
function Counter(){
  return (
    <div>
      <p>{currentValue}</p>
    </div>
  );
}

function App() {
  return <Counter></Counter>;
}

export default App;