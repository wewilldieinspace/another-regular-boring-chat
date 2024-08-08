import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  searchHistory: { type: [String], default: [] },
});

export const User = model<IUser>('User', UserSchema);
