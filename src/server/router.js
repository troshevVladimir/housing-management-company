import { Router } from 'express'
import { getAll, create, remove, update } from './controllers/houses.js'
import AuthController from './controllers/auth.js'
import { body } from 'express-validator'
import authUsers from "./middlewaree/authUsers.js"

const router = Router()

router.get('/api/houses/', getAll)
router.post('/api/houses/', create)
router.delete('/api/houses/:id', remove)
router.put('/api/houses/:id', update)

router.post('/api/auth/registration', [
  body('email', 'Неправильный формат Email').isEmail(),
  body('password', 'Ошибка в пароле min: 5 , max: 40').isLength({ min: 5 , max: 40}),
], AuthController.registration)
router.post('/api/auth/login', AuthController.login)
router.get('/api/auth/getusers', authUsers, AuthController.getUsers)
router.get('/api/auth/getUserRoles', authUsers, AuthController.getRoles)

export default router