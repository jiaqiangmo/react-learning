import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../../api/client'
import {increment} from '../counter/counterSlice'
const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.posts;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postAdded: {
      reducer(state, action) {
        // state.push(action.payload);
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
//   The builder.addCase() function takes either a plain string action type to listen for, or a Redux Toolkit action creator:
  extraReducers: builder => {
      builder.addCase('counter/decrement', () => {console.log('extraReducer decrement  a plain string action type to listen here');})
      builder.addCase(increment, () => {console.log('extraReducer increment a Redux Toolkit action creator:');})
  }
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
