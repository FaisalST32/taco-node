import { inject, injectable } from 'inversify';
import { LikeModel, UserLikesModel } from '../data/models/action.model';
import mongodb from 'mongodb';
import { Like, UserLikes } from '../../typings/action.types';
import { AuthService } from './auth.service';
import { TYPES } from '../../inversify/types';

@injectable()
export class ActionsService {
  private _authService: AuthService;
  constructor(@inject(TYPES.AuthService) authService: AuthService) {
    this._authService = authService;
  }
  async likeProfile(profileId: string, isSuperLike: boolean): Promise<boolean> {
    try {
      const newLike: Like = {
        _id: new mongodb.ObjectID(),
        user: new mongodb.ObjectID(profileId),
        isSuperLike,
      };
      const likeToAdd = new LikeModel(newLike);
      const savedLike = await likeToAdd.save();
      const currentUserId = await this._authService.getLoggedInUserId();
      let foundUserLikes = await UserLikesModel.findOne({
        user: currentUserId,
      });
      if (!foundUserLikes) {
        foundUserLikes = await ActionsService.createNewUserLikes(currentUserId);
      }
      foundUserLikes.likes = [...foundUserLikes.likes, savedLike._id];
      await foundUserLikes.save();
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getUserLikes(): Promise<UserLikes[]> {
    return UserLikesModel.find()
      .populate({
        path: 'likes',
        model: 'Like',
        populate: { path: 'user', model: 'Profile' },
      })
      .exec();
  }

  private static async createNewUserLikes(userId: string) {
    const newUserLikes: UserLikes = {
      _id: new mongodb.ObjectID(),
      user: new mongodb.ObjectID(userId),
      likes: [],
    };

    const newUserLikesModel = new UserLikesModel(newUserLikes);
    return newUserLikesModel.save();
  }
}
