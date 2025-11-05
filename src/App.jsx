import React, { useEffect, useState } from "react";
import loader from "./assets/loader.svg";
import Header from "../src/Component/Header";

import "./App.css";

import { useReducer } from "react";

function themeMode(state, action) {
  // In JavaScript, any non-empty string ("LIGHT" or "DARK") is truthy. //So theme ? will always be true, because both "LIGHT" and "DARK" are truthy.
  // That means it’ll always show the <SunIcon /> — never the <MoonIcon />.

  switch (action.type) {
    case "TOGGLE":
      return state === "LIGHT" ? "DARK" : "LIGHT";
    default:
      return state;
  }
}

function handleQuotes(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_END":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

function App() {
  const [startIndex, setStartIndex] = useState(0);
  const [theme, themeDispatch] = useReducer(themeMode, "LIGHT");

  const [quote, quoteDispatch] = useReducer(handleQuotes, {
    loading: false,
    data: [],
    error: null,
  });
  console.log(startIndex)

  const handleMode = () => {
    console.log("handle mode is clciking");

    themeDispatch({ type: "TOGGLE" });
  };

  const fetchQuote = async () => {
    quoteDispatch({ type: "FETCH_START" });
    try {
      const res = await fetch("https://dummyjson.com/quotes?limit=1000");
      const resData = await res.json();

      quoteDispatch({ type: "FETCH_END", payload: resData.quotes });
    } catch (error) {
      console.log(error);
      quoteDispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNextSet= ()=> {
    setStartIndex(startIndex + 3)
  }

  const handlePrevSet = ()=>{
    setStartIndex(startIndex - 3)
  }

  return (
    <>
      <div
        className={
          theme === "LIGHT"
            ? "bg-[#1B1B1F] text-gray-300"
            : "bg-white text-black"
        }
      >
        <div>
          <Header theme={theme} handleMode={handleMode} />
        </div>
        <div className={`min-h-screen  transition-all duration-500 gap-10 `}>
          <div className="flex gap-10 h-fit"></div>

          <div className="relative">
            {quote.loading && (
              <div className="absolute left-0 right-0 top-0 bottom-0 h-full w-full flex justify-center items-center">
                <img src={loader} alt="svg" />
              </div>
            )}
            {quote.error && <div> Loading... </div>}
            {quote.data.length > 0 && (
              <div>

             
                {quote.data.slice(startIndex, startIndex + 3).map((q, i) => {
                  return (
                    <h3 key={i} className="border border-pink-600 p-4 my-6">
                
                      {q.quote}
                    </h3>
                  );
                })}
              </div>
            )}
          </div>
            <button onClick={handlePrevSet} className={startIndex == 0 ? "bg-gray-400 cursor-not-allowed opacity-50" : "opacity-100"} >PREV</button>
          <button onClick={handleNextSet}>NEXT</button>
        

          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
