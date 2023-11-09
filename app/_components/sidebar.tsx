"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChecklistIcon from "@mui/icons-material/Checklist";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  badgeT,
  deleteBadge,
  addBadge,
  setBadgeColor,
  setBadgeTitle,
} from "../redux/features/badges/badgeSlice";
import { changeBadgeColor, todoT } from "../redux/features/todo/todoSlice";
import { RootState } from "../redux/store";

export default function SideBar() {
  const badges = useSelector<RootState>(
    (state) => state.badges.badges
  ) as Array<badgeT>;
  const todos = useSelector<RootState>(
    (state) => state.todos.todos
  ) as Array<todoT>;
  const dispatch = useDispatch();
  const [prevBadges, setBadges] = useState<badgeT[]>([]);
  useEffect(() => {
    setBadges(badges);
    const changedBadge = badges.filter((badge: badgeT) =>
      prevBadges.some(
        (prevBadge: badgeT) =>
          badge.color !== prevBadge.color && badge.id === prevBadge.id
      )
    );

    const todoToChange = todos.filter((todo: todoT) =>
      changedBadge.some((badge: badgeT) => badge.id === todo.badgeId)
    );

    if (changedBadge[0] && todoToChange.length !== 0) {
      for (let todo of todoToChange) {
        dispatch(
          changeBadgeColor({
            id: todo.id,
            badgeColor: changedBadge[0].color,
            badgeId: changedBadge[0].id,
          })
        );
      }
    }
  }, [badges]);

  const addNewBadge = () => {
    let prevId = 0;
    badges.length === 0
      ? (prevId = 0)
      : (prevId = badges[badges.length - 1].id);
    let randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase();

    dispatch(
      addBadge({ id: prevId + 1, title: "Default", color: randomColor })
    );
  };
  const delBadge = (id: number) => {
    let todoColorToRemove = todos.filter((todo) => todo.badgeId === id);

    for (let todo of todoColorToRemove) {
      dispatch(
        changeBadgeColor({ id: todo.id, badgeColor: "fff", badgeId: null })
      );
    }
    dispatch(deleteBadge(id));
  };

  return (
    <div className="flex flex-col px-8 pt-4 mr-4 bg-zinc-100 h-full max-w-1/5 w-1/5 rounded-xl">
      <div className="text-2xl pb-4 border-b-2 border-gray-300 ">
        <Link href={"/"}>To Do</Link>
      </div>
      <div className="py-4">
        <div className="font-semibold pb-1">Tasks</div>
        <div className="text-lg flex flex-col justify-center border-t-2 border-l-2 hover:[&>div]:bg-gray-200 hover:[&>div]:rounded-xl  rounded-xl">
          <div className="p-2">
            <KeyboardDoubleArrowRightIcon />
            <Link className="pl-2" href={"/upcoming"}>
              Upcoming
            </Link>
          </div>
          <div className="p-2">
            <ChecklistIcon />
            <Link className="pl-2" href={"/"}>
              Today
            </Link>
          </div>
          <div className="p-2">
            <CalendarMonthIcon />
            <Link className="pl-2" href={"/calendar"}>
              Calendar
            </Link>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="font-semibold pb-1">Badges</div>
        <div className="text-lg mb-4 flex flex-col justify-center border-t-2 border-l-2 hover:[&>div]:bg-gray-200 hover:[&>div]:rounded-xl  rounded-xl">
          {badges.length !== 0 &&
            badges.map((badge: badgeT) => {
              return (
                <div className="p-2 flex items-center" key={badge.id}>
                  <div
                    onClick={() => {
                      console.log("12");

                      dispatch(setBadgeColor(badge.id));
                    }}
                    style={{
                      backgroundColor: `#${badge.color}`,
                    }}
                    className={`cursor-pointer rounded-full h-4 w-5`}></div>
                  <input
                    type="text"
                    className="pl-2 mx-2 rounded-xl w-full bg-inherit focus:outline-none truncate"
                    defaultValue={badge.title}
                    required={true}
                    placeholder="Badge name..."
                    maxLength={15}
                    onChange={(el) => {
                      dispatch(
                        setBadgeTitle({
                          id: badge.id,
                          title: el.target.value,
                        })
                      );
                      if (el.target.value.trim().length < 3) {
                        el.target.classList.add("border-red-500", "border");
                      } else {
                        el.target.classList.remove("border-red-500", "border");
                      }
                    }}></input>
                  <div
                    onClick={() => delBadge(badge.id)}
                    className="text-2xl leading-none cursor-pointer hover:text-red-500 hover:font-bold">
                    &times;
                  </div>
                </div>
              );
            })}
        </div>
        <button
          onClick={() => addNewBadge()}
          className="p-2 rounded-xl w-full border hover:border hover:border-gray-400 ">
          + Add new badge
        </button>
      </div>
    </div>
  );
}
