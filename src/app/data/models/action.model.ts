import { getModelForClass } from '@typegoose/typegoose';
import { Like } from '../../../typings/action.types';

export const LikeModel = getModelForClass(Like, {
  options: {
    customName: 'Like',
  },
  schemaOptions: {
    timestamps: true,
  },
});
