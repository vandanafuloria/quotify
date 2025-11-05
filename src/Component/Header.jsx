import React, {useState} from "react";
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import { useReducer } from "react";
import {Heart, BookmarkIcon, SunIcon, MoonIcon, Sun} from "lucide-react"






export default function Header({theme, handleMode}) {






  

  return <>
  <div className="flex justify-between text-center p-5 border"> 
    <div className="w-[40px] border border-pink-600 rounded-full p-2">
      <img className="w-full" src={logo} alt="logo" />
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

       
  <Heart/>
      <BookmarkIcon />
      </div>
    
      

    </div>
  </div>
  </>

}