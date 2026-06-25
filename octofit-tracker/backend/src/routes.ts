import { Express, Request, Response } from 'express'
import { User } from './models/user.model.js'
import { Team } from './models/team.model.js'
import { Activity } from './models/activity.model.js'
import { Workout } from './models/workout.model.js'
import { LeaderboardEntry } from './models/leaderboard.model.js'

export const registerApiRoutes = (app: Express) => {
  app.get('/api/users/', async (_req: Request, res: Response) => {
    const users = await User.find().lean()
    res.json({ data: users })
  })

  app.get('/api/teams/', async (_req: Request, res: Response) => {
    const teams = await Team.find().lean()
    res.json({ data: teams })
  })

  app.get('/api/activities/', async (_req: Request, res: Response) => {
    const activities = await Activity.find().lean()
    res.json({ data: activities })
  })

  app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean()
    res.json({ data: leaderboard })
  })

  app.get('/api/workouts/', async (_req: Request, res: Response) => {
    const workouts = await Workout.find().lean()
    res.json({ data: workouts })
  })
}
