import React, { useEffect, useRef } from "react";
import { Heart, Bookmark } from "lucide-react";
import likeAudio from "../assets/like.mp3";

const Card = ({ id, quote, author, category, liked, onLike, theme, bookmark , onBookmark}) => {
  const audioRef = useRef(new Audio(likeAudio));

  useEffect(() => {
    if (liked) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [liked]);

  return (
    <div
  className={`
    ${theme === "DARK" ? "bg-pink text-black" : ""}
    w-[90%] md:w-[50%] lg:w-[45%]
    min-h-[280px]
    bg-gradient-to-br from-white/10 to-white/5
    backdrop-blur-sm
    border border-pink-500/30
    rounded-3xl p-6
    shadow-2xl hover:shadow-pink-500/20
    transition-all duration-300 hover:scale-[1.02]
  `}
>

      
      {category && (
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5  border border-pink-400/40 rounded-full text-sm font-semibold text-pink-400 backdrop-blur-sm">
            {category}
          </span>
        </div>
      )}

     <div className="mb-6">
  <h2
    className={`
      font-bold text-2xl md:text-3xl italic leading-relaxed relative
      ${theme === "DARK" ? "text-white" : "text-black"}
    `}
  >
    <span className="text-pink-400 text-4xl absolute -left-2 -top-2">"</span>
    <span className="ml-4">{quote}</span>
    <span className="text-pink-400 text-4xl">"</span>
  </h2>
</div>


      {author && (
        <div className="mb-4">
          <p className="text-right text-lg font-medium text-pink-500/80 italic">
            — {author}
          </p>
        </div>
      )}


      <div className="flex justify-between items-center pt-4 border-t border-white/10">
       <div className="flex gap-4">


  {liked ? (
    <Heart
      onClick={() => onLike(id)}
      fill="red"
      color={theme === "DARK" ? "red": "red"}
      className="cursor-pointer hover:scale-110 transition-transform duration-200"
      size={28}
    />
  ) : (
    <Heart
      onClick={() => onLike(id)}
      className="cursor-pointer hover:scale-110 transition-transform duration-200 hover:text-pink-400"
      fill="none"
       color={theme === "DARK" ? "white": "black"}
      size={28}
    />
  )}


  {bookmark ? (
    <Bookmark
      onClick={() => onBookmark(id)}
      size={28}
      fill={theme === "DARK" ? "white" : "black"}
      color={theme === "DARK" ? "white" : "black"}
      className="cursor-pointer hover:scale-110 transition-transform duration-200"
    />
  ) : (
    <Bookmark
      onClick={() => onBookmark(id)}
      size={28}
      fill="none"
      className={`cursor-pointer hover:scale-110 transition-transform duration-200 ${theme === "DARK" ? "text-white" : "text-black"}`}
    />
  )}

</div>


        {liked && (
          <span className="text-sm text-pink-800 font-medium animate-pulse">
            Liked!
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
