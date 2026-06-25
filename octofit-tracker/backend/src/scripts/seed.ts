import mongoose from 'mongoose'
import { User } from '../models/user.model.js'
import { Team } from '../models/team.model.js'
import { Activity } from '../models/activity.model.js'
import { Workout } from '../models/workout.model.js'
import { LeaderboardEntry } from '../models/leaderboard.model.js'

// Seed the octofit_db database with test data
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

const users = [
  { username: 'alexfit', email: 'alex@octofit.dev', displayName: 'Alex Mercer' },
  { username: 'kiara2', email: 'kiara@octofit.dev', displayName: 'Kiara Cole' },
  { username: 'samrun', email: 'sam@octofit.dev', displayName: 'Sam Rivers' }
]

const teams = [
  { name: 'Velocity Vikings', description: 'Top sprint and endurance crew' },
  { name: 'Wellness Warriors', description: 'Balanced training and recovery team' }
]

const activities = [
  { type: 'running', durationMinutes: 35, caloriesBurned: 380 },
  { type: 'cycling', durationMinutes: 50, caloriesBurned: 520 },
  { type: 'yoga', durationMinutes: 45, caloriesBurned: 180 }
]

const workouts = [
  { title: 'Sprint Intervals', description: 'High-intensity interval run session', durationMinutes: 30, intensity: 'high', completed: false },
  { title: 'Recovery Ride', description: 'Easy spin for active recovery', durationMinutes: 40, intensity: 'low', completed: false },
  { title: 'Strength Circuit', description: 'Bodyweight strength and core routine', durationMinutes: 35, intensity: 'medium', completed: true }
]

const leaderboard = [
  { rank: 1, score: 1680, points: 325 },
  { rank: 2, score: 1525, points: 295 },
  { rank: 3, score: 1380, points: 270 }
]

const seedDatabase = async () => {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB for seeding:', MONGO_URI)

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({})
  ])

  const createdUsers = await User.insertMany(users)
  const createdTeams = await Team.insertMany(teams)

  createdTeams[0].memberIds = [createdUsers[0]._id, createdUsers[1]._id]
  createdTeams[1].memberIds = [createdUsers[1]._id, createdUsers[2]._id]
  await createdTeams[0].save()
  await createdTeams[1].save()

  const createdActivities = await Activity.insertMany([
    { ...activities[0], userId: createdUsers[0]._id },
    { ...activities[1], userId: createdUsers[1]._id },
    { ...activities[2], userId: createdUsers[2]._id }
  ])

  const createdWorkouts = await Workout.insertMany([
    { ...workouts[0], userId: createdUsers[0]._id, scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24) },
    { ...workouts[1], userId: createdUsers[1]._id, scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 48) },
    { ...workouts[2], userId: createdUsers[2]._id, scheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 2) }
  ])

  await LeaderboardEntry.insertMany([
    { ...leaderboard[0], userId: createdUsers[0]._id },
    { ...leaderboard[1], userId: createdUsers[1]._id },
    { ...leaderboard[2], userId: createdUsers[2]._id }
  ])

  console.log('Seed data created:')
  console.log('users:', createdUsers.length)
  console.log('teams:', createdTeams.length)
  console.log('activities:', createdActivities.length)
  console.log('workouts:', createdWorkouts.length)
  console.log('leaderboard entries:', leaderboard.length)

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB after seeding')
}

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
