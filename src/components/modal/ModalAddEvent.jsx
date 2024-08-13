import { useState, useEffect } from "react";
import Button from "../input/Button";
import { supabase } from "../../lib/supabaseClient";

const ModalAddEvent = ({ username, userlabel, selectedDateTimestamp, onClickCancel }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16));
  const [eventDescription, setEventDescription] = useState("");
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [publicEvent, setPublicEvent] = useState(true);
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    setIsNameValid(eventName.length >= 1);
  }, [eventName]);

  const handleCreateNewEvent = async (e) => {
    // e.preventDefault();

    try {
      const { error } = await supabase
        .from("events")
        .upsert([
          {
            name: eventName,
            description: eventDescription,
            creator: username,
            creator_label: userlabel,
            start: eventDate,
            end: eventDate,
            repeat_weekly: repeatWeekly,
            public_event: publicEvent
          },
        ])
        .select()
        .limit(1)
        .single();
      if (error) {
        console.error("Error upserting event data:", error);
        return { error };
      } else {
        console.log("Event data upserted successfully");
        onClickCancel();
      }
    } catch (error) {
      console.error("Error upserting event data:", error);
      return { error };
    }
  };

  const handleClickCancel = () => {
    onClickCancel();
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gray-500 dark:bg-gray-950 opacity-75"></div>
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <form>
            <div className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Add New Event
            </div>
            <div className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Please be mindful of what you share, as this information may be
              publicly visible. Avoid sharing personal details about yourself or
              others without their explicit consent.
            </div>

            <div className="mt-6 border dark:border-gray-700 rounded-lg p-6 grid grid-cols-1 gap-y-3 sm:grid-cols-6">
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Name of game or activity:
                </label>
                <div className="mt-1">
                  <input
                    autoFocus
                    type="text"
                    id="event-name"
                    name="event-name"
                    placeholder="Enter the name of the game or activity"
                    className={`block w-full rounded-md border-0 py-1.5 px-2.5 text-sm text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${!isNameValid ? "border border-red-500" : ""
                      }`}
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full flex flex-row">
                <div className="w-full ">
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    Event Date:
                  </label>
                  <div className="w-full mt-1 cursor-pointer">
                    <input
                      type="datetime-local"
                      id="event-date"
                      name="trip-start"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      min={ new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16) }
                      className="cursor-pointer block w-full rounded-md border-0 py-1.5 px-2.5 text-sm text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Platform or location:
                </label>
                <div className="relative mt-1 block w-full rounded-md border-0 text-sm text-gray-900 dark:text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6">
                  <select
                    defaultValue="discord"
                    className="cursor-pointer appearance-none rounded-md w-full py-1.5 px-2.5 ring-1 ring-inset ring-gray-300 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <option value="discord">Discord</option>
                    <option value="steam">Steam</option>
                    <option value="xbox">Xbox</option>
                    <option value="switch">Nintendo Switch</option>
                    <option value="ps5">Playstation</option>
                    <option value="website">Web</option>
                    <option value="other">other</option>
                  </select>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Optional notes:
                </label>
                <div className="mt-1">
                  <textarea
                    id="details"
                    name="details"
                    rows={3}
                    placeholder="Enter any optional or additional details about the event"
                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-sm text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="select-none relative flex flex-row cursor-pointer items-center gap-4">
                  <input
                    type="checkbox"
                    className="peer cursor-pointer appearance-none relative h-5 w-5 bg-gray-600 dark:bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 checked:ring-indigo-600 checked:bg-indigo-600 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    checked={repeatWeekly}
                    onChange={(e) => setRepeatWeekly(e.target.checked)}
                  />
                  <div className="pointer-events-none absolute top-1/2 left-[10px] -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                    </svg>
                  </div>
                  <div className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    This event repeats every day of the week
                  </div>
                </label>
              </div>
              <div className="col-span-full">
                <label className="select-none relative flex flex-row cursor-pointer items-center gap-4">
                  <input
                    type="checkbox"
                    className="peer cursor-pointer appearance-none relative h-5 w-5 bg-gray-600 dark:bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 checked:ring-indigo-600 checked:bg-indigo-600 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    checked={publicEvent}
                    onChange={(e) => setPublicEvent(e.target.checked)}
                  />
                  <div className="pointer-events-none absolute top-1/2 left-[10px] -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                    </svg>
                  </div>
                  <div className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    This is a public event, anyone can see and join this event
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <Button
              color="primary"
              text="Save Event"
              fullWidth={false}
              onClick={handleCreateNewEvent}
              disabled={!isNameValid}
            />
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <Button
              color=""
              text="Cancel"
              fullWidth={false}
              onClick={handleClickCancel}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalAddEvent;
