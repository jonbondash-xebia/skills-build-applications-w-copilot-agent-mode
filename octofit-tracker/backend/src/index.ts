import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit'

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV ?? 'development' })
})

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' })
})

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB:', MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
