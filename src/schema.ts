import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        unique: true
    }
})

export const URLModel = mongoose.model("url", URLSchema)