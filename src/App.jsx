import React, { useEffect, useState } from "react";
import loader from "./assets/loader.svg";
import Header from "../src/Component/Header";
import Card from "../src/Component/Card";



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

 export default function App() {
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

      quoteDispatch({ type: "FETCH_END", payload: resData.quotes })
    } catch (error) {
      console.log(error);
      quoteDispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNextSet= ()=> {
    setStartIndex(startIndex + 1)
  }

  const handlePrevSet = ()=>{
    setStartIndex(startIndex - 1)
  }

  return (
    <>
   <div
  className={`min-h-screen bg-cover bg-center bg-no-repeat ${
    theme === "LIGHT"
      ? "bg-[#1B1B1F] text-gray-300"
      : "bg-white text-black"
  }`}
  style={{
    backgroundImage:
      "url('https://static.vecteezy.com/system/resources/thumbnails/047/948/036/small/abstract-gradient-background-with-golden-splashes-photo.jpg')",
  }}
>
  <Header theme={theme} handleMode={handleMode} />

  <div className="flex justify-center items-center min-h-[70vh] relative">
    {quote.loading && (
      <img src={loader} alt="loading" />
    )}

    {quote.error && <div>Error loading quotes</div>}

    {quote.data[startIndex] && (
      <Card quote={quote.data[startIndex].quote} />
    )}
  </div>

  <div className="flex justify-center gap-6 pb-10">
    <button
      onClick={handlePrevSet}
      disabled={startIndex === 0}
      className={`border rounded-2xl px-4 py-2 ${
        startIndex === 0
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
    >
      PREV
    </button>

    <button
      onClick={handleNextSet}
      disabled={startIndex === quote.data.length - 1}
      className={`border rounded-2xl px-4 py-2 ${
        startIndex === quote.data.length - 1
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
    >
      NEXT
    </button>
  </div>
</div>
</>
  );
}




