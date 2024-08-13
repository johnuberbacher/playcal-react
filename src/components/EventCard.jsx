import React from "react";
import Button from "./input/Button";

function EventCard({ index, eventStatus, eventStart, eventEnd, eventName, eventRepeatWeekly }) {

    return (
        <div key={index} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl hover:shadow relative">
            {eventStatus ? (
                <div
                    className={`absolute top-[-3px] left-[-5px] py-1 px-2 rounded-3xl text-[10px] font-bold text-white shadow-md uppercase 
                  ${eventStatus === 'cancelled' ? 'bg-gray-600' :
                            eventStatus === 'declined' ? 'bg-red-600' :
                                eventStatus === 'pending' ? 'bg-yellow-600' :
                                    'bg-lime-600'}`}
                >
                    {eventStatus}
                </div>
            ) : null}

            <div className="flex flex-row gap-0 md:gap-4 w-full h-full">

                <div className="w-[120px] min-w-[120px] max-w-[120px] h-auto aspect-square flex-auto flex flex-col items-center justify-center text-center border-r dark:border-gray-800">
                    <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-500">
                        {new Date(eventStart).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">
                        {new Date(eventStart).getDate()}
                    </div>
                </div>

                <div className="flex flex-col flex-auto gap-1">
                    <div className="flex flex-col md:flex-row gap-0 md:gap-8 w-full">

                        <div className="p-4 md:pl-0 border-t md:border-t-0 flex flex-col w-full flex-auto gap-2 text-gray-500 dark:text-gray-400 font-semibold">
                            <div className="flex flex-row flex-nowrap	gap-2 items-center whitespace-nowrap"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                                {new Date(eventStart).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}&nbsp;-&nbsp;
                                {new Date(eventEnd).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                            </div>
                            <div className="flex flex-row flex-nowrap	gap-2 items-center whitespace-nowrap"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-indigo-500 size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                                Discord</div>
                        </div>

                        <div className="p-4 md:pl-0 border-t md:border-t-0 flex flex-col w-full flex-auto gap-3 text-gray-500 dark:text-gray-400 font-semibold">
                            <div>{eventName}</div>
                            <div className="flex flex-row flex-nowrap	gap-2 items-center whitespace-nowrap">
                                <div
                                    className="w-7 h-7 flex items-center justify-center rounded-full border-2 bg-green-600 text-white font-semibold text-sm"
                                >G</div><div
                                    className="w-7 h-7 -ml-3 flex items-center justify-center rounded-full border-2 bg-red-600 text-white font-semibold text-sm"
                                >R</div><div
                                    className="w-7 h-7 -ml-3 flex items-center justify-center rounded-full border-2 bg-blue-600 text-white font-semibold text-sm"
                                >B</div>
                            </div>
                        </div>

                        <div className="p-4 md:pl-0 border-t md:border-t-0 text-gray-500 font-semibold">
                            <button
                                type="button"
                                className="select-none flex items-center justify-center rounded-md h-[40px] w-[40px] text-sm bg-indigo-600 text-white hover:bg-indigo-500 text-center font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <span className="sr-only">Previous month</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                </svg>

                            </button>
                        </div>
                    </div>

                    {eventRepeatWeekly ? (
                        <div className="flex flex-row flex-nowrap	gap-2 items-center whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                            This event repeats weekly
                        </div>
                    ) : ('')}

                </div>
            </div>
        </div>
    );
}

export default EventCard;
