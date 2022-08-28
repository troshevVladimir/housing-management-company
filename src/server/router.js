import { Router } from 'express'
import { getAll, create } from './controllers/houses.js'

const router = Router()

router.get('/api/houses/', getAll)
router.post('/api/houses/', create)

export default router