import { inject, injectable } from 'inversify';
import { LikeModel } from '../data/models/action.model';
import mongodb from 'mongodb';
import { Like } from '../../typings/action.types';
import { ProfileModel } from '../data/models/profile.model';
import { AuthService } from './auth.service';

@injectable()
export class ActionsService {
  private _authService: AuthService;
  constructor(@inject('AuthService') authService: AuthService) {
    this._authService = authService;
  }
  async likeProfile(profileId: string): Promise<boolean> {
    try {
      const newLike: Like = {
        user: new mongodb.ObjectID(profileId),
        isSuperLike: false,
      };
      const likeToAdd = new LikeModel(newLike);
      const savedLike = await likeToAdd.save();
      const currentUserId = await this._authService.getLoggedInUserId();
      const foundProfile = await ProfileModel.findById(currentUserId);
      foundProfile.likes = [...foundProfile.likes, savedLike._id];
      await foundProfile.save();
      return true;
    } catch {
      return false;
    }
  }
}
