import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../../../models/auth/User';

// const userSchema = new mongoose.Schema<User>(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     bio: String,
//   },
//   {
//     timestamps: true,
//   }
// );
//
// export const UserModel = mongoose.model<User>('user', userSchema);

export const UserModel = getModelForClass(User);
