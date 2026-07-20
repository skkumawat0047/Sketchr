import { useState, useEffect } from "react";
import { Search, Plus, LayoutTemplate, Upload, DoorOpen, MoreHorizontal, Star, Trash2, Edit3, ArrowLeftRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SketchrLogo from "./Login/SketchrLogo";
import { styles, COLORS } from "./Login/styles";

const QUICK_ACTIONS = [
  { icon: Plus, label: "Blank board", go: "/board/new" },
  { icon: LayoutTemplate, label: "From a template", go: "/board/new" },
  { icon: Upload, label: "Import a file", go: "/board/new" },
  { icon: DoorOpen, label: "Join a room", go: "/board/new" },
];

const TABS = ["All boards", "Shared with me", "Starred", "Trash"];
const ACCENT_COLORS = [COLORS.primary, COLORS.mint, COLORS.sun, COLORS.secondary];

const SERVER_ORIGIN = "http://localhost:5000";
const API_BOARDS = `${SERVER_ORIGIN}/api/boards`;

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All boards");
  const [boards, setBoards] = useState([]);
  
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [renameText, setRenameText] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("sketchr_user_name") || "Guest";
  const email = localStorage.getItem("sketchr_email_id") || "No email available";
  const avatarChar = userName.length > 0 ? userName.charAt(0).toUpperCase() : "?";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchBoards = async () => {
    try {
      if (!userId) return;
      const res = await fetch(`${SERVER_ORIGIN}/user/allboard/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      const tabKeyMap = { 
        "All boards": "ownedBoards", 
        "Shared with me": "sharedBoards", 
        "Starred": "starredBoards", 
        "Trash": "trashBoards" 
      };
      
      const selectedBoards = data[tabKeyMap[activeTab]] || [];

      setBoards(selectedBoards.map((b, i) => ({
        id: b._id,
        title: b.title || "Untitled Board",
        edited: new Date(b.updatedAt).toLocaleDateString(),
        people: b.collaborators?.length || 1,
        accent: ACCENT_COLORS[i % 4],
        isStarred: b.starredBy?.includes(userId) || false
      })));
    } catch (err) { 
      console.error("Fetch Error:", err); 
    }
  };

  useEffect(() => { 
    fetchBoards(); 
  }, [activeTab]);

  const handleAction = async (id, action) => {
    setActiveMenuId(null);
    try {
      if (action === "STAR") {
        const target = boards.find(b => b.id === id);
        if (activeTab === "Starred" && target?.isStarred) {
          setBoards(boards.filter(b => b.id !== id));
        } else {
          setBoards(boards.map(b => b.id === id ? { ...b, isStarred: !b.isStarred } : b));
        }
        
        await fetch(`${API_BOARDS}/star/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId })
        });
        fetchBoards();
      } 
      else if (action === "RENAME") {
        setEditingId(null);
        setBoards(boards.map(b => b.id === id ? { ...b, title: renameText } : b));
        await fetch(`${API_BOARDS}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: renameText })
        });
        fetchBoards();
      } 
      else if (action === "DELETE") {
        if (activeTab === "Trash") {
          if (!window.confirm("Permanently delete this board? This cannot be undone.")) return;
          setBoards(boards.filter(b => b.id !== id));
          await fetch(`${API_BOARDS}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId })
          });
        } else {
          setBoards(boards.filter(b => b.id !== id));
          await fetch(`${API_BOARDS}/trash/${id}`, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, toTrash: true })
          });
        }
        fetchBoards();
      }
      else if (action === "RESTORE") {
        setBoards(boards.filter(b => b.id !== id));
        await fetch(`${API_BOARDS}/trash/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, toTrash: false })
        });
        fetchBoards();
      }
    } catch (err) { 
      console.error(err);
      fetchBoards();
    }
  };

  return (
    <div style={styles.page} onClick={() => { setActiveMenuId(null); setShowProfileMenu(false); }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Architects+Daughter&family=Manrope:wght@400;500;600;700;800&display=swap');
        .custom-scroll::-webkit-scrollbar { width: 4px !important; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent !important; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: rgba(34, 32, 27, 0.25) !important; border-radius: 99px !important; }
        
        .profile-dropdown {
          position: absolute; right: 0; top: 48px; background: white;
          border: 1.5px solid #22201B; border-radius: 8px; box-shadow: 4px 4px 0px #22201B;
          z-index: 2000; width: 220px; display: flex; flex-direction: column; overflow: hidden;
        }
        .profile-info { padding: 12px 16px; border-bottom: 1.5px solid #EAE3D3; background: #FFF; text-align: left; }
        .profile-name { margin: 0; font-size: 14px; font-weight: 700; color: #22201B; font-family: 'Manrope', sans-serif; }
        .profile-email { margin: 2px 0 0 0; font-size: 12px; color: #8B8478; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'Manrope', sans-serif; }
        .logout-btn {
          padding: 10px 16px; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 8px; font-family: 'Architects Daughter', cursive;
          font-size: 13.5px; color: #dc2626; width: 100%; text-align: left; transition: background 0.2s;
        }
        .logout-btn:hover { background: #fff5f5; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ ...styles.nav, width: "100%", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
        <div style={styles.brand}>
          <SketchrLogo size={30} /> Sketchr
        </div>

        <div style={styles.searchBox} onClick={e => e.stopPropagation()}>
          <Search size={16} color={COLORS.pencil} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search boards..." style={styles.searchInput} />
        </div>

        <div style={{ ...styles.navRight, position: "relative" }} onClick={e => e.stopPropagation()}>
          <div 
            style={{ ...styles.avatar, cursor: "pointer" }} 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {avatarChar}
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <p className="profile-name">{userName}</p>
                <p className="profile-email">{email}</p>
              </div>
              {userName !== "Guest" && (
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={14} /> Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
      <div style={{ height: "68px" }} />

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <h1 style={styles.greeting}>Good morning, {userName.split(" ")[0]}..</h1>
        <p style={styles.subtext}>Pick up where you left off, or start something new.</p>

        {/* QUICK ACTIONS */}
        <div style={styles.pillRow}>
          {QUICK_ACTIONS.map(e => (
            <button key={e.label} style={{ ...styles.pill, cursor: "pointer" }} onClick={() => navigate(e.go)}>
              <e.icon size={16} /> {e.label}
            </button>
          ))}
        </div>

        {/* TABS */}
        <div style={styles.tabRow}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ ...styles.tab, ...(activeTab === t ? styles.tabActive : {}) }}>{t}</button>
          ))}
        </div>

        {/* BOARDS LIST */}
        <div className="custom-scroll" style={styles.boardList}>
          {boards
            .filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
            .map(b => (
              <div key={b.id} style={{ ...styles.boardRow, cursor: "pointer", position: "relative" }} onClick={() => editingId !== b.id && navigate(`/board/${b.id}`)}>
                <div style={{ ...styles.boardSwatch, background: b.accent }} />
                
                <div style={{ ...styles.boardInfo, flex: 1 }}>
                  {editingId === b.id ? (
                    <div style={{ display: "flex", gap: "6px" }} onClick={e => e.stopPropagation()}>
                      <input value={renameText} onChange={e => setRenameText(e.target.value)} autoFocus style={{ border: "1px solid #ccc", padding: "2px 6px", borderRadius: "4px" }} />
                      <button onClick={() => handleAction(b.id, "RENAME")} style={{ background: COLORS.primary, color: "white", border: "none", padding: "2px 8px", borderRadius: "4px", cursor: "pointer" }}>Save</button>
                    </div>
                  ) : (
                    <>
                      <div style={{ ...styles.boardTitle, display: "flex", alignItems: "center", gap: "6px" }}>
                        {b.title} {b.isStarred && <Star size={14} style={{ fill: "#fbbf24", color: "#fbbf24" }} />}
                      </div>
                      <div style={styles.boardMeta}>Edited {b.edited} · {b.people} people</div>
                    </>
                  )}
                </div>

                {/* MORE MENU OPTIONS */}
                <div onClick={e => e.stopPropagation()} style={{ position: "relative" }}>
                  <button style={styles.moreButton} onClick={() => setActiveMenuId(activeMenuId === b.id ? null : b.id)}>
                    <MoreHorizontal size={18} />
                  </button>
                  
                  {activeMenuId === b.id && (
                    <div style={{ position: "absolute", right: 0, top: 25, background: "white", border: "1px solid #ddd", borderRadius: "6px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", zIndex: 10, width: "130px", display: "flex", flexDirection: "column", padding: "4px" }}>
                      {activeTab !== "Trash" && (
                        <>
                          <button style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }} onClick={() => { setEditingId(b.id); setRenameText(b.title); setActiveMenuId(null); }}><Edit3 size={13} /> Rename</button>
                          <button style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }} onClick={() => handleAction(b.id, "STAR")}><Star size={13} /> {b.isStarred ? "Unstar" : "Star"}</button>
                        </>
                      )}
                      {activeTab === "Trash" && (
                        <button style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }} onClick={() => handleAction(b.id, "RESTORE")}><ArrowLeftRight size={13} /> Restore</button>
                      )}
                      <button style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "red" }} onClick={() => handleAction(b.id, "DELETE")}>
                        <Trash2 size={13} /> {activeTab === "Trash" ? "Delete Forever" : "Move to Trash"}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
        </div>
      </main>
    </div>
  );
}