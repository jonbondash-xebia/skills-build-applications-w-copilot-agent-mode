import { useEffect, useState } from 'react'

interface User {
  _id: string
  username: string
  email: string
  displayName: string
}

const buildApiUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME
  const host = codeSpaceName
    ? `https://${codeSpaceName}-8000.app.github.dev`
    : 'http://localhost:8000'
  return `${host}/api/users/`
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(buildApiUrl())
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data?.data) ? data.data : [])
      })
      .catch((err) => {
        setError(String(err))
      })
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.displayName}</strong> ({user.username}) — {user.email}
          </li>
        ))}
      </ul>
    </section>
  )
}
