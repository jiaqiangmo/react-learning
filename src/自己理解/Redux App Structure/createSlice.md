import React, { useState } from "react";

import { createSlice } from '@reduxjs/toolkit'

 const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

 const { increment, decrement, incrementByAmount } = counterSlice.actions

 const reducerObj = counterSlice.reducer
 console.log(counterSlice.actions.increment())
 // {type: "counter/increment"}
 function App() {
   return(
     <>
      <h1>ksjdfkjsdjf</h1>
     </>
   )
 }

 export default App