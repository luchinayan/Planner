import { createSlice } from "@reduxjs/toolkit";

export type todoT = {
  id: number;
  title: string;
  info?: string;
  start?: any;
  end?: any;
  badgeColor?: string;
  badgeId?: number | null;
  status: boolean;
};
export interface IinitState {
  todos: todoT[];
}

const initialState: IinitState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteToDo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    changeStatus: (state, action) => {
      let todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = !todo?.status;
      }
    },
    changeBadgeColor: (state, action) => {
      let todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.badgeColor = action.payload.badgeColor;
        todo.badgeId = action.payload?.badgeId;
      }
    },
    setTitle: (state, action) => {
      let todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    setInfo: (state, action) => {
      let todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.info = action.payload.info;
      }
    },
    setStartDate: (state, action) => {
      let todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.start = action.payload.start;
      }
    },
    setEndDate: (state, action) => {
      let todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.end = action.payload.end;
      }
    },
  },
});

export const {
  addToDo,
  changeStatus,
  deleteToDo,
  setInfo,
  changeBadgeColor,
  setTitle,
  setStartDate,
  setEndDate,
} = todoSlice.actions;

export default todoSlice.reducer;
