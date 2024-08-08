import { Schema, model } from 'mongoose';
import { IChat } from '../types';

const ChatSchema = new Schema<IChat>({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      edited: { type: Boolean, default: false },
    },
  ],
});

export const Chat = model<any>('Chat', ChatSchema);
