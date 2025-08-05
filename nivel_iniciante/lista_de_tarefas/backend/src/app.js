import express from 'express';
import { configureMiddlewares } from './middlewares/app.middlewares.js';

const app = express()

configureMiddlewares(app)

export const Server = () => {
    app.listen(3333, () => {
        console.log('Servidor rodando na porta 3333')
    })
}