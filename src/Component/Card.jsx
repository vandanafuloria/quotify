import React, {useReducer} from "react";
import { Heart, Bookmark } from "lucide-react";

const Card = ({ quote }) => {
  return (
    <div className="w-[90%] md:w-[40%] min-h-[200px] border border-pink-600 rounded-2xl p-4">
      <p className="mb-6">{quote}</p>
      <div className="flex justify-between">
        <Heart className="cursor-pointer" />
        <Bookmark className="cursor-pointer" />
      </div>
    </div>
  );
};


export default Card;