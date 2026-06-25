import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  teamIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  createdAt: { type: Date, default: () => new Date() }
})

export const User = mongoose.model('User', UserSchema)
