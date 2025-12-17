import React, {useEffect, useReducer, useRef} from "react";
import { Heart, Bookmark } from "lucide-react";
import likeAudio from "../assets/like.mp3"


const initialState = { // initial state defined 
  like: false ,
}

const likeReducer = (state, action ) => {
switch(action.type){
  case "LIKE": 
  return {...state, like: state.like + 1};
  case "TOGGLE": 
  return {...state, like: !state.like }
  default :  return state;
}
}
  

const Card = ({ quote }) => {
const [like, dispatchLike] = useReducer(likeReducer, initialState);


const handleLikeClick = () => {
  console.log(like);
    dispatchLike({ type: "TOGGLE" });
  };

  const audioRef = useRef(new Audio (likeAudio));

  useEffect(()=>{
       if (like.like) {
      audioRef.current.currentTime = 0;  
      audioRef.current.play();
    }

  }, [like.like])



  return (
    <div className="w-[90%] md:w-[40%] min-h-[200px] border border-pink-600 rounded-2xl p-4">
      <p className="mb-6">{quote}</p>
      <div className="flex justify-between">
       { like.like ? <Heart  onClick={handleLikeClick } fill="red" color="red"  /> :  <Heart onClick={handleLikeClick} className="cursor-pointer" fill="black" color="black" />} 
      
        <Bookmark className="cursor-pointer" />
      </div>
    </div>
  );
};


export default Card;