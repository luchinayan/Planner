"use client";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { todoT } from "../redux/features/todo/todoSlice";
import TodoItem from "./todoItem";

export default function TodoList({
  todos,
  type,
}: {
  todos: todoT[];
  type: {};
}) {
  return (
    <div>
      {type === "today"
        ? todos.map((todo: todoT) => {
            if (
              moment(new Date()).isSameOrAfter(todo.start) &&
              moment(new Date()).isSameOrBefore(todo.end)
            ) {
              return <TodoItem key={todo.id} todo={todo} />;
            }
          })
        : todos.map((todo: todoT) => {
            if (moment(moment().add(1, "d")).isSame(todo.start, "day")) {
              return <TodoItem key={todo.id} todo={todo} />;
            }
          })}
    </div>
  );
}
