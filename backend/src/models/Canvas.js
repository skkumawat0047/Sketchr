const mongoose = require("mongoose");

const LineSchema = new mongoose.Schema(
  {
    id: String,
    tool: String, // pen, pencil, highlighter
    points: [Number],
    color: String,
    strokeWidth: Number,
  },
  { _id: false }
);

const ShapeSchema = new mongoose.Schema(
  {
    id: String,
    type: String, // rect, circle, line, arrow, triangle
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    radius: Number,
    points: [Number],
    stroke: String,
    fill: String,
    strokeWidth: Number,
    rotation: Number,
  },
  { _id: false }
);

const TextSchema = new mongoose.Schema(
  {
    id: String,
    text: String,
    x: Number,
    y: Number,
    fontSize: Number,
    fontFamily: String,
    color: String,
    fontStyle: String,
  },
  { _id: false }
);

const TableSchema = new mongoose.Schema(
  {
    id: String,
    x: Number,
    y: Number,
    rows: Number,
    cols: Number,
    cellWidth: Number,
    cellHeight: Number,
    data: [[String]],
  },
  { _id: false }
);

const CanvasSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Board",
    },
    
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["viewer", "editor"],
          default: "viewer",
        },
      },
    ],
    
    // ⭐ Starred users
    starredBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    
    // 🗑 Trash
    isDeleted: {
      type: Boolean,
      default: false,
    },
    
    // Optional thumbnail
    thumbnail: {
      type: String,
      default: "",
    },
    
    elements: {
      lines: {
        type: [LineSchema],
        default: [],
      },
      shapes: {
        type: [ShapeSchema],
        default: [],
      },
      texts: {
        type: [TextSchema],
        default: [],
      },
      tables: {
        type: [TableSchema],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Canvas", CanvasSchema);