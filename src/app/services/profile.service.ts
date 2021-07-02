import { inject, injectable } from "inversify";
import { User } from "../../typings/profile.types";
import { Repository } from "../data/repository";

@injectable()
export class ProfileService {
  private _repository: Repository;
  constructor(@inject("Repository") repository: Repository) {
    this._repository = repository;
  }
  getUser(): Promise<User> {
    return new Promise((res) => {
      this._repository.findOneById<User>(
        "users",
        "60ddff452f30ee8aac91eb7c",
        (err, data) => {
          res(data);
        }
      );
    });
  }

  addUser(userToAdd: User): Promise<User> {
    return new Promise((res) => {
      this._repository.insert("users", userToAdd, (err, data) => {
        console.log(data);
        res(data);
      });
    });
  }
}
