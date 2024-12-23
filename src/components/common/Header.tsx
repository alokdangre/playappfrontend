import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon, UserCircleIcon, MenuIcon, UploadIcon } from '@heroicons/react/solid'
import { useAuthContext } from '../../context/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuthContext()

  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">VidShare</Link>
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-secondary text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <SearchIcon className="h-6 w-6 text-accent cursor-pointer" />
        </div>
        <nav className="hidden md:flex space-x-4">
          {user ? (
            <>
              <Link to="/upload" className="hover:text-accent flex items-center">
                <UploadIcon className="h-5 w-5 mr-1" />
                Upload
              </Link>
              <Link to={`/user/${user.username}`} className="hover:text-accent flex items-center">
                <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
                {user.username}
              </Link>
              <button onClick={logout} className="hover:text-accent">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-accent">Login</Link>
          )}
        </nav>
        <div className="md:hidden">
          <MenuIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-secondary text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent w-full mb-4"
          />
          <nav className="flex flex-col space-y-2">
            {user ? (
              <>
                <Link to="/upload" className="hover:text-accent">Upload</Link>
                <Link to={`/user/${user.username}`} className="hover:text-accent">Profile</Link>
                <button onClick={logout} className="hover:text-accent text-left">Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-accent">Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

