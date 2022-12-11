import React from "react";

function Search() {
  return (
    <>
      <div className="flex flex-col w-stretch">
        <div className="flex border border-gray-100 rounded p-3 hover:border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="w-5 h-5 mr-2 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="search"
            className="!outline-none w-full"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          ></input>
        </div>
      </div>
    </>
  );
}

export default Search;
