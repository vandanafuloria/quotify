import React, { useEffect, useState, useReducer } from "react";
import loader from "./assets/loader.svg";
import Header from "./Component/Header";
import Card from "./Component/Card";
import "./App.css";


function themeMode(state, action) {
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
  const [likedMap, setLikedMap] = useState({});
  const [bookmark, setBookmarks] = useState({});
  console.log("this is bookmark", bookmark);

  const [quote, quoteDispatch] = useReducer(handleQuotes, {
    loading: false,
    data: [],
    error: null,
  });


  const fetchQuote = async () => {
    quoteDispatch({ type: "FETCH_START" });

    try {
      const res = await fetch("http://localhost:4000/quotes");
      const resData = await res.json();

      quoteDispatch({
        type: "FETCH_END",
        payload: resData.quotes,
      });
    } catch (error) {
      quoteDispatch({
        type: "FETCH_ERROR",
      });
    }
  };


  useEffect(() => {
    fetchQuote();
  }, []);


  const toggleLike = (id) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const toggleBookmark = (id)=>{ // spreading existing bookmark , reversing the perticualr id and adding it ot the prev with fresh value (BEST PRACTICE TO USE WHEN NEW STATE DEPENDENT ON OLD STATE ) Copies all existing bookmarks - if bookmark does not exixst it adds , false to true, if book mark exist - it make it true to false , 
    setBookmarks((prev)=> ({...prev, [id]: !prev[id]}))
  }

  const handleLikeList = ()=>{
    console.log("this is likelist")
  }


  const handleNextSet = () => {
    setStartIndex((prev) => prev + 1);
  };

  const handlePrevSet = () => {
    setStartIndex((prev) => prev - 1);
  };



  const currentQuote = quote.data[startIndex];

  return (
    <div
      className={`min-h-screen ${
        theme === "DARK" ? "bg-[#1B1B1F] text-gray-300" : "bg-pink text-black"
      }`}
    >
      <Header theme={theme} liked={likedMap} bookmark={bookmark}  likeView={handleLikeList}handleMode={() => themeDispatch({ type: "TOGGLE" })} />

      <div className="flex justify-center items-center min-h-[70vh]">
        {quote.loading && <img src={loader} alt="loading" />}
        {quote.error && <div>Error loading quotes</div>}

        {currentQuote && (
          <Card
            id={currentQuote.id}
            quote={currentQuote.quote}
            author={currentQuote.author}
            category={currentQuote.category}
            liked={!!likedMap[currentQuote.id]} // !! after this value convert into boolean. (DOUBLE NEGATION)
            bookmark={!!bookmark[currentQuote.id]}
            onLike={toggleLike}
            onBookmark={toggleBookmark}
            theme={theme}
          />
        )}
      </div>

      <div className="flex justify-center gap-6 pb-10">
        <button
          onClick={handlePrevSet}
          disabled={startIndex === 0}
          className="border rounded-2xl px-4 py-2 disabled:opacity-50 hover:bg-pink-500 hover:text-white"
        >
          PREV
        </button>

        <button
          onClick={handleNextSet}
          disabled={startIndex === quote.data.length - 1}
          className="border rounded-2xl px-4 py-2 disabled:opacity-50 hover:bg-pink-500 hover:text-white"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
