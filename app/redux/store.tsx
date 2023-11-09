"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import badgeSlice from "./features/badges/badgeSlice";
import todoSlice from "./features/todo/todoSlice";

const rootReducer = combineReducers({
  todos: todoSlice,
  badges: badgeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
