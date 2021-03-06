import { prop, Ref } from '@typegoose/typegoose';
import mongodb from 'mongodb';
import { Profile } from './profile.types';

export class Like {
  @prop()
  _id?: mongodb.ObjectId;
  @prop({ ref: Profile })
  user: Ref<Profile>;
  @prop()
  isSuperLike: boolean;
}

export class UserLikes {
  @prop()
  _id?: mongodb.ObjectId;
  @prop({ ref: Profile })
  user: Ref<Profile>;
  @prop({ ref: Like })
  likes: Ref<Like>[];
}
