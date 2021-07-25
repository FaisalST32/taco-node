var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { controller, httpGet, httpPost, request, response, } from "inversify-express-utils";
import { ProfileService } from "../services/profile.service";
import { TYPES } from "../../inversify.config";
import { inject } from "inversify";
let ProfilesController = class ProfilesController {
    constructor(profileService) {
        this._profileService = profileService;
    }
    async getAllProfiles(req, res) {
        const allProfiles = await this._profileService.getAllProfiles();
        console.log(allProfiles);
        res.status(200).send(allProfiles);
    }
    async createProfile(req, res) {
        const savedProfile = await this._profileService.saveProfile(req.body);
        res.status(200).send(savedProfile);
    }
};
__decorate([
    httpGet("/"),
    __param(0, request()),
    __param(1, response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getAllProfiles", null);
__decorate([
    httpPost("/"),
    __param(0, request()),
    __param(1, response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "createProfile", null);
ProfilesController = __decorate([
    controller("/profiles"),
    __param(0, inject(TYPES.ProfileService)),
    __metadata("design:paramtypes", [ProfileService])
], ProfilesController);
export { ProfilesController };
//# sourceMappingURL=profiles.controller.js.map