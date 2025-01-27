import mongoose, { Schema } from "mongoose";

const flowSchema: Schema = new Schema(
    {
        message: { type: String, require: true },
        intent: { type: String, require: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ChatFlow = mongoose.model("ChatFlow", flowSchema, "flow");

export default ChatFlow;