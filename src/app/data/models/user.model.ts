import mongoose from "mongoose";
import { User } from "../../../typings/user.types";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    bio: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<User>("user", userSchema);
