import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    bio: String,
}, {
    timestamps: true,
});
export const UserModel = mongoose.model("user", userSchema);
//# sourceMappingURL=user.model.js.map