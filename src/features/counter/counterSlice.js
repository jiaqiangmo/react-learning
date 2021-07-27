import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
export const coutnerSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 3000);
};

// the outside "thunk creator" function
export const fetchUserById = userId => {
  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      const qty = await (await axios.get('https://www.fastmock.site/mock/56d746d6154080153a4e6af75053cf46/test/takein/details',{userId})).data.data.qty.qty
      // dispatch an action when we get the response back
      dispatch(incrementByAmount(qty))
    } catch (err) {
      // If something went wrong, handle it here
    }
  }
}

//导出每个actions给其他组件dispatch调用
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const { incrementByAmount, increment, decrement } = coutnerSlice.actions;
//导出reducer给app/store.js configureStore用
export default coutnerSlice.reducer;
