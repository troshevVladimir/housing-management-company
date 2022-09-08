import { Router } from 'express'
import { getAll, create, remove, update } from './controllers/houses.js'
import AuthController from './controllers/auth.js'
import { body } from 'express-validator'
import authUsers from "./middlewaree/authUsers.js"
import rolesHasAccess from "./middlewaree/rolesHasAccess.js"

const router = Router()

router.get('/api/houses/', authUsers, getAll)
router.post('/api/houses/', rolesHasAccess(['admin', 'author']), create)
router.delete('/api/houses/:id', rolesHasAccess(['admin', 'author']), remove)
router.put('/api/houses/:id', rolesHasAccess(['admin', 'author']), update)

router.post('/api/auth/registration', [
  body('email', 'Неправильный формат Email').isEmail(),
  body('password', 'Ошибка в пароле min: 5 , max: 40').isLength({ min: 5 , max: 40}),
], AuthController.registration)
router.post('/api/auth/login', AuthController.login)
router.get('/api/auth/getusers', rolesHasAccess(['admin', 'author']), AuthController.getUsers)
router.get('/api/auth/getUserRoles', rolesHasAccess(['admin', 'author']), AuthController.getRoles)

export default router