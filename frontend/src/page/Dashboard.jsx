import { useState, useEffect } from "react";
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
  { icon: Plus, label: "Blank board", go: "Home" },
  { icon: LayoutTemplate, label: "From a template", go: "Home" },
  { icon: Upload, label: "Import a file", go: "Home" },
  { icon: DoorOpen, label: "Join a room", go: "Home" },
];

const TABS = ["All boards", "Shared with me", "Starred"];

const BOARDS = [
  { title: "Q3 Roadmap Sketch", edited: "2 hours ago", accent: COLORS.primary, people: 3 },
  { title: "Onboarding Flow v2", edited: "Yesterday", accent: COLORS.mint, people: 5 },
  { title: "Brand Moodboard", edited: "3 days ago", accent: COLORS.sun, people: 2 },
  { title: "Team Retro — June", edited: "1 week ago", accent: COLORS.secondary, people: 6 },
  { title: "App Wireframes", edited: "1 week ago", accent: COLORS.primary, people: 1 },
  { title: "Untitled Board", edited: "2 weeks ago", accent: COLORS.mint, people: 1 },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All boards");
  const navigate = useNavigate();

  const getAllBoards = async () => {
    try {
      const userId = localStorage.getItem("userId")
      console.log(userId);
      if (!userId) throw new Error("User not found");
      const response = await fetch(`https://sketchr.onrender.com/user/allboards/${userId}`);
      if (!response.ok) {
        throw new Error("Boards not found");
      }
      const data = await response.json();
      console.log("respose: ", data)

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <div style={styles.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Architects+Daughter&family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>

      <nav style={styles.nav}>
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
          <button style={styles.iconButton}><Star size={17} /></button>
          <button style={styles.iconButton}><Trash2 size={17} /></button>
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
              <button key={e.label} style={styles.pill} onClick={() => navigate(`/${e.go}`)}>
                <e.icon size={16} />
                {e.label}
              </button>
            )
          })}
          {/* <button key={"sdkfj"} style={styles.pill}>
              <Plus size={16} />
              "Blank board"
            </button>
            <button key={"sdkfj"} style={styles.pill}>
              <LayoutTemplate size={16} />
              "Blank board"
            </button>
            <button key={"sdkfj"} style={styles.pill}>
              <Upload size={16} />
              "Blank board"
            </button>
            <button key={"sdkfj"} style={styles.pill}>
              <DoorOpen size={16} />
              "Blank board"
            </button> */}
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
          {BOARDS.map((b) => (
            <div key={b.title} style={styles.boardRow}>
              <div style={{ ...styles.boardSwatch, background: b.accent }} />
              <div style={styles.boardInfo}>
                <div style={styles.boardTitle}>{b.title}</div>
                <div style={styles.boardMeta}>Edited {b.edited} · {b.people} people</div>
              </div>
              <button style={styles.moreButton}><MoreHorizontal size={18} /></button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
