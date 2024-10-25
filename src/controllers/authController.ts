import { NextFunction, Request, Response } from 'express'
import { generateToken, sendErrorResponse, sendMessageResponse } from '../utils'
import User from '../models/User'
import bcrypt from 'bcrypt'

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body

  if (!username)
    return sendErrorResponse(res, 400, 'Tài khoản không được để trống!')
  if (!password)
    return sendErrorResponse(res, 400, 'Mật khẩu không được để trống!')

  try {
    const findUser = await User.findOne({
      $or: [{ username }, { email: username }],
    })

    if (!findUser)
      return sendErrorResponse(
        res,
        401,
        'Tài khoản hoặc mật khẩu không chính xác!'
      )

    const passwordMatch = await bcrypt.compare(password, findUser.password)
    if (!passwordMatch)
      return sendErrorResponse(
        res,
        401,
        'Tài khoản hoặc mật khẩu không chính xác!'
      )

    const token = generateToken(findUser._id as string)

    const data = {
      username: findUser.username,
      email: findUser.email,
      phone: findUser.phone,
      full_name: findUser.fullName,
      access_token: token,
    }

    sendMessageResponse(res, 200, 'Đăng nhập thành công!', data)
  } catch (e) {
    next(e)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, phone, full_name } = req.body

  if (!username)
    return sendErrorResponse(res, 400, 'Tài khoản không được để trống!')
  if (!email) return sendErrorResponse(res, 400, 'Email không được để trống!')
  if (!password)
    return sendErrorResponse(res, 400, 'Mật khẩu không được để trống!')
  if (!phone)
    return sendErrorResponse(res, 400, 'Số điện thoại không được để trống!')
  if (!full_name)
    return sendErrorResponse(res, 400, 'Họ và tên không được để trống!')

  try {
    const findUser = await User.findOne({
      $or: [{ username }, { email }, { phone }],
    })

    if (findUser) {
      if (findUser.username === username)
        return sendErrorResponse(res, 409, 'Tài khoản đã tồn tại!')
      if (findUser.email === email)
        return sendErrorResponse(res, 409, 'Email đã tồn tại!')
      if (findUser.phone === phone)
        return sendErrorResponse(res, 409, 'Số điện thoại đã tồn tại!')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName: full_name,
      phone,
      primaryAddress: null,
      addresses: [],
    })

    await newUser.save()
    sendMessageResponse(res, 201, 'Đăng ký tài khoản thành công!')
  } catch (e) {
    next(e)
  }
}

export { login, register }
