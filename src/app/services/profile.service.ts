import { injectable } from 'inversify';
import { Passion, Profile } from '../../typings/profile.types';
import { PassionModel, ProfileModel } from '../data/models/profile.model';

@injectable()
export class ProfileService {
  getAllProfiles(): Promise<Profile[]> {
    return (
      ProfileModel.find()
        //.populate("profileMedia")
        .populate({ path: 'passions', model: 'Passion' })
        .exec()
    );
  }

  saveProfile(profile: Profile): Promise<Profile> {
    const profileToAdd = new ProfileModel(profile);
    return profileToAdd.save();
  }

  getAllPassions(): Promise<Passion[]> {
    return PassionModel.find().exec();
  }
}
