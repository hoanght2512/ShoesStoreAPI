import { Request, Response, Router } from 'express'

const productRoutes = Router()

productRoutes.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default productRoutes
