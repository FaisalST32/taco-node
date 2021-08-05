import { DocumentType, prop, Ref } from '@typegoose/typegoose';
import mongodb from 'mongodb';
import { Profile } from '../../typings/profile.types';
import crypto from 'crypto';
import { nanoid } from 'nanoid';

export class User {
  @prop()
  _id: mongodb.ObjectID;
  @prop()
  fullName: string;
  @prop()
  username: string;
  @prop({ type: String })
  roles: string[];
  @prop({ ref: Profile })
  profile: Ref<Profile>;
  @prop()
  passwordHash: string;
  @prop()
  passwordSalt: string;
  @prop()
  refreshToken?: string;
  @prop()
  refreshTokenExpiryTimeStamp?: number;

  public setPassword(this: DocumentType<User>, password: string) {
    this.passwordSalt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations,

    this.passwordHash = crypto
      .pbkdf2Sync(password, this.passwordSalt, 1000, 64, `sha512`)
      .toString(`hex`);
  }

  public validatePassword(this: DocumentType<User>, password: string): boolean {
    const hash = crypto
      .pbkdf2Sync(password, this.passwordSalt, 1000, 64, `sha512`)
      .toString(`hex`);
    return this.passwordHash === hash;
  }

  public handleRefreshTokenReset(this: DocumentType<User>) {
    const isRefreshTokenValid =
      this.refreshToken &&
      this.refreshTokenExpiryTimeStamp &&
      this.refreshTokenExpiryTimeStamp > new Date().getTime();

    if (!isRefreshTokenValid) {
      this.refreshToken = nanoid();
      const newRefreshTokenExpiry = new Date();
      newRefreshTokenExpiry.setDate(new Date().getDay() + 30);
      this.refreshTokenExpiryTimeStamp = newRefreshTokenExpiry.getTime();
    }
  }
}
