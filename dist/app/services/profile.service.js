var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "inversify";
import { UserModel } from "../data/models/user.model";
import { ProfileModel } from "../data/models/profile.model";
let ProfileService = class ProfileService {
    getAllUsers() {
        return UserModel.find().exec();
    }
    getUserById(id) {
        return UserModel.findById(id).exec();
    }
    async addUser(userToAdd) {
        // return new Promise((res) => {
        //   this._repository.insert("users", userToAdd, (err, data) => {
        //     console.log(data);
        //     res(data);
        //   });
        // });
        const user = new UserModel(userToAdd);
        return user.save();
    }
    async getAllProfiles() {
        return (ProfileModel.find()
            //.populate("profileMedia")
            .populate({ path: "passions", model: "Passion" })
            .exec());
    }
    async saveProfile(profile) {
        const profileToAdd = new ProfileModel(profile);
        return profileToAdd.save();
    }
};
ProfileService = __decorate([
    injectable()
], ProfileService);
export { ProfileService };
//# sourceMappingURL=profile.service.js.map