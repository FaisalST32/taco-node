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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const inversify_1 = require("inversify");
const user_model_1 = require("../data/models/user.model");
const repository_1 = require("../data/repository");
const profile_model_1 = require("../data/models/profile.model");
let ProfileService = class ProfileService {
    constructor(repository) {
        this._repository = repository;
    }
    getAllUsers() {
        return user_model_1.UserModel.find().exec();
    }
    getUserById(id) {
        return user_model_1.UserModel.findById(id).exec();
    }
    addUser(userToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            // return new Promise((res) => {
            //   this._repository.insert("users", userToAdd, (err, data) => {
            //     console.log(data);
            //     res(data);
            //   });
            // });
            const user = new user_model_1.UserModel(userToAdd);
            return user.save();
        });
    }
    getAllProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return (profile_model_1.ProfileModel.find()
                //.populate("profileMedia")
                .populate({ path: "passions", model: "Passion" })
                .exec());
        });
    }
    saveProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileToAdd = new profile_model_1.ProfileModel(profile);
            return profileToAdd.save();
        });
    }
};
ProfileService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("Repository")),
    __metadata("design:paramtypes", [repository_1.Repository])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map