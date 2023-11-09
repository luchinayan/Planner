import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { badgeT } from "../redux/features/badges/badgeSlice";
import {
  changeBadgeColor,
  changeStatus,
  deleteToDo,
  setEndDate,
  setInfo,
  setStartDate,
  setTitle,
  todoT,
} from "../redux/features/todo/todoSlice";
import { RootState } from "../redux/store";

export default function TodoItem({ todo }: { todo: todoT }) {
  const [startDate, setStartDateState] = useState(new Date());
  const [endDate, setEndDateState] = useState(new Date());
  const dispatch = useDispatch();
  const todos = useSelector<RootState>(
    (state) => state.todos.todos
  ) as Array<todoT>;
  const badges = useSelector<RootState>(
    (state) => state.badges.badges
  ) as Array<badgeT>;
  const inputRef = useRef<HTMLInputElement>(null);

  const setBadge = (e, id: number) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const optionId = el.getAttribute("id");
    const badge = badges.find((badge) => badge.id === +optionId);

    if (badge) {
      dispatch(
        changeBadgeColor({ id: id, badgeColor: badge.color, badgeId: badge.id })
      );
    } else {
      dispatch(changeBadgeColor({ id: id, badgeColor: "fff", badgeId: null }));
    }
  };

  return (
    <div data-testid="Todo" className="m-4">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="flex items-center">
            <input
              onClick={(e) => {
                e.stopPropagation();
                dispatch(changeStatus(todo.id));
              }}
              type="checkbox"
              readOnly={true}
              checked={todo.status}
              className="h-4 flex items-end w-4 mr-4"
            />
            <Typography
              sx={{
                marginRight: "3rem",
                maxWidth: "80%",
                fontSize: "1.5rem",
                alignSelf: "start",
                textDecoration: `${todo.status && "line-through"} `,
              }}>
              <input
                type="text"
                className={`focus:outline-none ${
                  todo.status && "line-through"
                } border-[3px] rounded-xl truncate w-full px-2`}
                onChange={(el) => {
                  dispatch(setTitle({ id: todo.id, title: el.target.value }));
                  if (el.target.value.length < 3) {
                    el.target.classList.add("border-red-500", "border");
                  } else {
                    el.target.classList.remove("border-red-500", "border");
                  }
                }}
                value={todo.title}
              />
            </Typography>
            <Typography
              sx={{
                backgroundColor: "#" + todo.badgeColor,
                height: "1rem",
                width: "1rem",
                borderRadius: "50%",
                display: todo.badgeId !== null ? "block" : "none",
              }}
            />
          </span>
        </AccordionSummary>
        <AccordionDetails className="flex w-full justify-between">
          <Typography>
            <textarea
              className="focus:outline-none border border-gray-200 px-4 py-1 rounded-xl w-96 resize-none"
              placeholder="Add description..."
              defaultValue={todo.info}
              onChange={(e) => {
                dispatch(setInfo({ id: todo.id, info: e.target.value }));
              }}
            />
          </Typography>
          <Typography className="flex">
            <span className="mx-4 border-r-2 h-12 pr-2">
              Start <br /> End
            </span>
            <span className="w-full flex flex-col">
              <DatePicker
                className="border border-gray-200 rounded-xl w-2/3 px-2"
                selected={todo.start}
                showTimeSelect
                onChange={(date: Date) => {
                  dispatch(setStartDate({ id: todo.id, start: date }));
                  setStartDateState(date);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()}
                minDate={new Date()}
              />
              <DatePicker
                className="border border-gray-200 rounded-xl w-2/3 px-2"
                selected={todo.end}
                showTimeSelect
                onChange={(date: Date) => {
                  dispatch(setEndDate({ id: todo.id, end: date }));
                  setEndDateState(date);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </span>
          </Typography>
          <Typography className="flex">
            <span className="mr-4 border-r-2 h-6 pr-2">Change Badge</span>
            <span>
              <select
                id="demo-simple-select"
                className="border w-32 truncate border-gray-200 rounded-xl px-2 focus:w-32"
                onChange={(e) => setBadge(e, todo.id)}
                name="badge">
                <option value={"None"} defaultValue={"None"}>
                  None
                </option>
                {badges.map((badge) => {
                  if (badge.title.length > 2) {
                    return (
                      <option
                        style={{
                          width: "inherit",
                        }}
                        selected={badge.id === todo.badgeId && true}
                        data-limit="10"
                        key={badge.id}
                        id={badge.id}
                        value={badge.title}>
                        {badge.title}
                      </option>
                    );
                  }
                })}
              </select>
            </span>
          </Typography>
          <Typography>
            <span onClick={() => dispatch(deleteToDo(todo.id))}>
              <DeleteOutlineIcon className="ml-4 cursor-pointer hover:text-red-500" />
            </span>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
