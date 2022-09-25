import jwt from 'jsonwebtoken'
import config from './../config.js'


export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'You not authorazed' })
    }

    let decodedData

    try {
      decodedData = jwt.verify(token, config.secret)
    } catch (error) {
      return res.status(401).json({ message: 'Вы не авторизованы' })
    }

    req.user = decodedData
    next()
  } catch (error) {
    console.log(error);
  }
}