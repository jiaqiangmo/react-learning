import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";


import axios from "axios";

const usersAdapter = createEntityAdapter({
    selectId: (state) => state.user_name
});
const initialState = usersAdapter.getInitialState({
    loading: 'idle'
});

export const fetchUsers = createAsyncThunk("users/fetchUser", async (a) => {
    console.log(a);
  const response = await axios.get("/users");
  return response.data
});

export const fetchUsersByUserName = createAsyncThunk("users/fetchUsersByUserName", async (params) => {
    console.log('createAsyncThunk_fetchUsersByUserName:', params);
    const response = await axios.get(`/users/${params.userName}`);
    return response.data
  });


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers (state, action){
        state.loading = 'pending'
    },
    extraReducers: {
      [fetchUsers.fulfilled]: usersAdapter.setAll,
      [fetchUsersByUserName.fulfilled]: (state, action) => {
          console.log(action);
      },
    },
  })
  
  export default usersSlice.reducer
  
export const {
    selectAll: selectAllUsers,
    selectById: selectUserByUserId
} = usersAdapter.getSelectors((state) => {
    return state.users
} )