import jwt from 'jsonwebtoken'
import config from '../config.js'


export default function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.headers.authorization?.split(' ')[1]

      console.log(token);

      if (!token) {
        return res.status(400).json({message: 'Вы не авторизованы'})
      }

      try {
        const { role } = jwt.verify(token, config.secret)

        if (Array.isArray(roles) && !roles.includes(role)) {
          return res.status(400).json({message: 'У вас нет доступа до этой операции'})
        }

      } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'invalid token or token has been expired'})
      }

      next()
    } catch (error) {
      console.log(error);
    }
  }
}