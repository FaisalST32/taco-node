"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassionModel = exports.ProfileModel = void 0;
const profile_types_1 = require("../../../typings/profile.types");
const typegoose_1 = require("@typegoose/typegoose");
exports.ProfileModel = typegoose_1.getModelForClass(profile_types_1.Profile, {
    options: {
        customName: "Profile",
    },
    schemaOptions: {
        timestamps: true,
    },
});
exports.PassionModel = typegoose_1.getModelForClass(profile_types_1.Passion, {
    options: {
        customName: "Passion",
    },
    schemaOptions: {
        timestamps: true,
    },
});
//# sourceMappingURL=profile.model.js.map