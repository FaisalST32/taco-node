import { prop, Ref } from '@typegoose/typegoose';
import mongo from 'mongodb';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum SexualOrientation {
  Straight = 'straight',
  Gay = 'gay',
  Lesbian = 'lesbian',
  Bisexual = 'bisexual',
  Asexual = 'asexual',
  Demisexual = 'demisexual',
  Pansexual = 'pansexual',
  Queer = 'queer',
  Bicurious = 'bicurious',
  Aromantic = 'aromantic',
}

export class Passion {
  @prop()
  _id?: mongo.ObjectID;
  @prop()
  text: string;
}

export enum Media {
  Image = 'image',
  Video = 'video',
}

export class ProfileMedia {
  @prop({ enum: Media })
  type: Media;
  @prop()
  contentUrl: string;
  @prop()
  thumbnailUrl: string;
}

export class Profile {
  @prop()
  fullName: string;
  @prop({ enum: Gender })
  gender: Gender;
  @prop()
  age: number;
  @prop()
  about: string;
  @prop({ ref: Passion, autopopulate: true })
  passions: Ref<Passion>[];
  @prop({ type: () => ProfileMedia })
  profileMedia: ProfileMedia[];
  @prop({ enum: SexualOrientation })
  sexualOrientation: SexualOrientation;
}
