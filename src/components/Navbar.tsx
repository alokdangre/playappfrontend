import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">VideoApp</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {user ? (
            <>
              <Link to="/upload" className="hover:text-gray-300">Upload</Link>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link to="/subscriptions" className="hover:text-gray-300">Subscriptions</Link>
              <Link to="/playlists" className="hover:text-gray-300">Playlists</Link>
              <Link to="/liked-videos" className="hover:text-gray-300">Liked Videos</Link>
              <Link to={`/channel/${user.username}`} className="hover:text-gray-300">My Channel</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

