<<<<<<< HEAD

import cors from 'cors';
import configuration from './env.js';
=======
import { configuration } from './env.js';
>>>>>>> main-back-up

export const corsOptions = {
  origin: ['http://localhost:3000'], // frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// export const corsOptions = {
//     origin(origin, callback) {
//         if (!origin || configuration.ALLOWED_ORIGIN.includes(origin)) {
//             return callback(null, true);
//         }

<<<<<<< HEAD
//         return callback(new Error("Not allowed by CORS"));
//     },

//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// };
=======
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
>>>>>>> main-back-up
