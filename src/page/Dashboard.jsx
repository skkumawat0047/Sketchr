import { useState } from "react";
import {
  Search, Plus, LayoutTemplate, Upload, DoorOpen, Star, Clock, Trash2, Grid3x3, Flame
} from "lucide-react";
import SketchrLogo from "./Login/SketchrLogo";

/**
 * Sketchr — Home / Dashboard
 * Same sketch-paper theme as the rest of the app, but a different layout
 * than a typical whiteboard dashboard: top nav (not sidebar), a "streak"
 * badge for daily use, pill-shaped stats, and torn-corner board cards.
 * Kept simple: only one useState for the search box.
 */

const COLORS = {
  paper: "#FBF8F1",
  ink: "#1F1B16",
  coral: "#FF6B5E",
  teal: "#4FB6B0",
  yellow: "#F6C744",
  purple: "#9B8CFF",
  pencil: "#8A8478",
  line: "#E7E1D3",
};

const QUICK_ACTIONS = [
  { icon: Plus, title: "Blank board", text: "Start from a fresh canvas.", color: COLORS.coral },
  { icon: LayoutTemplate, title: "From a template", text: "Retros, roadmaps, mind maps.", color: COLORS.teal },
  { icon: Upload, title: "Import a file", text: "Bring in Figma or images.", color: COLORS.yellow },
];

const BOARDS = [
  { title: "Q3 Roadmap Sketch", edited: "2 hours ago", accent: COLORS.coral, people: ["A", "B", "C"] },
  { title: "Onboarding Flow v2", edited: "Yesterday", accent: COLORS.teal, people: ["A", "B", "C", "D"], extra: 1 },
  { title: "Brand Moodboard", edited: "3 days ago", accent: COLORS.yellow, people: ["A", "B"] },
  { title: "Team Retro — June", edited: "1 week ago", accent: COLORS.purple, people: ["A", "B", "C", "D"], extra: 2 },
  { title: "App Wireframes", edited: "1 week ago", accent: COLORS.coral, people: ["A"] },
  { title: "Untitled Board", edited: "2 weeks ago", accent: COLORS.teal, people: ["A"] },
];

