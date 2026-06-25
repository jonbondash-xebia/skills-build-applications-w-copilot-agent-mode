import { useEffect, useState } from 'react'

const buildApiUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME
  const host = codeSpaceName
    ? `https://${codeSpaceName}-8000.app.github.dev`
    : 'http://localhost:8000'
  return `${host}/api/activities/`
}

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(buildApiUrl())
      .then((res) => res.json())
      .then((data) => {
        setActivities(Array.isArray(data?.data) ? data.data : [])
      })
      .catch((err) => {
        setError(String(err))
      })
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.type} — {activity.durationMinutes} min — {activity.caloriesBurned} kcal on{' '}
            {new Date(activity.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </section>
  )
}
