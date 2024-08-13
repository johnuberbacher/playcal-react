import React from "react";
import EventCard from "./EventCard";

// Helper function to get the month name from month index
const getMonthName = (monthIndex) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthIndex];
};

// Helper function to group events by year and month
const groupEventsByMonth = (events) => {
  const groupedEvents = {};

  events.forEach(event => {
    const eventDate = new Date(event.start);
    const yearMonth = `${eventDate.getFullYear()}-${eventDate.getMonth()}`;
    
    if (!groupedEvents[yearMonth]) {
      groupedEvents[yearMonth] = [];
    }
    groupedEvents[yearMonth].push(event);
  });

  return groupedEvents;
};

function Schedule({ eventsToDisplay, eventsFilter, upcomingEvents, currentEvents, pastEvents }) {
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-indexed month (0 for January, 11 for December)
  const currentYear = today.getFullYear();
  
  // Helper function to get the first and last day of the current month
  const getStartOfMonth = (year, month) => new Date(year, month, 1);
  const getEndOfMonth = (year, month) => new Date(year, month + 1, 0);

  // Helper function to filter events within a given date range
  const filterEventsInRange = (events, startDate, endDate) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  // Helper function to filter future events
  const filterFutureEvents = (events) => {
    const now = new Date();
    return events.filter(event => new Date(event.start) > now);
  };

  // Date ranges for filtering
  const startOfMonth = getStartOfMonth(currentYear, currentMonth);
  const endOfMonth = getEndOfMonth(currentYear, currentMonth);

  let monthEvents = [];
  let futureEvents = [];
  let groupedFutureEvents = {};
  let eventsToShow = [];

  if (eventsFilter === 'thisMonth') {
    monthEvents = filterEventsInRange(currentEvents, startOfMonth, endOfMonth);
    eventsToShow = monthEvents;
  } else if (eventsFilter === 'upcoming') {
    monthEvents = filterEventsInRange(currentEvents, startOfMonth, endOfMonth);
    futureEvents = filterFutureEvents(upcomingEvents);
    groupedFutureEvents = groupEventsByMonth(futureEvents);
  } else if (eventsFilter === 'past') {
    eventsToShow = pastEvents;
  }

  return (
    <div className="w-full mb-40 flex flex-col gap-3">
      {eventsFilter === 'thisMonth' && monthEvents.length > 0 && (
        <div className="w-full mb-8 flex flex-col gap-3">
          <div className="text-xl font-semibold dark:text-white">
            This Month
          </div>
          {
            monthEvents.length === 0 ? (
              <div className="p-4 text-center bg-gray-200 dark:bg-gray-900 rounded-xl">No events available.</div>
            ) : (
              monthEvents.map((event, index) => (
                <EventCard key={index} index={index} eventStatus={event.status} eventStart={event.start} eventEnd={event.end} eventName={event.name} eventRepeatWeekly={event.repeat_weekly} />
              ))
            )}
        </div>
      )}

      {eventsFilter === 'upcoming' && Object.keys(groupedFutureEvents).length > 0 && (
        <div className="w-full mb-8 flex flex-col gap-3">
          {Object.entries(groupedFutureEvents).map(([yearMonth, events], index) => {
            const [year, month] = yearMonth.split('-').map(Number);
            return (
              <div key={index} className="w-full mb-8 flex flex-col gap-3">
                <div className="text-xl font-semibold dark:text-white">
                  {`${getMonthName(month)} ${year}`}
                </div>
                {
                  events.length === 0 ? (
                    <div className="p-4 text-center bg-gray-200 dark:bg-gray-900 rounded-xl">No events available.</div>
                  ) : (
                    events.map((event, eventIndex) => (
                      <EventCard key={eventIndex} index={eventIndex} eventStatus={event.status} eventStart={event.start} eventEnd={event.end} eventName={event.name} eventRepeatWeekly={event.repeat_weekly} />
                    ))
                  )}
              </div>
            );
          })}
        </div>
      )}

      {eventsFilter === 'past' && eventsToShow.length > 0 && (
        <div className="w-full mb-8 flex flex-col gap-3">
          <div className="text-xl font-semibold dark:text-white">
            Past Events
          </div>
          {
            eventsToShow.length === 0 ? (
              <div className="p-4 text-center bg-gray-200 dark:bg-gray-900 rounded-xl">No events available.</div>
            ) : (
              eventsToShow.map((event, index) => (
                <EventCard key={index} index={index} eventStatus={event.status} eventStart={event.start} eventEnd={event.end} eventName={event.name} eventRepeatWeekly={event.repeat_weekly} />
              ))
            )}
        </div>
      )}
    </div>
  );
}

export default Schedule;
