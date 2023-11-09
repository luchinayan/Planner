import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type badgeT = {
  id: number;
  title: string;
  color: string;
};

export interface IinitState {
  badges: badgeT[];
}

const initialState: IinitState = {
  badges: [],
};

export const badgeSlice = createSlice({
  name: "badges",
  initialState,
  reducers: {
    addBadge: (state, action) => {
      state.badges.push(action.payload);
    },
    setBadgeColor: (state, action) => {
      let badge = state.badges.find((badge) => badge.id === action.payload);
      if (badge) {
        badge.color = Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
          .toUpperCase();
      }
    },
    setBadgeTitle: (state, action) => {
      let badge = state.badges.find((badge) => badge.id === action.payload.id);
      if (badge) {
        badge.title = action.payload.title;
      }
    },
    deleteBadge: (state, action) => {
      state.badges = state.badges.filter(
        (badge) => badge.id !== action.payload
      );
    },
  },
});

export const { addBadge, setBadgeColor, setBadgeTitle, deleteBadge } =
  badgeSlice.actions;

export default badgeSlice.reducer;
