import db from './../db/db.js'


class UsersConroller {
  async getUsers(req, res) {
    try {
      const roles = await db.query(`SELECT * from roles`)
      const users = await db.query(`SELECT * from users`)
      users.rows.map(user => {
        user.role = roles.rows.find(role => {
          return role.id == user.role_id
        })?.value
        return user
      })
      return res.status(200).json(users.rows)
    } catch (error) {
      console.log(error);
    }
  }

  async getRoles (req, res) {
    try {
      const roles = await db.query(`SELECT * from roles`)
      return res.status(200).json(roles.rows)
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(req, res) {
    try {
      const roleId = await getRolesId(req.body.role)
      const refreshUser = await db.query(`UPDATE users SET role_id=${roleId} WHERE id=${req.body.userId} RETURNING *;`)

      return res.status(200).json(refreshUser.rows[0])
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

export default new UsersConroller()