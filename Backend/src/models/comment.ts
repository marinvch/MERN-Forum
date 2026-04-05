import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  content: string;
  createdAt: Date;
  author: string;
  post: mongoose.Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

export default mongoose.model<IComment>("Comment", commentSchema);
