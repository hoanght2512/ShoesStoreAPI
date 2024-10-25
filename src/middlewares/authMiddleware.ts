import { Request, Response, NextFunction, RequestHandler } from 'express'
import { verifyToken } from '../utils'

const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const publicRoutes = [
    { path: '/api/auth/login', method: 'POST' },
    { path: '/api/auth/register', method: 'POST' },
    { path: '/api/products', method: 'GET' },
    { path: '/api/products/:id', method: 'GET' },
  ]

  const isPublicRoute = publicRoutes.some(
    (route) =>
      req.path.startsWith(route.path.replace(':id', '')) &&
      req.method === route.method
  )

  if (isPublicRoute) {
    return next()
  }

  verifyToken(req, res, next)
}

export default authMiddleware
