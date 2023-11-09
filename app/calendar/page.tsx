"use client";
import React, { useMemo, useState, useRef } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addToDo,
  deleteToDo,
  setEndDate,
  todoT,
} from "../redux/features/todo/todoSlice";
import { badgeT } from "../redux/features/badges/badgeSlice";
import DatePicker from "react-datepicker";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [badge, setBadge] = useState<badgeT>();
  const [inputTitle, setInputTitle] = useState("");
  const [inputInfo, setInputInfo] = useState("");

  const dispatch = useDispatch();

  const todos = useSelector<RootState>(
    (state) => state.todos.todos
  ) as Array<todoT>;
  const badges = useSelector<RootState>(
    (state) => state.badges.badges
  ) as Array<badgeT>;

  const todo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title: inputTitle.trim(),
    info: inputInfo.trim(),
    start: startDate,
    end: endDate,
    status: false,
    badgeColor: badge?.color,
    badgeId: badge?.id,
  };

  const findBadge = (e: any) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const optionId = el.getAttribute("id");
    const badge = badges.find((b) => b.id === optionId);
    setBadge(badge);
  };

  let event = todos.map((todo) => {
    if (todo.end && todo.start) {
      return {
        title: todo.title,
        start: todo.start,
        end: todo.end,
        data: todo,
      };
    }
  });

  function Event({ event }) {
    return (
      <div
        style={{
          minHeight: "3rem",
        }}>
        <div
          style={{
            backgroundColor: `#${event.data.badgeId && event.data.badgeColor}`,
            borderRadius: "1rem",
            padding: "0.5rem",
            minHeight: "3rem",
          }}>
          <DeleteOutline
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteToDo(event.data.id));
            }}
            className="hover:text-red-500"></DeleteOutline>
          {event.title}
        </div>
      </div>
    );
  }

  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        event: Event,
      },
      defaultDate: new Date(),
    }),
    []
  );

  return (
    <div className="w-full">
      {showModal && (
        <div
          id="modal"
          className="bg-gray-200 mb-4 rounded-xl flex items-center flex-col">
          <input
            type="text"
            maxLength={100}
            onChange={(el) => {
              setInputTitle(el.target.value);
              if (el.target.value.trim().length < 3) {
                el.target.classList.add("border-red-500");
              } else {
                el.target.classList.remove("border-red-500");
              }
            }}
            className="w-1/2 my-4 border  border-gray-300 p-2 rounded-xl focus:outline-none"
            placeholder="Title..."></input>
          <input
            type="text"
            maxLength={500}
            onChange={(el) => {
              setInputInfo(el.target.value);
              if (el.target.value.trim().length < 3) {
                el.target.classList.add("border-red-500");
              } else {
                el.target.classList.remove("border-red-500");
              }
            }}
            className="w-1/2 mb-4 p-2 border  border-gray-300 rounded-xl focus:outline-none"
            placeholder="Info..."></input>
          <div className="flex justify-start items-start w-1/2">
            <div>Badges:</div>
            <select
              onChange={(e) => {
                findBadge(e);
              }}
              name="badges"
              className="mb-4 ml-4 rounded-xl px-2">
              <option selected>none</option>
              {badges.map((badge) => {
                return (
                  <option id={badge.id} key={badge.id}>
                    {badge.title}
                  </option>
                );
              })}
            </select>
            <div
              style={{ position: "relative", zIndex: "100" }}
              className="flex  ml-20">
              <div className="mr-2">Start: </div>
              <DatePicker
                className="border border-gray-200 rounded-xl w-2/3 px-2"
                selected={startDate}
                showTimeSelect
                onChange={(date: Date) => {
                  setStartDate(date);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              <div className="mr-2">End: </div>
              <DatePicker
                className="border z-50 border-gray-200 rounded-xl w-2/3 px-2"
                selected={endDate}
                showTimeSelect
                onChange={(date: Date) => {
                  setEndDate(date);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          <div className="flex w-full justify-evenly m-4">
            <button
              onClick={() => {
                setInputInfo("");
                setInputTitle("");
                setStartDate(new Date());
                setEndDate(new Date());
                setShowModal(false);
              }}
              className="bg-red-600 p-2 rounded-xl text-white">
              Close
            </button>
            <button
              onClick={() => {
                if (
                  inputTitle.length > 2 &&
                  endDate &&
                  startDate &&
                  endDate >= startDate
                ) {
                  dispatch(addToDo(todo));
                  setInputInfo("");
                  setInputTitle("");
                  setStartDate(new Date());
                  setEndDate(new Date());
                  setShowModal(false);
                }
              }}
              className="bg-green-600 p-2 rounded-xl text-white">
              Save
            </button>
          </div>
        </div>
      )}
      <Calendar
        onSelectSlot={({ start }) => {
          setShowModal(true);
          setStartDate(start);
        }}
        localizer={localizer}
        selectable={true}
        events={event}
        step={30}
        defaultView="week"
        views={["month", "week", "day"]}
        defaultDate={new Date()}
        scrollToTime={new Date(1970, 1, 1, 6)}
        onSelectEvent={(event) =>
          alert(`Title: ${event.title} 
Info: ${event.data.info}`)
        }
        components={components}
        min={
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            6
          )
        }
        max={
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            23
          )
        }
      />
    </div>
  );
}
