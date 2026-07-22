import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Send } from "lucide-react";
import SketchrLogo from "../../page/Login/SketchrLogo";
import { styles } from "../../page/Login/styles";

const Navbar = ({ onSave, title, setTitle, ShareEmail, setShareEmail, onShareSubmit,clear}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showShareInput, setShowShareInput] = useState(false);

  // Local state as a safe fallback agar parent se function pass na ho
  const [localShareEmail, setLocalShareEmail] = useState("");

  // Determine current email value and setter based on props availability
  const currentEmail = ShareEmail !== undefined ? ShareEmail : localShareEmail;
  const updateEmail = typeof setShareEmail === "function" ? setShareEmail : setLocalShareEmail;

  const user = localStorage.getItem("sketchr_user_name") || "Guest";
  const email = localStorage.getItem("sketchr_email_id") || "No email found";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); 
  };

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    if (!currentEmail) return;

    if (currentEmail.includes("@") && currentEmail.includes(".")) {
      // Agar parent component se onShareSubmit function pass kiya gaya hai toh use call karein
      if (typeof onShareSubmit === "function") {
        await onShareSubmit();
      } else {
        alert(`Board successfully shared with ${currentEmail}!`);
        updateEmail("");
      }
      setShowShareInput(false);
    } else {
      alert("Please enter a valid email address.");
    }
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
          font-size: 14px; cursor: pointer; transition: all 0.15s ease;
        }
        .nav-action-btn:hover { background: #D8D0C0; transform: translateY(-1px); }
        .nav-action-btn:active { transform: translateY(0); }
        .nav-action-btn-primary {
          padding: 8px 16px; border-radius: 6px; border: 1.5px solid #22201B;
          background: #F2994A; color: #22201B; font-family: 'Architects Daughter', cursive;
          font-size: 14px; cursor: pointer; box-shadow: 2px 2px 0px #22201B;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .nav-action-btn-primary:hover { transform: translateY(-1px); box-shadow: 3px 3px 0px #22201B; }
        .nav-action-btn-primary:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px #22201B; }

        .nav-share-container {
          position: absolute; right: 60px; top: 12px; background: white;
          border: 1.5px solid #22201B; border-radius: 8px; padding: 6px;
          box-shadow: 4px 4px 0px #22201B; display: flex; align-items: center; gap: 6px; z-index: 2000;
        }
        .nav-share-input {
          border: 1.5px solid #22201B; border-radius: 4px; padding: 6px 10px;
          font-size: 13px; outline: none; width: 200px; font-family: 'Manrope', sans-serif;
        }
        .nav-share-submit {
          background: #5B5FEF; color: white; border: 1.5px solid #22201B; border-radius: 4px;
          padding: 6px 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .nav-share-submit:hover { background: #4a4edf; }

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
      
      <nav style={{ ...styles.nav, position: "fixed", top: 0, width: "100%", zIndex: 1000, pointerEvents: "none" }}>
        <div style={{ ...styles.brand, pointerEvents: "auto" }}>
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

        <div className="nav-btn-group" style={{ position: "relative", pointerEvents: "auto" }}>
          <button className="nav-action-btn" onClick={clear}>Clear</button>
          <button className="nav-action-btn" onClick={() => navigate('/board/new')}>New Board</button>
          <button className="nav-action-btn-primary" title="Save" onClick={onSave}>Save 💾</button>
          
          <button 
            className="nav-action-btn" 
            onClick={() => {
              setShowShareInput(!showShareInput);
              setShowMenu(false);
            }}
          >
            Share
          </button>

          {showShareInput && (
            <form onSubmit={handleShareSubmit} className="nav-share-container" onClick={(e) => e.stopPropagation()}>
              <input 
                type="email" 
                placeholder="Enter email..." 
                value={currentEmail || ""}
                onChange={(e) => updateEmail(e.target.value)}
                className="nav-share-input"
                autoFocus
              />
              <button type="submit" className="nav-share-submit" title="Send">
                <Send size={14} />
              </button>
            </form>
          )}

          <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ ...styles.avatar, cursor: "pointer" }} onClick={() => { setShowMenu(!showMenu); setShowShareInput(false); }}>
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
      
      {(showMenu || showShareInput) && (
        <div 
          style={{ position: "fixed", inset: 0, zIndex: 999, background: "transparent" }} 
          onClick={() => {
            setShowMenu(false);
            setShowShareInput(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;