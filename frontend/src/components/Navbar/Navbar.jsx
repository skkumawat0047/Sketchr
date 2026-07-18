import React, { useState } from "react";
import SketchrLogo from "../../page/Login/SketchrLogo";
import { styles } from "../../page/Login/styles";
import { useEffect } from "react";

const Navbar = ({ onSave,title,setTitle}) => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     onSave();
  //   }, 30000);
  //   return () => clearInterval(interval);
  // }, [onSave])
  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Architects+Daughter&family=Manrope:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; }
    `}</style>
      <nav
        style={{
          ...styles.nav,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div style={styles.brand}>
          <SketchrLogo size={30} />Sketchr<input type="text" value={title} onChange={(e) => { setTitle(e.target.value); }} className="font-light text-[20px] opacity-55 ml-4 border-[1px] border-black rounded-md px-1 overflow-hidden" />
        </div>


        <div className="flex items-center gap-3 ml-auto">
          <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer transition">
            Clear
          </button>

          <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer transition">
            New Board
          </button>

          <button
            className="px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white cursor-pointer transition"
            title="Save" onClick={onSave}
          >
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </button>

          <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer transition">
            Share
          </button>

          <div style={styles.avatar}>A</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;