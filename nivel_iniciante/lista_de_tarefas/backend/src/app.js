import express from 'express';
import { configureMiddlewares } from './middlewares/app.middlewares.js';
import { router } from './routes/index.js';

const app = express()

app.use(router)

configureMiddlewares(app)

export const Server = () => {
    app.listen(3333, () => {
        console.log('Servidor rodando na porta 3333')
    })
}