import express from 'express';
import { configureMiddlewares } from './middlewares/app.middlewares';

const app = express()

configureMiddlewares(app)