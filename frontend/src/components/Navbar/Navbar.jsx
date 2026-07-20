import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import SketchrLogo from "../../page/Login/SketchrLogo";
import { styles } from "../../page/Login/styles";

const Navbar = ({ onSave, title, setTitle }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const user = localStorage.getItem("sketchr_user_name") || "Guest";
  const email = localStorage.getItem("sketchr_email_id") || "No email found";

  const handleLogout = () => {
    localStorage.clear(); // Ek sath sab clear karo
    navigate("/login"); 
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Architects+Daughter&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }

        .board-title-input {
          font-weight: 300; font-size: 18px; opacity: 0.8; margin-left: 16px;
          border: 1.5px solid #22201B; border-radius: 6px; padding: 2px 8px;
          background: transparent; outline: none; transition: all 0.2s;
        }
        .board-title-input:focus { border-color: #5B5FEF; opacity: 1; }

        .nav-btn-group { display: flex; align-items: center; gap: 12px; margin-left: auto; }
        .nav-action-btn {
          padding: 8px 16px; border-radius: 6px; border: 1.5px solid #22201B;
          background: #EAE3D3; color: #22201B; font-family: 'Architects Daughter', cursive;
          font-size: 14px; cursor: pointer; transition: background 0.15s;
        }
        .nav-action-btn:hover { background: #D8D0C0; }
        .nav-action-btn-primary {
          padding: 8px 16px; border-radius: 6px; border: 1.5px solid #22201B;
          background: #F2994A; color: #22201B; font-family: 'Architects Daughter', cursive;
          font-size: 14px; cursor: pointer; box-shadow: 2px 2px 0px #22201B;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .nav-action-btn-primary:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px #22201B; }

        .board-profile-dropdown {
          position: absolute; right: 0; top: 48px; background: white;
          border: 1.5px solid #22201B; border-radius: 8px; box-shadow: 4px 4px 0px #22201B;
          z-index: 2000; width: 220px; display: flex; flex-direction: column; overflow: hidden;
        }
        .board-profile-info { padding: 12px 16px; border-bottom: 1.5px solid #EAE3D3; background: #FFF; text-align: left; }
        .board-profile-name { margin: 0; font-size: 14px; font-weight: 700; color: #22201B; }
        .board-profile-email { margin: 2px 0 0 0; font-size: 12px; color: #8B8478; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        
        .board-logout-btn {
          padding: 10px 16px; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 8px; font-family: 'Architects Daughter', cursive;
          font-size: 13.5px; color: #dc2626; width: 100%; text-align: left; transition: background 0.2s;
        }
        .board-logout-btn:hover { background: #fff5f5; }
      `}</style>
      
      <nav style={{ ...styles.nav, position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <div style={styles.brand}>
          <SketchrLogo size={35} />
          Sketchr
          <input 
            type="text" 
            value={title || ""} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Untitled Board" 
            className="board-title-input"
          />
        </div>

        <div className="nav-btn-group">
          <button className="nav-action-btn">Clear</button>
          <button className="nav-action-btn" onClick={()=>navigate('/board/new')}>New Board</button>
          <button className="nav-action-btn-primary" title="Save" onClick={onSave}>Save 💾</button>
          <button className="nav-action-btn">Share</button>

          {/* USER PROFILE WRAPPER */}
          <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ ...styles.avatar, cursor: "pointer" }} onClick={() => setShowMenu(!showMenu)}>
              {user.charAt(0).toUpperCase() || '0'}
            </div>

            {showMenu && (
              <div className="board-profile-dropdown">
                <div className="board-profile-info">
                  <p className="board-profile-name">{user}</p>
                  <p className="board-profile-email">{email}</p>
                </div>
                {user !== "Guest" && (
                  <button onClick={handleLogout} className="board-logout-btn">
                    <LogOut size={14} /> Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {showMenu && (
        <div 
          style={{ position: "fixed", inset: 0, zIndex: 999, background: "transparent" }} 
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
};

export default Navbar;