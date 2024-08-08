import express from 'express';
import {
  getChats,
  createChat,
  searchUsers,
  sendMessage,
  editMessage,
  deleteMessage,
  clearChatHistory,
  deleteChat,
} from '../controllers';
import { auth } from '../middleware';

export const chatRoutes = express.Router();

chatRoutes.get('/', auth, getChats); // Get all chat list
chatRoutes.post('/', auth, createChat); // Get new chat room
chatRoutes.delete('/', auth, deleteChat); // Delete new chat room
chatRoutes.get('/search', auth, searchUsers); // Search user
chatRoutes.post('/message', auth, sendMessage); // Send message
chatRoutes.put('/message', auth, editMessage); // Edit message
chatRoutes.delete('/message', auth, deleteMessage); // Delete message
chatRoutes.post('/clear', auth, clearChatHistory); // Clear all chat history