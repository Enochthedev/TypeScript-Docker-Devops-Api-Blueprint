import { type PaginateModel, Schema, model, type Document } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import bcrypt from 'bcryptjs'

// Define the User interface
interface IUser extends Document {
  email: string
  firstName: string
  lastName: string
  password: string
  security: Schema.Types.ObjectId
  userType: 'CRITIC' | 'VIEWER'
  userName: string
  performerProfile: Schema.Types.ObjectId
  critic: Schema.Types.ObjectId
  isActive: boolean
  deletedAt: Date
  matchPasswords: (password: string) => Promise<boolean>
}

// Define the User Schema
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6 // Adjust minimum password length as needed
    },
    security: {
      type: Schema.Types.ObjectId,
      ref: 'AccountSecurity'
    },
    userType: {
      type: String,
      enum: ['CRITIC', 'VIEWER'],
      required: true,
      default: 'VIEWER'
    },
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    performerProfile: {
      type: Schema.Types.ObjectId,
      ref: 'perfomer',
      default: null
    },
    critic: {
      type: Schema.Types.ObjectId,
      ref: 'Critic' // Reference to your Creator model (if applicable)
    },
    isActive: {
      type: Boolean,
      default: true
    },
    deletedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true } // createdAt and updatedAt
)

// Hash password before saving user to database
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next(); return
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password with hashed password in database
userSchema.methods.matchPasswords = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password as string)
}

// Add pagination plugin
userSchema.plugin(paginate)

// Create and export the PaginateModel
const User: PaginateModel<IUser> = model<IUser, PaginateModel<IUser>>('User', userSchema)

export { User, type IUser }
