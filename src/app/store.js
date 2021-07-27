import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import CounterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    counter: CounterReducer
  }
})