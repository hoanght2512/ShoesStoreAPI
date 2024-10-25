import { Response } from 'express'
import { verifyToken, generateToken } from './jwtUtils'
import errorHandler from './errorHandler'

const sendMessageResponse = (
  res: Response,
  status: number,
  message?: string,
  data?: any
) => {
  res.status(status).json({
    status,
    message,
    data,
  })
}

const sendErrorResponse = (res: Response, status: number, error: string) => {
  res.status(status).json({
    status,
    error,
  })
}

export {
  sendMessageResponse,
  sendErrorResponse,
  verifyToken,
  generateToken,
  errorHandler,
}