const STATS = [
  { icon: Grid3x3, label: "6 boards" },
  { icon: Flame, label: "5 day streak" },
  { icon: Clock, label: "3 active now" },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div style={styles.page}>
      {/* TOP NAV */}
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
        {/* GREETING + STREAK BADGE */}
        <div style={styles.greetingRow}>
          <div>
            <h1 style={styles.greeting}>Good morning, Alex.</h1>
            <p style={styles.subtext}>You've got 6 boards waiting for you.</p>
          </div>
          <div style={styles.streakBadge}>
            <Flame size={16} color={COLORS.coral} />
            5 day streak
          </div>
        </div>

        {/* STATS PILLS */}
        <div style={styles.statsRow}>
          {STATS.map((s) => (
            <div key={s.label} style={styles.statPill}>
              <s.icon size={14} color={COLORS.pencil} />
              {s.label}
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div style={styles.quickGrid}>
          {QUICK_ACTIONS.map((a) => (
            <button key={a.title} style={{ ...styles.quickCard, borderColor: a.color }}>
              <div style={{ ...styles.quickIcon, background: a.color }}>
                <a.icon size={20} color={COLORS.ink} />
              </div>
              <div style={styles.quickTitle}>{a.title}</div>
              <div style={styles.quickText}>{a.text}</div>
            </button>
          ))}
        </div>

        {/* CREATE A ROOM BANNER */}
        <div style={styles.roomBanner}>
          <div style={styles.roomIcon}>
            <DoorOpen size={22} color={COLORS.ink} />
          </div>
          <div style={styles.roomText}>
            <div style={styles.roomTitle}>Create a live room</div>
            <div style={styles.roomSub}>Spin up a session with a shareable code — perfect for a quick jam with the team.</div>
          </div>
          <div style={styles.roomActions}>
            <button style={styles.roomButton}>+ Create room</button>
            <input placeholder="Enter code" style={styles.roomCodeInput} />
          </div>
        </div>

        {/* RECENT BOARDS */}
        <div style={styles.sectionHead}>
          <h2 style={styles.sectionTitle}>Recent projects</h2>
          <a href="#" style={styles.viewAll}>View all</a>
        </div>

        <div style={styles.boardGrid}>
          {BOARDS.map((b) => (
            <div key={b.title} style={styles.boardCard}>
              <div style={{ ...styles.boardPreview, background: `${b.accent}22` }}>
                <div style={{ ...styles.boardPreviewCorner, background: b.accent }} />
              </div>
              <div style={styles.boardInfo}>
                <div style={styles.boardTitle}>{b.title}</div>
                <div style={styles.boardEdited}>Edited {b.edited}</div>
                <div style={styles.avatarStack}>
                  {b.people.map((p, i) => (
                    <div key={i} style={{ ...styles.stackAvatar, left: i * 16 }}>{p}</div>
                  ))}
                  {b.extra && (
                    <div style={{ ...styles.stackAvatar, left: b.people.length * 16, background: "#eee", color: COLORS.pencil }}>
                      +{b.extra}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: COLORS.paper,
    backgroundImage: `radial-gradient(${COLORS.line} 1.4px, transparent 1.4px)`,
    backgroundSize: "22px 22px",
    fontFamily: "'Inter', sans-serif",
    color: COLORS.ink,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    padding: "16px 32px",
    borderBottom: `1.5px solid ${COLORS.ink}`,
    background: "#fff",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Caveat', cursive",
    fontWeight: 700,
    fontSize: "26px",
    flexShrink: 0,
  },
  searchBox: {
    flex: 1,
    maxWidth: "420px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: `1.5px solid ${COLORS.ink}`,
    padding: "8px 14px",
    background: COLORS.paper,
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "14px",
    width: "100%",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "auto",
  },
  iconButton: {
    border: `1.5px solid ${COLORS.ink}`,
    background: "#fff",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: COLORS.teal,
    border: `1.5px solid ${COLORS.ink}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Kalam', cursive",
    fontWeight: 700,
  },
  main: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "40px 24px 80px",
  },
  greetingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "16px",
  },
  greeting: {
    fontFamily: "'Caveat', cursive",
    fontWeight: 700,
    fontSize: "42px",
    margin: "0 0 4px",
  },
  subtext: {
    color: COLORS.pencil,
    fontSize: "14.5px",
    margin: 0,
  },
  streakBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#fff",
    border: `1.5px solid ${COLORS.ink}`,
    padding: "8px 14px",
    fontFamily: "'Kalam', cursive",
    fontSize: "13.5px",
  },
  statsRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "32px",
  },
  statPill: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    border: `1.5px dashed ${COLORS.ink}`,
    padding: "6px 12px",
    fontSize: "13px",
    fontFamily: "'Kalam', cursive",
    color: COLORS.pencil,
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "28px",
  },
  quickCard: {
    textAlign: "left",
    background: "#fff",
    border: "1.5px solid",
    padding: "20px",
    cursor: "pointer",
    boxShadow: `4px 4px 0 rgba(31,27,22,0.85)`,
  },
  quickIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
    border: `1.5px solid ${COLORS.ink}`,
  },
  quickTitle: {
    fontFamily: "'Kalam', cursive",
    fontSize: "17px",
    marginBottom: "4px",
  },
  quickText: {
    fontSize: "13px",
    color: COLORS.pencil,
  },
  roomBanner: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "#fff",
    border: `1.5px solid ${COLORS.ink}`,
    padding: "22px 26px",
    marginBottom: "48px",
    borderLeft: `6px solid ${COLORS.purple}`,
    flexWrap: "wrap",
  },
  roomIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: `${COLORS.purple}33`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  roomText: {
    flex: 1,
    minWidth: "220px",
  },
  roomTitle: {
    fontFamily: "'Kalam', cursive",
    fontSize: "18px",
    marginBottom: "4px",
  },
  roomSub: {
    fontSize: "13.5px",
    color: COLORS.pencil,
    maxWidth: "460px",
  },
  roomActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  roomButton: {
    background: COLORS.purple,
    color: COLORS.ink,
    border: `1.5px solid ${COLORS.ink}`,
    fontFamily: "'Kalam', cursive",
    fontSize: "14.5px",
    padding: "10px 18px",
    cursor: "pointer",
  },
  roomCodeInput: {
    border: `1.5px solid ${COLORS.ink}`,
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    background: COLORS.paper,
  },
  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  sectionTitle: {
    fontFamily: "'Caveat', cursive",
    fontWeight: 700,
    fontSize: "30px",
    margin: 0,
  },
  viewAll: {
    fontSize: "13px",
    color: COLORS.coral,
    textDecoration: "underline",
    cursor: "pointer",
  },
  boardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  boardCard: {
    background: "#fff",
    border: `1.5px solid ${COLORS.ink}`,
    boxShadow: `4px 4px 0 rgba(31,27,22,0.85)`,
    overflow: "hidden",
    cursor: "pointer",
  },
  boardPreview: {
    height: "110px",
    position: "relative",
  },
  boardPreviewCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "26px",
    height: "26px",
    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
  },
  boardInfo: {
    padding: "14px 16px 16px",
  },
  boardTitle: {
    fontFamily: "'Kalam', cursive",
    fontSize: "15.5px",
    marginBottom: "4px",
  },
  boardEdited: {
    fontSize: "12.5px",
    color: COLORS.pencil,
    marginBottom: "10px",
  },
  avatarStack: {
    position: "relative",
    height: "26px",
  },
  stackAvatar: {
    position: "absolute",
    top: 0,
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: COLORS.coral,
    border: "2px solid #fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontFamily: "'Kalam', cursive",
    fontWeight: 700,
  },
};