"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.ProfileMedia = exports.Media = exports.Passion = exports.SexualOrientation = exports.Gender = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_1 = require("mongodb");
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
var SexualOrientation;
(function (SexualOrientation) {
    SexualOrientation["Straight"] = "straight";
    SexualOrientation["Gay"] = "gay";
    SexualOrientation["Lesbian"] = "lesbian";
    SexualOrientation["Bisexual"] = "bisexual";
    SexualOrientation["Asexual"] = "asexual";
    SexualOrientation["Demisexual"] = "demisexual";
    SexualOrientation["Pansexual"] = "pansexual";
    SexualOrientation["Queer"] = "queer";
    SexualOrientation["Bicurious"] = "bicurious";
    SexualOrientation["Aromantic"] = "aromantic";
})(SexualOrientation = exports.SexualOrientation || (exports.SexualOrientation = {}));
class Passion {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", mongodb_1.ObjectID)
], Passion.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Passion.prototype, "text", void 0);
exports.Passion = Passion;
var Media;
(function (Media) {
    Media["Image"] = "image";
    Media["Video"] = "video";
})(Media = exports.Media || (exports.Media = {}));
class ProfileMedia {
}
__decorate([
    typegoose_1.prop({ enum: Media }),
    __metadata("design:type", String)
], ProfileMedia.prototype, "type", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], ProfileMedia.prototype, "contentUrl", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], ProfileMedia.prototype, "thumbnailUrl", void 0);
exports.ProfileMedia = ProfileMedia;
class Profile {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Profile.prototype, "fullName", void 0);
__decorate([
    typegoose_1.prop({ enum: Gender }),
    __metadata("design:type", String)
], Profile.prototype, "gender", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Profile.prototype, "age", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Profile.prototype, "about", void 0);
__decorate([
    typegoose_1.prop({ ref: Passion, autopopulate: true }),
    __metadata("design:type", Array)
], Profile.prototype, "passions", void 0);
__decorate([
    typegoose_1.prop({ type: () => ProfileMedia }),
    __metadata("design:type", Array)
], Profile.prototype, "profileMedia", void 0);
__decorate([
    typegoose_1.prop({ enum: SexualOrientation }),
    __metadata("design:type", String)
], Profile.prototype, "sexualOrientation", void 0);
exports.Profile = Profile;
//# sourceMappingURL=profile.types.js.map