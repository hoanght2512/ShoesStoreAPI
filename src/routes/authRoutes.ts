import { NextFunction, Request, Response, Router } from 'express'
import { login, register } from '../controllers/authController'

const authRoutes = Router()

authRoutes.post('/login', (req: Request, res: Response, next: NextFunction) => {
  login(req, res, next)
})

authRoutes.post(
  '/register',
  (req: Request, res: Response, next: NextFunction) => {
    register(req, res, next)
  }
)

export default authRoutes
