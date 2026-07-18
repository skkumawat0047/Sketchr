import { useState, useEffect, act } from "react";
import {
  Search, Plus, LayoutTemplate, Upload, DoorOpen,
  Star, Trash2, MoreHorizontal
} from "lucide-react";
import SketchrLogo from "./Login/SketchrLogo";
import { useNavigate } from "react-router-dom";
import { styles, COLORS } from "./Login/styles";

/**
 * Sketchr — Home / Dashboard
 * Top nav + horizontal pill quick-actions + filter tabs above the board list.
 * Kept simple: two useState hooks (search text, active filter tab).
 */

const QUICK_ACTIONS = [
  { icon: Plus, label: "Blank board", go: "/board/new" },
  { icon: LayoutTemplate, label: "From a template", go: "/board/new" },
  { icon: Upload, label: "Import a file", go: "/board/new" },
  { icon: DoorOpen, label: "Join a room", go: "/board/new" },
];

const TABS = ["All boards", "Shared with me", "Starred", "Trash"];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All boards");
  const navigate = useNavigate();
  const [boardsData, setBoardsData] = useState({
    ownedBoards: [],
    sharedBoards: [],
    starredBoards: [],
    trashBoards: [],
  });
  const [formattedBoards, setformattedBoards] = useState([]);

  const getAllBoards = async (tab = activeTab) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) throw new Error("User not found");

      const response = await fetch(`http://localhost:5000/user/allboard/${userId}`);

      const data = await response.json();
      // get data from object which is fetching from backend
      const boards = activeTab === "All boards" ? data.ownedBoards
        : activeTab === "Shared with me" ? data.sharedBoards
          : activeTab === "Starred" ? data.starredBoards
            : data.trashBoards;

      const formatted = boards.map((board, index) => ({
        title: board.title || "Untitled Board",
        edited: new Date(board.updatedAt).toLocaleDateString(),
        id: board._id,
        accent: [
          COLORS.primary,
          COLORS.mint,
          COLORS.sun,
          COLORS.secondary
        ][index % 4],
        people: board.collaborators?.length || 1,
        thumbnail: board.thumbnail,
      }));
      setformattedBoards(formatted);
      setBoardsData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBoards(activeTab);
  }, [activeTab]);

  return (
    <div style={styles.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Architects+Daughter&family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>

      <nav style={styles.nav} className="fixed w-full">
        <div style={styles.brand}>
          <SketchrLogo size={30} />
          Sketchr
        </div>
        <div style={styles.searchBox}>
          <Search size={16} color={COLORS.pencil} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search boards..."
            style={styles.searchInput}
          />
        </div>
        <div style={styles.navRight}>
          <div style={styles.avatar}>A</div>
        </div>
      </nav>

      <main style={styles.main}>
        <h1 style={styles.greeting}>Good morning, Alex.</h1>
        <p style={styles.subtext}>Pick up where you left off, or start something new.</p>

        {/* QUICK ACTIONS — horizontal pill strip */}
        <div style={styles.pillRow}>
          {QUICK_ACTIONS.map((e) => {
            return (
              <button key={e.label} style={{ ...styles.boardRow, cursor: "pointer" }} onClick={() => navigate(e.go)}>
                <e.icon size={16} />
                {e.label}
              </button>
            )
          })}
        </div>

        {/* FILTER TABS */}
        <div style={styles.tabRow}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                ...styles.tab,
                ...(activeTab === t ? styles.tabActive : {}),
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* BOARD LIST — compact rows instead of a card grid */}
        <div style={styles.boardList}>
          {formattedBoards.map((b) => (
            <div key={b.id} style={styles.boardRow} onClick={() => navigate(`/board/${b.id}`)}>
              <div style={{ ...styles.boardSwatch, background: b.accent }} />
              <div style={styles.boardInfo}>
                <div style={styles.boardTitle}>{b.title}</div>
                <div style={styles.boardMeta}>Edited {b.edited} · {b.people} people</div>
              </div>
              <button style={styles.moreButton} onClick={(e) => e.stopPropagation()}><MoreHorizontal size={18} /></button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}