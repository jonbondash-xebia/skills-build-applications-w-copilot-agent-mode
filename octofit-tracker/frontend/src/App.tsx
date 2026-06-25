import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.tsx'
import Leaderboards from './components/Leaderboards.tsx'
import Teams from './components/Teams.tsx'
import Users from './components/Users.tsx'
import Workouts from './components/Workouts.tsx'
import './App.css'

const apiHost = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>
          This app uses <code>VITE_CODESPACE_NAME</code> for Codespaces API URL support.
          If it is unset, the app falls back to <code>http://localhost:8000</code>.
        </p>
        <nav>
          <Link to="/">Users</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>

      <main>
        <section className="api-info">
          <div>API host: {apiHost}</div>
          <div>
            Example endpoint: {apiHost}/api/users/
          </div>
        </section>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboards />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
