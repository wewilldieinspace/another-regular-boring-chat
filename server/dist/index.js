"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// import authRoutes from './routes/auth';
// import chatRoutes from './routes/chat';
// Загрузка переменных окружения из .env файла
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Подключение к MongoDB
mongoose_1.default.connect(process.env.MONGO_URI, {
// Устаревшие параметры убраны, оставляем подключение по умолчанию
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Настройки Express
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Маршруты
// app.use('/api/auth', authRoutes);
// app.use('/api/chat', chatRoutes);
// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
