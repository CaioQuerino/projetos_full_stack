import  { Router } from 'express'

const router = Router()

router.post('/task/', (req, res) => create(req, res))
router.get('/tasks/', (req, res) => Read(req, res))
router.get('/task/:id', (req, res) => ReadById(req, res))
router.put('/task/:id', (req, res) => update(req, res))
router.delete('/task:id/', (req, res) => delete(req, res))

export { router }