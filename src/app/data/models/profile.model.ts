import { Passion, Profile } from '../../../typings/profile.types';
import { getModelForClass } from '@typegoose/typegoose';

export const ProfileModel = getModelForClass(Profile, {
  options: {
    customName: 'Profile',
  },
  schemaOptions: {
    timestamps: true,
  },
});
export const PassionModel = getModelForClass(Passion, {
  options: {
    customName: 'Passion',
  },
  schemaOptions: {
    timestamps: true,
  },
});
