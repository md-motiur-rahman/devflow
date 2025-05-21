import { model, models, Schema, Types } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

const VoteScema = new Schema<IVote>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  id: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ["question", "answer"], required: true },
  voteType: { type: String, enum: ["upvote", "downvote"], required: true },
});

const Vote = models?.Vote || model<IVote>("Vote", VoteScema);
export default Vote;
