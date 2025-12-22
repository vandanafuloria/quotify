import React, {useState} from "react";
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import { useReducer } from "react";
import {Heart, BookmarkIcon, SunIcon, MoonIcon, Sun} from "lucide-react"






export default function Header({theme, handleMode, liked}) {
  console.log(liked, "this is form the header ")



  return <>
  <div className="flex justify-between text-center p-5 h-[100px]"> 
    <div className="w-[40px] border border-pink-600 rounded-full p-2">
      <img className="w-full" src={logo} alt="logo" />
      <h1 className="text-2xl font-bold">Quotify...</h1>
      </div> {/* logo */}
      <div>
        <nav>
          {/* <Link to="/Home">Home</Link>
          <Link to="/Home">Favorite</Link>
          <Link to="/Home">About</Link>
         */}
          
        </nav>

      </div>
    <div className="flex gap-4">

      <div className="flex gap-4" onClick={handleMode}>
         {theme == "LIGHT" ?   <MoonIcon/> : <SunIcon/>  }
        
 
      </div>
      <div className="flex gap-4">
<span className="relative inline-block">
  <Heart size={24} className="z-10" />

  <span className="
    absolute 
    -top-2 
    -right-2 
    bg-pink-600 
    text-white 
    text-xs 
    w-5 
    h-5 
    flex 
    items-center 
    justify-center 
    rounded-full
    z-0
  ">
    {Object.keys(liked).length}
  </span>
</span>

     
 
      <BookmarkIcon />
      </div>
    
      

    </div>
  </div>
  </>

}