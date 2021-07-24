"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
exports.UserModel = mongoose_1.model("user", userSchema);
//# sourceMappingURL=user.model.js.map