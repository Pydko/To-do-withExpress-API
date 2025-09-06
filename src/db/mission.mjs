import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
    mission: { type: String, required: true },
    startDate: { type: Number, required: false },
    lastDate: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }
});


export const Mission = mongoose.model("Mission",missionSchema);