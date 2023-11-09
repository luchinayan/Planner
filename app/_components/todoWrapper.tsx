"use client";
import { useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, todoT } from "../redux/features/todo/todoSlice";
import { RootState } from "../redux/store";
import TodoList from "./todoList";

export default function TodoWrapper() {
  let inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const todos = useSelector<RootState>(
    (state) => state.todos.todos
  ) as Array<todoT>;

  const addTodo = () => {
    let prevId = 0;
    if (todos.length > 0) {
      prevId = todos[todos.length - 1].id;
    }

    const date = new Date();
    date.setDate(date.getDate() + 1);

    if (inputRef.current && inputRef.current.value.trim().length > 2) {
      dispatch(
        addToDo({
          id: prevId + 1,
          title: inputRef.current.value.trim(),
          info: "",
          start: new Date(),
          end: date,
          status: false,
          badgeColor: "fff",
          badgeId: null,
        })
      );
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <div className="text-5xl flex justify-start items-center font-semibold px-12 py-2">
        Today
      </div>
      <div>
        <input
          ref={inputRef}
          maxLength={100}
          type="text"
          data-testid="todoInput"
          onChange={(el) => {
            if (el.target.value.trim().length < 3) {
              el.target.classList.add("border-red-500");
            } else {
              el.target.classList.remove("border-red-500");
            }
          }}
          placeholder="+ Add new task"
          className="w-11/12 rounded-xl text-xl border  border-gray-300 p-2 m-4 focus:outline-dashed"></input>
        <button
          data-testid="todoAdd"
          className="border border-gray-300 text-xl rounded-xl p-2 bg-gray-200 hover:bg-gray-300"
          onClick={() => addTodo()}>
          Add
        </button>
      </div>
      <TodoList todos={todos} type={"today"} />
    </div>
  );
}
