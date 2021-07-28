import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, aaa) => {
    // aaa : {
    //     dispatch : ,
    //     extra :,
    //     requestId :,
    //     signal: ,
    //     rejectWithValue:,
    // }
    console.log("aaa:", aaa);
    const allNotifications = selectAllNotifications(aaa.getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.notifications;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload);
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
    },
  },
});

export default notificationsSlice.reducer;

export const selectAllNotifications = (state) => state.notifications;
