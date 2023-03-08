import { configureStore } from '@reduxjs/toolkit'
import { contSlice } from '../modules/cont/cont-slice'

export const store = configureStore({
  reducer: {
    cont: contSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch