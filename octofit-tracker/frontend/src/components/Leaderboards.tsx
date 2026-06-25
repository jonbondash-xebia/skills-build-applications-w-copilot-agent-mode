import { useEffect, useState } from 'react'

interface LeaderboardEntry {
  _id: string
  userId: string
  rank: number
  score: number
  points: number
}

const buildApiUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME
  const host = codeSpaceName
    ? `https://${codeSpaceName}-8000.app.github.dev`
    : 'http://localhost:8000'
  return `${host}/api/leaderboard/`
}

export default function Leaderboards() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(buildApiUrl())
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(Array.isArray(data?.data) ? data.data : [])
      })
      .catch((err) => {
        setError(String(err))
      })
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <ol>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            Rank {entry.rank}: {entry.score} pts ({entry.points} points)
          </li>
        ))}
      </ol>
    </section>
  )
}
