import db from './../db/db.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from './../config.js'

const generateAccessTocken = (id, role) => {
  const payload = {
    id, role
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
      const { email, password, role } = req.body
      const guest = await db.query(`SELECT * from users WHERE email='${email}'`)

      if (guest.rows.length) {
        return res.status(400).json({massage: 'Пользователь уже существует'})
      }

      const hashPassword = bcrypt.hashSync(password, 8);

      const roleId = await getRolesId(role)

      const newUser = await db.query(`INSERT INTO users (email, role_id, password) values ($1, $2, $3) RETURNING *`, [email, roleId, hashPassword])
      res.status(200).json(newUser.rows[0])
    } catch (error) {
      console.log(error);
      res.status(400).json({massage: 'somthing went wrong'})
    }
  }

  async login (req, res) {
    try {
      const currentUser = await db.query(`SELECT * from users WHERE email='${req.body.email}'`)

      if (!currentUser || !currentUser.rows.length) {
        res.status(404).json({massage: 'Пользователь не найден'})
      }

      const isPasworValid = bcrypt.compareSync(req.body.password, currentUser.rows[0].password);

      if (!isPasworValid) {
        return res.status(404).json({massage: 'Пароль не верен'})
      }

      const token = generateAccessTocken(currentUser.rows[0].id, await getRoleById(currentUser.rows[0].role_id))
      res.status(200).json({token})
    } catch (error) {
      console.log(error);
      res.status(400).json({massage: 'somthing went wrong'})
    }
  }

  async getUsers (req, res) {
    try {
      const users = await db.query(`SELECT * from users`)
      res.status(200).json(users.rows)
    } catch (error) {
      console.log(error);
    }
  }

  async getRoles (req, res) {
    try {
      const roles = await db.query(`SELECT * from roles`)
      res.status(200).json(roles.rows)
    } catch (error) {
      console.log(error);
    }
  }
}

async function getRolesId(roleName) {
  try {
    const roleId = await db.query(`SELECT * from roles WHERE value='${roleName}'`)
    return roleId.rows[0].id || 2
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
