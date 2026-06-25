import { useEffect, useState } from 'react'

interface Workout {
  _id: string
  userId: string
  title: string
  description: string
  durationMinutes: number
  intensity: string
  scheduledFor: string
  completed: boolean
}

const buildApiUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME
  const host = codeSpaceName
    ? `https://${codeSpaceName}-8000.app.github.dev`
    : 'http://localhost:8000'
  return `${host}/api/workouts/`
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(buildApiUrl())
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(Array.isArray(data?.data) ? data.data : [])
      })
      .catch((err) => {
        setError(String(err))
      })
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <strong>{workout.title}</strong> — {workout.intensity} — {workout.durationMinutes} min
            <div>{workout.description}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
