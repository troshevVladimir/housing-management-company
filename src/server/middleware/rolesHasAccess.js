import jwt from 'jsonwebtoken'
import config from '../config.js'


export default function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.headers.authorization?.split(' ')[1]

      if (!token) {
        return res.status(400).json({message: 'You not authorazed'})
      }

      try {
        const { role } = jwt.verify(token, config.secret)

        if (Array.isArray(roles) && !roles.includes(role)) {
          return res.status(400).json({message: 'You not have access'})
        }

      } catch (error) {
        return res.status(401).json({ message: 'invalid token or token has been expired' })
      }

      next()
    } catch (error) {
      console.log(error);
    }
  }
}