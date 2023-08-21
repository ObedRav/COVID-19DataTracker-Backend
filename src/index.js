// modules
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import helmetCsp from 'helmet-csp';
import https from 'https';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import csrf from 'csurf'; // Import the csurf middleware
import cookieParser from 'cookie-parser';
// import routers
import test from './routes/test.js';

// Load the env variables
dotenv.config();

// Obtaining env variables
const PORT = process.env.PORT ?? 5000;

// declaring current environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creating app
const app = express();

// Middleware json
app.use(express.json());

// Config CORS
const corsOptions = {
  origin: '*', // Set the allowed origin(s)
  methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  credentials: true // Enable sending cookies from the client
};

// Using cors
app.use(cors(corsOptions));

// Add Security for common vulnerabilities
app.use(helmet());

// Configure CSP
app.use(
  helmetCsp({
    directives: {
      defaultSrc: ["'none'"],
      frameAncestors: ["'none'"],
      formAction: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  })
);

// Apply cache-control middleware
app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

// Adding secure protocol
const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, '../SSL_Certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../SSL_Certificates/server.cert'))
};

// creating the secure protocol server
const server = https.createServer(serverOptions, app);

app.use(cookieParser());

// CSRF protection
app.use(csrf({ cookie: true }));

app.use('/api', test);

// handle server startup errors
server.on('error', (error) => {
  console.error('Server startup error:', error);
});

// https server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
