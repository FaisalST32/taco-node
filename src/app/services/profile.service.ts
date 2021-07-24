import { inject, injectable } from "inversify";
import { User } from "../../typings/user.types";
import { UserModel } from "../data/models/user.model";
import { Repository } from "../data/repository";
import { Profile } from "../../typings/profile.types";
import { ProfileModel } from "../data/models/profile.model";

@injectable()
export class ProfileService {
  private _repository: Repository;
  constructor(@inject("Repository") repository: Repository) {
    this._repository = repository;
  }
  getAllUsers(): Promise<User[]> {
    return UserModel.find().exec();
  }

  getUserById(id: string): Promise<User> {
    return UserModel.findById(id).exec();
  }

  async addUser(userToAdd: User): Promise<User> {
    // return new Promise((res) => {
    //   this._repository.insert("users", userToAdd, (err, data) => {
    //     console.log(data);
    //     res(data);
    //   });
    // });
    const user = new UserModel(userToAdd);
    return user.save();
  }

  async getAllProfiles(): Promise<Profile[]> {
    return (
      ProfileModel.find()
        //.populate("profileMedia")
        .populate({ path: "passions", model: "Passion" })
        .exec()
    );
  }

  async saveProfile(profile: Profile): Promise<Profile> {
    const profileToAdd = new ProfileModel(profile);
    return profileToAdd.save();
  }
}
