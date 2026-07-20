import React from "react";
import SketchrLogo from "../../page/Login/SketchrLogo";
import { styles } from "../../page/Login/styles";

const Navbar = ({ onSave, title, setTitle }) => {
  const user = localStorage.getItem("sketchr_user_name");
  let firstalpha = '0';
  if(user.length>1) firstalpha = user.charAt(0).toUpperCase();
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
          <SketchrLogo size={35} />
          Sketchr
          
          {/* FIX: Controlled input binding with a fallback string and placeholder */}
          <input 
            type="text" 
            value={title || ""} 
            onChange={(e) => { setTitle(e.target.value); }} 
            placeholder="Untitled Board" 
            className="font-light text-[20px] opacity-75 ml-4 border-[1px] border-black rounded-md px-2 py-0.5 overflow-hidden bg-transparent outline-none focus:border-sky-500 transition-all" 
          />
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
            title="Save" 
            onClick={onSave}
          >
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </button>

          <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer transition">
            Share
          </button>

          <div style={styles.avatar}>{firstalpha}</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;