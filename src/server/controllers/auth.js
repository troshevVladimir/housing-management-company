import db from './../db/db.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from './../config.js'

async function generateTokens (id, role, userName) {
  const payload = {
    id, role, userName
  }
  const accessToken = jwt.sign(payload, config.secret, { expiresIn: '10s' })
  const refreshToken = jwt.sign(payload, config.secretRefresh, { expiresIn: '24h' })

  await db.query(`UPDATE users SET refresh_token='${refreshToken}' WHERE id='${id}'`)

  return { accessToken, refreshToken }
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
      const tokens = await generateTokens(newUser.rows[0].id, defaultRole, newUser.rows[0].email)
      return res.status(200).json(tokens)
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: 'somthing went wrong'})
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
      const tokens = await generateTokens(currentUser.rows[0].id, role, currentUser.rows[0].email)

      return res.status(200).json(tokens)
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: 'somthing went wrong'})
    }
  }

  async logout (req, res) {
    try {
      await db.query(`UPDATE users SET refresh_token='' WHERE id=${req.id} RETURNING *;`)

      return res.send("Logout successful");
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: 'somthing went wrong'})
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

  async tokenRefresh(req, res) {
    const { refreshToken, email } = req.body;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const user = await db.query(`SELECT * from users WHERE email='${email}' RETURNING *;`)

    if (!user || !user.refresh_token) {
      return res.sendStatus(401);
    }

    jwt.verify(refreshToken, config.secretRefresh, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

      res.json({
        accessToken
      })
    })
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
