const mongoose = require('mongoose')


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CanvasSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Untitled Canvas"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    elements: [
        {
            id: {
                type: String,
                required: true
            },
            
            type: {
                type: String,
                required: true,
                enum: [
                    "line",
                    "rect",
                    "circle",
                    "ellipse",
                    "arrow",
                    "text",
                    "table"
                ]
            },
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            zIndex: {
                type: Number,
                default: 0
            },
            rotation: {
                type: Number,
                default: 0
            },
            visible: {
                type: Boolean,
                default: true
            },
            locked: {
                type: Boolean,
                default: false
            },
            element: {
                type: mongoose.Schema.Types.Mixed,
                default: {}
            }
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model("Canvas", CanvasSchema);