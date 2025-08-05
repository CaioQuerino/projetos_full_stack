import  { Router } from 'express'
import { TaskController } from '../controllers/task.controller.js'

const taskController = new TaskController() 
const router = Router()

router.post('/task/', (req, res) => taskController.create(req, res))
router.get('/tasks/', (req, res) => taskController.read(req, res))
router.get('/task/:id', (req, res) => taskController.readById(req, res))
router.put('/task/:id', (req, res) => taskController.update(req, res))
router.delete('/task:id/', (req, res) => taskController.delete(req, res))

export { router }