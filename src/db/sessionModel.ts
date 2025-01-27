import mongoose, { Schema } from "mongoose";

const sessionSchema: Schema = new Schema(
    {
        user: { type: String, require: true },
        email: { type: String, require: false },
        sessionState: { type: String, require: true },
        currentFlow: { type: String, require: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ChatStatus = mongoose.model("ChatStatus", sessionSchema, "session");

export default ChatStatus;