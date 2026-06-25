import express from 'express'
import { connectDatabase, getDatabaseUri } from './config/database.js'
import { registerApiRoutes } from './routes.js'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const CODESPACE_HOST = process.env.CODESPACE_NAME
const API_URL = process.env.API_URL ?? (CODESPACE_HOST
  ? `https://${CODESPACE_HOST}-8000.app.github.dev`
  : `http://localhost:${PORT}`)

app.use(express.json())
registerApiRoutes(app)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV ?? 'development', apiUrl: API_URL })
})

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running', apiUrl: API_URL })
})

const startServer = async () => {
  try {
    await connectDatabase()
    console.log('Using database:', getDatabaseUri())
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`)
      console.log(`API URL is ${API_URL}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
