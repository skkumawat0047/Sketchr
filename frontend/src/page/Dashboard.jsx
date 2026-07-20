import { useState, useEffect } from "react";
import { Search, Plus, LayoutTemplate, Upload, DoorOpen, MoreHorizontal, Star, Trash2, Edit3, ArrowLeftRight } from "lucide-react";
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

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("sketchr_user_name")?.split(" ") || ["Guest"];
  const avatarChar = userName[0]?.charAt(0).toUpperCase() || "?";

  const fetchBoards = async () => {
    try {
      if (!userId) return;
      const res = await fetch(`${SERVER_ORIGIN}/user/allboard/${userId}`);
      const data = await res.json();
      
      const tabKeyMap = { "All boards": "ownedBoards", "Shared with me": "sharedBoards", "Starred": "starredBoards", "Trash": "trashBoards" };
      const selectedBoards = data[tabKeyMap[activeTab]] || [];

      setBoards(selectedBoards.map((b, i) => ({
        id: b._id,
        title: b.title || "Untitled Board",
        edited: new Date(b.updatedAt).toLocaleDateString(),
        people: b.collaborators?.length || 1,
        accent: ACCENT_COLORS[i % 4],
        isStarred: b.starredBy?.includes(userId) || false
      })));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchBoards(); }, [activeTab]);

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
      } 
      else if (action === "RENAME") {
        setEditingId(null);
        setBoards(boards.map(b => b.id === id ? { ...b, title: renameText } : b));
        await fetch(`${API_BOARDS}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: renameText })
        });
      } 
      else if (action === "DELETE") {
        if (activeTab === "Trash") {
          if (!window.confirm("Permanently delete this board? This cannot be undone.")) return;
          
          // UI update fast execution ke liye
          setBoards(boards.filter(b => b.id !== id));
          
          // API Call - Database se permanent vanish karne ke liye
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
      }
      else if (action === "RESTORE") {
        setBoards(boards.filter(b => b.id !== id));
        await fetch(`${API_BOARDS}/trash/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, toTrash: false })
        });
      }
    } catch (err) { 
      console.error(err);
      // Agar API call fail ho jaye toh database aur ui sync ke liye fetch re-run karein
      fetchBoards();
    }
  };

  return (
    <div style={styles.page} onClick={() => setActiveMenuId(null)}>
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px !important; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent !important; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: rgba(34, 32, 27, 0.25) !important; border-radius: 99px !important; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ ...styles.nav, width: "100%" }}>
        <div style={styles.brand}><SketchrLogo size={30} /> Sketchr</div>
        <div style={styles.searchBox}>
          <Search size={16} color={COLORS.pencil} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search boards..." style={styles.searchInput} />
        </div>
        <div style={styles.navRight}><div style={styles.avatar}>{avatarChar}</div></div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <h1 style={styles.greeting}>Good morning, {userName[0]}..</h1>
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