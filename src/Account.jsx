import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import Schedule from "./components/Schedule";
import Button from "./components/input/Button";
import ModalAddEvent from "./components/modal/ModalAddEvent";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [userlabel, setUserlabel] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsFilter, setEventsFilter] = useState('upcoming');
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

    if (error) {
      console.warn(error);
    } else if (data) {
      const now = new Date().toISOString();
      const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

      const pastEvents = data.filter(event => event.start < startOfDay);
      const currentEvents = data.filter(event => event.start >= startOfDay && event.start <= endOfDay);
      const upcomingEvents = data.filter(event => event.start > endOfDay);

      setPastEvents(pastEvents);
      setCurrentEvents(currentEvents);
      setUpcomingEvents(upcomingEvents);

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

  const eventsToDisplay = eventsFilter === 'upcoming' ? upcomingEvents : pastEvents;

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
      <div className="flex flex-row justify-between gap-4 w-full p-6">
        <div className="flex flex-row gap-4"><Button color="primary" text="Add Friend" fullWidth={false} />
          <Button color="primary" text="Add Event" fullWidth={false} onClick={toggleModalAddEvent} /></div>

        <Button
          color="primary"
          text="Sign Out"
          fullWidth={false}
          onClick={() => supabase.auth.signOut()}
        />
      </div>
      <div className="w-full max-w-screen-lg animate-in opacity-0 px-6 mx-auto mt-20">

        <div className="w-full mb-10 flex flex-col gap-1">
          <div className=""><span className="text-3xl font-semibold text-indigo-600 dark:text-indigo-500">
            {/*session.user.email*/}
            {session.user.user_metadata.custom_claims.global_name}
          </span>
            <span className="text-3xl font-semibold text-gray-900 dark:text-white">
              's calendar
            </span></div>
          <div className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </div>
        </div>

        <div className="w-full mb-10 flex flex-row gap-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">

          <div
            onClick={() => setEventsFilter('upcoming')}
            className={`cursor-pointer select-none flex items-center justify-center rounded-md px-4 h-[40px] text-sm text-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              ${eventsFilter === 'upcoming' ? 'text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm' : 'text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'}`}>Upcoming
          </div>
          <div
            onClick={() => setEventsFilter('past')}
            className={`cursor-pointer select-none flex items-center justify-center rounded-md px-4 h-[40px] text-sm text-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              ${eventsFilter === 'past' ? 'text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm' : 'text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
            Expired
          </div>
          <div
            onClick={() => setEventsFilter('declined')}
            className={`cursor-pointer select-none flex items-center justify-center rounded-md px-4 h-[40px] text-sm text-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              ${eventsFilter === 'declined' ? 'text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm' : 'text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
            Declined
          </div>
        </div>

        <Schedule eventsToDisplay={eventsToDisplay} eventsFilter={eventsFilter} upcomingEvents={upcomingEvents} currentEvents={currentEvents} pastEvents={pastEvents} />

      </div>

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
