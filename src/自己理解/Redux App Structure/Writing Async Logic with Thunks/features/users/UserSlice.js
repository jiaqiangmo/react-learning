import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

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
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
  //     state.users = payload;
  //   });
  //   builder.addCase(fetchUsersByUserName.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //   });
  //   builder.addCase(putUsersByUserName.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //   });
  // },
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.setAll
  }
});
export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(state => state.users)
