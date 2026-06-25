import mongoose from 'mongoose'

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  scheduledFor: { type: Date, required: true },
  completed: { type: Boolean, default: false }
})

export const Workout = mongoose.model('Workout', WorkoutSchema)
