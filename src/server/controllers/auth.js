import db from './../db/db.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from './../config.js'

const generateAccessTocken = (id, role, userName) => {
  const payload = {
    id, role, userName
  }
  return jwt.sign(payload, config.secret, {expiresIn: '24h'})
}

class AuthController {
  async registration(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors})
    }

    try {
      const defaultRole = 'admin'
      const { email, password } = req.body
      const guest = await db.query(`SELECT * from users WHERE email='${email}'`)
      const role = await getRolesId(defaultRole)

      if (guest.rows.length) {
        return res.status(400).json({message: 'Пользователь уже существует'})
      }

      const hashPassword = bcrypt.hashSync(password, 8);

      const newUser = await db.query(`INSERT INTO users (email, role_id, password) values ($1, $2, $3) RETURNING *`, [email, role, hashPassword])
      const token = generateAccessTocken(newUser.rows[0].id, defaultRole, newUser.rows[0].email)
      return res.status(200).json({token})
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: 'Что-то пошло не так'})
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const currentUser = await db.query(`SELECT * from users WHERE email='${email}'`)

      if (!currentUser || !currentUser.rows.length) {
        return res.status(404).json({message: 'Пользователь не найден'})
      }

      const isPasworValid = bcrypt.compareSync(password, currentUser.rows[0].password);

      if (!isPasworValid) {
        return res.status(404).json({message: 'Пароль не верен'})
      }

      const role = await getRoleById(currentUser.rows[0].role_id)
      const token = generateAccessTocken(currentUser.rows[0].id, role, currentUser.rows[0].email)

      return res.status(200).json({token})
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: 'Что-то пошло не так'})
    }
  }

  async getUsers (req, res) {
    try {
      const users = await db.query(`SELECT * from users`)
      return res.status(200).json(users.rows)
    } catch (error) {
      console.log(error);
    }
  }
}

async function getRolesId(roleName) {
  try {
    const roleId = await db.query(`SELECT * from roles WHERE value='${roleName}'`)
    return roleId.rows[0].id
  } catch (error) {
    console.log(error);
  }
}

async function getRoleById(roleId) {
  try {
    const role = await db.query(`SELECT * from roles WHERE id='${roleId}'`)
    return role.rows[0].value
  } catch (error) {
    console.log(error);
  }
}

export default new AuthController()
