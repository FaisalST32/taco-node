import { getModelForClass } from '@typegoose/typegoose';
import { Like, UserLikes } from '../../../typings/action.types';

export const LikeModel = getModelForClass(Like, {
  options: {
    customName: 'Like',
  },
  schemaOptions: {
    timestamps: true,
  },
});

export const UserLikesModel = getModelForClass(UserLikes, {
  options: {
    customName: 'UserLikes',
  },
  schemaOptions: {
    timestamps: true,
  },
});
