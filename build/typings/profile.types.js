var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { prop } from "@typegoose/typegoose";
import mongo from "mongodb";
export var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (Gender = {}));
export var SexualOrientation;
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
})(SexualOrientation || (SexualOrientation = {}));
export class Passion {
}
__decorate([
    prop(),
    __metadata("design:type", mongo.ObjectID)
], Passion.prototype, "_id", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Passion.prototype, "text", void 0);
export var Media;
(function (Media) {
    Media["Image"] = "image";
    Media["Video"] = "video";
})(Media || (Media = {}));
export class ProfileMedia {
}
__decorate([
    prop({ enum: Media }),
    __metadata("design:type", String)
], ProfileMedia.prototype, "type", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], ProfileMedia.prototype, "contentUrl", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], ProfileMedia.prototype, "thumbnailUrl", void 0);
export class Profile {
}
__decorate([
    prop(),
    __metadata("design:type", String)
], Profile.prototype, "fullName", void 0);
__decorate([
    prop({ enum: Gender }),
    __metadata("design:type", String)
], Profile.prototype, "gender", void 0);
__decorate([
    prop(),
    __metadata("design:type", Number)
], Profile.prototype, "age", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Profile.prototype, "about", void 0);
__decorate([
    prop({ ref: Passion, autopopulate: true }),
    __metadata("design:type", Array)
], Profile.prototype, "passions", void 0);
__decorate([
    prop({ type: () => ProfileMedia }),
    __metadata("design:type", Array)
], Profile.prototype, "profileMedia", void 0);
__decorate([
    prop({ enum: SexualOrientation }),
    __metadata("design:type", String)
], Profile.prototype, "sexualOrientation", void 0);
//# sourceMappingURL=profile.types.js.map