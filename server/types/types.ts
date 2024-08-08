import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    searchHistory: string[];
}
  
export interface IMessage {
    sender: IUser['_id'];
    content: string;
    timestamp: Date;
    edited: boolean;
}

export interface IChat extends Document {
    users: IUser['_id'][];
    messages: IMessage[];
}

export interface AuthenticatedRequest extends Request {
    user?: { id: string; username: string; userId: string };
}

