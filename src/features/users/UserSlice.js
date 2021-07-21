import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk("users/fetchUser", async () => {
  const response = await axios.get("/users");
  return response.data
});


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
      [fetchUsers.fulfilled]: usersAdapter.setAll,
    },
  })
  
  export default usersSlice.reducer
  
export const {
    selectAll: selectAllUsers
} = usersAdapter.getSelectors((state) => state.users )