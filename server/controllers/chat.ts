import { Request, Response } from 'express';
import {Chat, User} from '../models';
import { AuthenticatedRequest } from '../types';

export const getChats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.user as {userId: string};
    const chats = await Chat.find({ users: userId }).populate('users', 'username');
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createChat = async (req: Request, res: Response) => {
  try {
    const { users } = req.body;
     const existingChat = await Chat.findOne({ users: { $all: users, $size: users.length } });
     
     if (existingChat) {
         return res.status(400).json({ message: 'Chat between these users already exists.' });
     }

    const chat = new Chat({ users });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ', error });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.q as string;
    const users = await User.find({ username: { $regex: searchQuery, $options: 'i' } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Функция для отправки сообщения
export const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { chatId, content } = req.body;
    const { userId } = req.user as {userId: string; id: string; username: string};
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.messages.push({ sender: userId, content, timestamp: new Date(), edited: false });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const editMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { chatId, messageId, content } = req.body;
    const { userId } = req.user as {userId: string};
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = chat.messages.id(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.sender.toString() !== userId) {
      return res.status(403).json({ message: 'You can only edit your own messages' });
    }

    message.content = content;
    message.edited = true;
    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { chatId, messageId } = req.body;
    const { userId } = req.user as {userId: string};
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = chat.messages.id(messageId);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.sender.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own messages' });
    }

    message.deleteOne();
    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const clearChatHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { chatId } = req.body;
    const { userId } = req.user as {userId: string};
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    if (!chat.users.includes(userId)) {
      return res.status(403).json({ message: 'You can only clear history in your own chats' });
    }

    chat.messages = [];
    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteChat = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { chatId } = req.body;
    const { userId } = req.user as {userId: string};
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    if (!chat.users.includes(userId)) {
      return res.status(403).json({ message: 'You can only delete your own chat' });
    }

    await chat.deleteOne();
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
