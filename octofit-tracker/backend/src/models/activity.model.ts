import mongoose from 'mongoose'

const ActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  timestamp: { type: Date, default: () => new Date() }
})

export const Activity = mongoose.model('Activity', ActivitySchema)
