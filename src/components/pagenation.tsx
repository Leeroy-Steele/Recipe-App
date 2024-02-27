import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function Pagenation({ totalItems, currentPage, setCurrentPage, resultsPerPage, setResultsPerPage, firstItem, lastItem }) {

  // create buttons array with correct number of pages
  const [totalPages, setTotalpages] = useState(totalItems / resultsPerPage);
  
  // for page buttons
  let buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(i);
  }

  // for # of page results buttons
  let resultsPerPageButtonArr = [20,40,60]

  useEffect(()=>{
    // setCurrentPage(1);
    setTotalpages(totalItems / resultsPerPage)
  },[resultsPerPage])

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </a>
      </div>
      <div 
      className="hidden sm:flex sm:flex-1 sm:items-center justify-around"
      // className="hidden sm:flex"
      >
        
        {/* Show the number of results on the left */}
        <div style={{position:"absolute",left: "10px"}}>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{firstItem}</span> to{" "}
            <span className="font-medium">{lastItem}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        
        {/* results per page buttons */}
        <div >
          <p className="text-xs text-center">Results Per Page</p>
          <div className="flex justify-center">
            
            {resultsPerPageButtonArr.map((buttonNumber)=>
                    <button
                    key={buttonNumber}
                    type="button"
                    className="py-1.5 px-2 mr-0.5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={()=>setResultsPerPage(buttonNumber)}
                  >
                    {buttonNumber}
                  </button>
            )}
          </div>
        </div>

        {/* Page buttons */}
        <div style={{position:"absolute",right: "10px"}}>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm justify-end"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {buttons.map((button) => (
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  setCurrentPage(button);
                }}
              >
                {button}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
