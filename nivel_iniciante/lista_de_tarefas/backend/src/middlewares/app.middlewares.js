import express from 'express'
import cors from 'cors'

const configureMiddlewares = (app) => {
    app.use(cors({
        'origin': '*',
        'methods': ['GET', 'POST', 'PUT', 'DELETE'],
        'allowedHeaders': ['Content-Type', 'Authorization']
    }))

    app.use(express.json())
}

export { configureMiddlewares }