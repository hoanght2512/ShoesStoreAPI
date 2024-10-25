import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1]

  if (!token)
    return res.status(401).json({ status: 401, message: 'Unauthorized' })

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err)
      return res.status(401).json({ status: 401, message: 'Unauthorized' })
    next()
  })
}

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

export { verifyToken, generateToken }
