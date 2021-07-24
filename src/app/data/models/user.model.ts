import { model, Schema } from "mongoose";
import { User } from "../../../typings/user.types";

const userSchema = new Schema<User>(
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

export const UserModel = model<User>("user", userSchema);
