import { model, models, Schema } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: false },
    image: { type: String, required: true },
    location: { type: String, required: false },
    portfolio: { type: String, required: false },
    reputation: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User = models?.user || model<IUser>("User", UserSchema);
export default User;
