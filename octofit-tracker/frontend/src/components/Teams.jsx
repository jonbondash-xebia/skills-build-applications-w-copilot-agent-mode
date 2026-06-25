import { useEffect, useState } from 'react'

const buildApiUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME
  return codeSpaceName
    ? `https://${codeSpaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'
}

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(buildApiUrl())
      .then((res) => res.json())
      .then((data) => {
        setTeams(Array.isArray(data?.data) ? data.data : [])
      })
      .catch((err) => {
        setError(String(err))
      })
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            <strong>{team.name}</strong>: {team.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
