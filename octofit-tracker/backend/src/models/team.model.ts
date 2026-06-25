import mongoose from 'mongoose'

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
})

export const Team = mongoose.model('Team', TeamSchema)
