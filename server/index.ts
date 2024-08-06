import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!, {
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Настройки Express
app.use(cors());
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
