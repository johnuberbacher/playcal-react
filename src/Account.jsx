import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import Schedule from "./components/Schedule";
import Button from "./components/input/Button";
import ModalAddEvent from "./components/modal/ModalAddEvent";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [userlabel, setUserlabel] = useState(null);
  const [events, setEvents] = useState([0, 1, 2]);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(16);
  const [selectedDateTimestamp, setSelectedDateTimestamp] = useState(
    new Date()
  );

  const [showModal, setShowModal] = useState(false);

  const toggleModalAddEvent = () => {
    setShowModal(!showModal);
  };

  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const currentDay = currentDate.getDate();
  const firstDayOfMonth = new Date(
    currentYear,
    currentDate.getMonth(),
    1
  ).getDay(); // 0 (Sunday) - 6 (Saturday)


  async function getEvents() {
    setLoading(true);
    /*
    const selectedFullDate = selectedDate
      ? new Date(currentYear, currentDate.getMonth(), selectedDate)
      : currentDate;
    const startOfDay = new Date(
      selectedFullDate.setHours(0, 0, 0, 0)
    ).toISOString();
    const endOfDay = new Date(
      selectedFullDate.setHours(23, 59, 59, 999)
    ).toISOString();

    let { data, error } = await supabase
      .from("events")
      .select()
      .eq("creator", username)
      .gte("start", startOfDay)
      .lte("start", endOfDay); */

    let { data, error } = await supabase
      .from("events")
      .select()
      .eq("creator", username)

    if (error) {
      console.warn(error);
    } else if (data) {
      setEvents(data);
    }

    setLoading(false);
  }

  async function getProfile() {
    setLoading(true);
    const { user } = session;

    setUserlabel(session.user.user_metadata.custom_claims.global_name);
    setUsername(session.user.user_metadata.full_name);
    setAvatarUrl(session.user.user_metadata.avatar_url);

    /* let { data, error } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", user.id)
      .single();

    if (error) {
      console.warn(error);
    } else if (data) {
      setUsername(data.username);
      setWebsite(data.website);
      setAvatarUrl(data.avatar_url);
    }*/

    setLoading(false);
  }

  useEffect(() => {

    getProfile();
    getEvents();
  }, [session, currentDate, selectedDate]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();
    setLoading(true);
    const { user } = session;
    const updates = {
      id: user.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  const handlePrevMonth = () => {
    const prevMonth = currentDate.getMonth() - 1;
    const prevYear = currentDate.getFullYear();
    const selectedDay = selectedDate || currentDay;
    setCurrentDate(new Date(prevYear, prevMonth, selectedDay));
  };

  const handleNextMonth = () => {
    const nextMonth = currentDate.getMonth() + 1;
    const nextYear = currentDate.getFullYear();
    const selectedDay = selectedDate || currentDay;
    setCurrentDate(new Date(nextYear, nextMonth, selectedDay));
  };

  const handleDayClick = (day) => {
    const selectedFullDate = new Date(currentYear, currentDate.getMonth(), day);
    setSelectedDate(day);
    setSelectedDateTimestamp(selectedFullDate.getTime());
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 flex-1 w-full h-full flex flex-col gap-20 items-center">
      {showModal && (
        <ModalAddEvent
          username={username}
          userlabel={userlabel}
          selectedDateTimestamp={selectedDateTimestamp}
          onClickCancel={toggleModalAddEvent}
        />
      )}
      <div className="flex flex-row justify-between gap-6 w-full p-6">
        <Button color="primary" text="Add Friend" fullWidth={false} />
        <Button
          color="primary"
          text="Sign Out"
          fullWidth={false}
          onClick={() => supabase.auth.signOut()}
        />
      </div>
      <div className="w-full max-w-screen-lg animate-in opacity-0 px-6 mx-auto mt-20">

        <div className="w-full mb-10 flex flex-col gap-1">
          <div class=""><span className="text-3xl font-semibold text-indigo-600 dark:text-indigo-500">
            {/*session.user.email*/}
            {session.user.user_metadata.custom_claims.global_name}
          </span>
            <span className="text-3xl font-semibold text-gray-900 dark:text-white">
              's calendar
            </span></div>
          <div className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </div>
        </div>

        <div className="w-full mb-10 flex flex-row gap-3 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <div className="cursor-pointer select-none flex items-center justify-center rounded-md px-4 h-[40px] text-sm text-white bg-indigo-600 hover:bg-indigo-500 text-center font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Upcoming
          </div>
          <div className="cursor-pointer select-none flex items-center justify-center rounded-md px-4 h-[40px] text-sm text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 text-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Pending
          </div>
          <div className="cursor-pointer select-none flex items-center justify-center rounded-md px-4 h-[40px] text-sm text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 text-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Past
          </div>
          <div className="cursor-pointer select-none flex items-center justify-center rounded-md px-4 h-[40px] text-sm text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 text-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Cancelled
          </div>
        </div>

        <div className="w-full mb-40 flex flex-col gap-3">
          {events.length === 0 ? (
            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl text-gray-500 p-6 text-center">No upcoming events</div>
          ) : (
            events.map((event, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl hover:shadow">
                <div className="flex flex-row gap-8 w-full h-full justify-start">
                  <div className="w-[120px] min-w-[120px] aspect-square flex-auto flex flex-col items-center justify-center text-center  border-r dark:border-gray-800">
                    <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-500">Wed</div>
                    <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-500">28</div>
                  </div>
                  <div className="flex flex-col w-full flex-1 items-start justify-center gap-2 py-4 text-gray-500 font-semibold">
                    <div className="flex flex-row flex-nowrap	gap-2 justify-start items-center whitespace-nowrap"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-indigo-500 size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                      {event.start} - {event.end}</div>
                    <div className="flex flex-row flex-nowrap	gap-2 justify-start items-center whitespace-nowrap"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-indigo-500 size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                      Discord</div>
                    {event.repeat_weekly ? (
                      <div className="flex flex-row flex-nowrap	gap-2 justify-start items-center whitespace-nowrap text-xs"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-indigo-500 size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>

                        This event repeats weekly</div>
                    ) : ('')}
                  </div>
                  <div className="flex flex-col w-full flex-auto items-start justify-center gap-2 py-6 text-gray-500 font-semibold">
                    <div>{event.name}</div>
                    <div className="flex flex-row flex-nowrap	gap-2 justify-start items-center whitespace-nowrap">
                      <div
                        className="w-7 h-7 flex items-center justify-center rounded-full border-2 bg-green-600 text-white font-semibold text-sm"
                      >G</div><div
                        className="w-7 h-7 -ml-3 flex items-center justify-center rounded-full border-2 bg-red-600 text-white font-semibold text-sm"
                      >R</div><div
                        className="w-7 h-7 -ml-3 flex items-center justify-center rounded-full border-2 bg-blue-600 text-white font-semibold text-sm"
                      >B</div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full max-w-[150px] flex-auto items-start justify-center py-6 pr-6 text-gray-500 font-semibold">
                    <Button
                      color="primary"
                      text="Action"
                      fullWidth={true}
                      onClick={toggleModalAddEvent}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full grid grid-cols-12 gap-x-6">
          <div className="col-span-full sm:col-span-6 ">
            <div className="w-full flex flex-row items-start justify-between">
              <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400 mb-10">
                <time
                  dateTime={`${currentDate.getFullYear()}-${currentDate.getMonth() + 1
                    }`}>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    year: "numeric",
                  }).format(currentDate)}
                </time>
              </div>
              <div className="w-auto flex flex-row -mt-1.5 shadow-sm">
                <button
                  type="button"
                  className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative sm:w-9 sm:pr-0 sm:hover:bg-gray-50"
                  onClick={handlePrevMonth}>
                  <span className="sr-only">Previous month</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-l border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative sm:w-9 sm:pl-0 sm:hover:bg-gray-50"
                  onClick={handleNextMonth}>
                  <span className="sr-only">Next month</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full flex flex-auto flex-col items-start justify-start bg-gray-100 dark:bg-gray-950 border dark:border-gray-800 rounded-md overflow-hidden select-none">
              <div className="w-full flex text-xs font-semibold leading-6 text-gray-700 dark:text-white flex-auto">
                <div className="w-full grid grid-cols-7 grid-rows-6 gap-px">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center w-full aspect-square relative bg-gray-200 dark:bg-gray-800">
                      <span>{day}</span>
                      <span className="sr-only">{day}</span>
                    </div>
                  ))}
                  {Array.from(
                    { length: daysInMonth + firstDayOfMonth - 1 },
                    (_, index) => {
                      const dayOfMonth = index - firstDayOfMonth + 2;
                      const isPreviousMonth = index < firstDayOfMonth - 1;
                      const isFutureMonth =
                        index >= daysInMonth + firstDayOfMonth - 1;
                      const previousMonthDays = new Date(
                        currentYear,
                        currentDate.getMonth(),
                        0
                      ).getDate();
                      let dayToDisplay = isPreviousMonth
                        ? previousMonthDays + dayOfMonth
                        : dayOfMonth;
                      const displayDate = new Date(
                        currentYear,
                        currentDate.getMonth(),
                        dayToDisplay
                      );
                      const isPastDay = displayDate < new Date();
                      const isCurrentDay = dayToDisplay === currentDay;

                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-center w-full aspect-square relative bg-white dark:bg-gray-900 ${isPreviousMonth
                            ? "bg-gray-100 dark:bg-gray-950"
                            : ""
                            } ${isPastDay && !isCurrentDay
                              ? "bg-gray-50 pointer-events-none"
                              : ""
                            }`}>
                          {isCurrentDay}
                          {dayOfMonth > 0 && !isFutureMonth && (
                            <button
                              className={`w-9/12 aspect-square rounded-full ${isPastDay && !isCurrentDay
                                ? "bg-gray-100 dark:bg-gray-900"
                                : dayToDisplay === selectedDate
                                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                                  : dayToDisplay === currentDay
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-900"
                                } border dark:border-gray-800 dark:text-white`}
                              onClick={() => handleDayClick(dayToDisplay)}>
                              <time
                                dateTime={`${currentYear}-${currentDate.getMonth() + 1
                                  }-${dayToDisplay}`}>
                                {displayDate.toLocaleDateString("en-US", {
                                  day: "numeric",
                                })}
                              </time>
                            </button>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full sm:col-span-3 flex flex-col gap-6">
            <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400">
              Schedule for {new Date(selectedDateTimestamp).toDateString()}
            </div>
            <Schedule events={events} />
            <div className="w-full">
              <Button
                color="primary"
                text="Add New Event"
                fullWidth={true}
                onClick={toggleModalAddEvent}
              />
            </div>
          </div>
        </div>

      </div>
      yo
      <form onSubmit={updateProfile} className="form-widget">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <button
            className="bg-red-500 button block "
            type="submit"
            disabled={loading}>
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
