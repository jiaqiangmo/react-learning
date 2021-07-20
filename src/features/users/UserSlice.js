import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit'
import axios from 'axios'
const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()
export const fetchUsers = createAsyncThunk('users/fetchUsers',async () => {
    const response = await axios('http://192.168.50.118:8080/users')
    return response.data
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: usersAdapter.setAll
    }
})
export default userSlice.reducer

export const {
    selectAll: selectAllUsers
} = usersAdapter.getSelectors((state) => state.users)