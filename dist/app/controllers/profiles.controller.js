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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { controller, httpGet, httpPost, request, response, } from "inversify-express-utils";
import { ProfileService } from "../services/profile.service";
import { TYPES } from "../../inversify.config";
import { inject } from "inversify";
let ProfilesController = class ProfilesController {
    constructor(profileService) {
        this._profileService = profileService;
    }
    getAllProfiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allProfiles = yield this._profileService.getAllProfiles();
            console.log(allProfiles);
            res.status(200).send(allProfiles);
        });
    }
    createProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedProfile = yield this._profileService.saveProfile(req.body);
            res.status(200).send(savedProfile);
        });
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