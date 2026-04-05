import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  createdAt: Date;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
  author: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model<IPost>("Post", postSchema);
