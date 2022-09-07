import jwt from 'jsonwebtoken'
import config from './../config.js'


export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(400).json({massage: 'You not authorazed'})
    }

    let decodedData

    try {
      decodedData = jwt.verify(token, config.secret)
    } catch (error) {
      return res.status(400).json({massage: 'invalid token'})
    }

    req.user = decodedData
    next()
  } catch (error) {
    console.log(error);
  }
}