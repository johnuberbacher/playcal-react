import React from "react";

const Select = ({}) => {
  return (
    <fieldset>
      <label
        for="game"
        className="block text-sm font-medium leading-6 text-gray-900">
        Time Slot:
      </label>
      <div className="relative mt-1 block w-full rounded-md border-0 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6">
        <select class="appearance-none rounded-md w-full py-1.5 px-2.5 ring-1 ring-inset ring-gray-300 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <option value="">select...&hellip;</option>
          <option value="1">Item 1</option>
          <option value="2">Item 2</option>
          <option value="3">Item 3</option>
        </select>
        <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </fieldset>
  );
};

export default Select;
