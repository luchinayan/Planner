"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { todoT } from "../redux/features/todo/todoSlice";
import TodoList from "../_components/todoList";

export default function UpComping() {
  const todos = useSelector<RootState>(
    (state) => state.todos.todos
  ) as Array<todoT>;

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center border-b-4 rounded-xl pb-8 mb-20 border-b-green-400">
        <div className="text-5xl m-4">Today</div>
        <TodoList todos={todos} type={"today"} />
      </div>
      <div className="flex flex-col justify-center items-center border-t-4 rounded-xl pt-8  border-t-blue-400">
        <div className="text-5xl m-4">Tommorow</div>
        <TodoList todos={todos} type={"upcoming"} />
      </div>
    </div>
  );
}
