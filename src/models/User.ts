import { Schema, model, Document, Types } from 'mongoose'

interface IAddress extends Document {
  _id: Types.ObjectId
  street: string
  city: string
  country: string
}

interface IUser extends Document {
  username: string
  email: string
  password: string
  fullName: string
  phone: string
  primaryAddress: Types.ObjectId
  address: IAddress[]
}

const addressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: true }
)

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  primaryAddress: { type: Schema.Types.ObjectId, required: false },
  address: [addressSchema],
})

const User = model<IUser>('User', userSchema)

export default User
