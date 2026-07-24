import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Send, Copy, Check, Download, X, Image, FileCode } from "lucide-react";
import SketchrLogo from "../../page/Login/SketchrLogo";
import { styles } from "../../page/Login/styles";

const Navbar = ({ onSave, title, setTitle, ShareEmail, setShareEmail, onShareSubmit, clear, onDownload }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

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
      if (typeof onShareSubmit === "function") {
        await onShareSubmit();
      } else {
        alert(`Board shared successfully with ${currentEmail}!`);
        updateEmail("");
      }
      setShowShareModal(false);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerDownload = (format) => {
    if (typeof onDownload === "function") {
      onDownload(format); // 'image' ya 'json' pass hoga parent ko
    } else {
      alert(`Downloading as ${format.toUpperCase()}...`);
    }
    setShowDownloadOptions(false);
    setShowShareModal(false);
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

        /* Modal & Backdrop Styling */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 3000;
          background: rgba(34, 32, 27, 0.4);
          backdrop-filter: blur(5px);
          display: flex; align-items: center; justify-content: center;
        }
        .share-modal-box {
          background: #FFFDF9; border: 2px solid #22201B; border-radius: 12px;
          padding: 24px; width: 400px; max-width: 90%;
          box-shadow: 6px 6px 0px #22201B; position: relative;
          font-family: 'Manrope', sans-serif;
        }
        .share-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
        }
        .share-modal-title {
          font-family: 'Architects Daughter', cursive; font-size: 20px; font-weight: bold; margin: 0; color: #22201B;
        }
        .share-close-btn {
          background: none; border: none; cursor: pointer; color: #22201B;
        }
        
        .share-section-title {
          font-size: 13px; font-weight: 700; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .share-email-form { display: flex; gap: 8px; margin-bottom: 20px; }
        .nav-share-input {
          border: 1.5px solid #22201B; border-radius: 6px; padding: 8px 12px;
          font-size: 14px; outline: none; flex: 1; font-family: 'Manrope', sans-serif;
        }
        .nav-share-submit {
          background: #5B5FEF; color: white; border: 1.5px solid #22201B; border-radius: 6px;
          padding: 8px 14px; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .nav-share-submit:hover { background: #4a4edf; }

        .copy-link-box {
          display: flex; align-items: center; justify-content: space-between;
          border: 1.5px solid #22201B; border-radius: 6px; padding: 8px 12px;
          background: #F4EFE6; margin-bottom: 20px;
        }
        .copy-link-text { font-size: 13px; color: #444; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 10px; }
        .copy-btn {
          background: #22201B; color: white; border: none; border-radius: 4px;
          padding: 6px 12px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px;
          font-family: 'Manrope', sans-serif; white-space: nowrap;
        }
        .copy-btn:hover { background: #333; }

        .download-container { position: relative; width: 100%; }
        .download-option-btn {
          width: 100%; background: #EAE3D3; border: 1.5px solid #22201B; border-radius: 6px;
          padding: 10px; font-family: 'Architects Daughter', cursive; font-size: 15px;
          color: #22201B; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.15s;
        }
        .download-option-btn:hover { background: #D8D0C0; }

        .download-dropdown-popup {
          position: absolute; bottom: 100%; left: 0; width: 100%; background: white;
          border: 1.5px solid #22201B; border-radius: 6px; box-shadow: 0px -4px 10px rgba(0,0,0,0.05);
          margin-bottom: 8px; overflow: hidden; z-index: 10;
        }
        .download-sub-option {
          padding: 10px 14px; font-size: 14px; color: #22201B; background: white; border: none;
          width: 100%; text-align: left; cursor: pointer; display: flex; align-items: center; gap: 8px;
          font-family: 'Manrope', sans-serif; border-bottom: 1px solid #EAE3D3;
        }
        .download-sub-option:last-child { border-bottom: none; }
        .download-sub-option:hover { background: #F4EFE6; }

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
          <button className="nav-action-btn-primary font-bold" title="Save" onClick={()=>navigate('/Dashboard')}>Home 💾</button>
          <button className="nav-action-btn" onClick={clear}>Clear</button>
          <button className="nav-action-btn" onClick={() => navigate('/board/new')}>New Board</button>
          
          <button 
            className="nav-action-btn" 
            onClick={() => {
              setShowShareModal(true);
              setShowMenu(false);
              setShowDownloadOptions(false);
            }}
          >
            Share
          </button>

          <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ ...styles.avatar, cursor: "pointer" }} onClick={() => { setShowMenu(!showMenu); }}>
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
      
      {/* Share & Export Modal with Background Blur */}
      {showShareModal && (
        <div className="modal-backdrop" onClick={() => { setShowShareModal(false); setShowDownloadOptions(false); }}>
          <div className="share-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3 className="share-modal-title">Share & Export Board</h3>
              <button className="share-close-btn" onClick={() => { setShowShareModal(false); setShowDownloadOptions(false); }}>
                <X size={20} />
              </button>
            </div>

            {/* Email Share Section */}
            <div className="share-section-title">Invite via Email</div>
            <form onSubmit={handleShareSubmit} className="share-email-form">
              <input 
                type="email" 
                placeholder="colleague@example.com" 
                value={currentEmail || ""}
                onChange={(e) => updateEmail(e.target.value)}
                className="nav-share-input"
                autoFocus
              />
              <button type="submit" className="nav-share-submit" title="Send">
                <Send size={16} />
              </button>
            </form>

            {/* Copy URL Section */}
            <div className="share-section-title">Copy Board Link</div>
            <div className="copy-link-box">
              <span className="copy-link-text">{window.location.href}</span>
              <button className="copy-btn" onClick={handleCopyLink}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            {/* Download Option Section with 2 formats */}
            <div className="share-section-title">Export Board</div>
            <div className="download-container">
              {showDownloadOptions && (
                <div className="download-dropdown-popup">
                  <button className="download-sub-option" onClick={() => triggerDownload('image')}>
                    <Image size={15} color="#5B5FEF" /> Download as Image (PNG)
                  </button>
                  <button className="download-sub-option" onClick={() => triggerDownload('json')}>
                    <FileCode size={15} color="#F2994A" /> Download to Re-open (JSON)
                  </button>
                </div>
              )}
              <button 
                className="download-option-btn" 
                onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              >
                <Download size={16} /> Download Board ▾
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Dropdown Backdrop Close */}
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