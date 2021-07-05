import { model, Schema } from "mongoose";
import { User } from "../../../typings/profile.types";

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bio: String,
});

export const UserModel = model<User>("user", userSchema);
