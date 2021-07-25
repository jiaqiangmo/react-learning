import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUser", async () => {
  const response = await axios.get("/users");
  return response.data;
});

export const fetchUsersByUserName = createAsyncThunk(
  "users/fetchUsersByUserName",
  async (params) => {
    const response = await axios.get(`/users/${params.userName}`);
    return response.data;
  }
);

export const putUsersByUserName = createAsyncThunk(
  "users/putUsersByUserName",
  async (params) => {
    console.log('here:', params);
    const response = await axios.put(`/users/${params.userId}`, {
      ...params,
    });
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
    builder.addCase(fetchUsersByUserName.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(putUsersByUserName.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
console.log(usersSlice);
export default usersSlice.reducer;
