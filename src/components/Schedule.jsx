import React from "react";
import Button from "./input/Button";

function Schedule({ events }) {
  if (!events || !Array.isArray(events) || events.length === 0) {
    return (
      <div className="select-none w-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-3xl py-3 px-2 text-center text-xs leading-6 text-gray-600 dark:text-gray-400">
        There are no events for this day
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl">
      <div className="flex flex-col gap-1 p-1">
        <div className="w-full flex flex-row events-center gap-4 rounded-xl py-3 px-3 hover:bg-gray-100 hover:bg-gray-800">
          <img
            className="w-7 h-7 rounded-full"
            src="https://avatars.githubusercontent.com/u/5966499?v=4"
          />
          <div className="w-full flex flex-col items-start justify-center gap-px">
            <div className="flex flex-row items-center justify-start gap-1.5 text-sm font-semibold text-indigo-500">
              username is busy
            </div>
          </div>
        </div>
        {events.map((event, index) => (
          <div
            key={index}
            className="w-full flex flex-row events-center gap-4 rounded-xl py-3 px-3 hover:bg-gray-100 hover:bg-gray-800">
            <img
              className="w-7 h-7 rounded-full"
              src="https://avatars.githubusercontent.com/u/5966499?v=4"
            />
            <div className="w-full flex flex-col events-start justify-start gap-px">
              <div className="text-[9px] text-gray-600 font-semibold">
                {event.creator}
              </div>
              <div className="flex flex-row items-center justify-start gap-1.5 text-sm font-semibold text-indigo-500">
                <img
                  width="auto"
                  className="w-3 h-3 select-none"
                  src={`/playstation.png`}
                />
                {event.name}
              </div>
              <div className="text-xs text-gray-600 dark:text-white">
                {new Date(event.start).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
                &nbsp;-&nbsp;
                {new Date(event.end).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>

            <button
              type="button"
              className="-mx-2 flex events-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
              id={`menu-${index}-button`}
              aria-expanded="false"
              aria-haspopup="true">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
