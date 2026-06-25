import mongoose from 'mongoose'

const LeaderboardEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  points: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
})

export const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema)
