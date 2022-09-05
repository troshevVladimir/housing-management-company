import { Router } from 'express'
import { getAll, create, remove, update } from './controllers/houses.js'

const router = Router()

router.get('/api/houses/', getAll)
router.post('/api/houses/', create)
router.delete('/api/houses/:id', remove)
router.put('/api/houses/:id', update)

export default router