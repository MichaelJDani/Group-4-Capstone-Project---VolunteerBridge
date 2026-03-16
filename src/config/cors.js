import { configuration } from './env.js';

export const corsOptions = {
  origin: ['http://localhost:3000'], // frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};