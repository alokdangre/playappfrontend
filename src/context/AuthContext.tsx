import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

interface User {
  username: string
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  register: (username: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('/api/users/current-user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user)
      })
      .catch(error => {
        console.error('Error fetching user:', error)
        localStorage.removeItem('token')
      })
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/users/login', { username, password })
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post('/api/users/register', { username, email, password })
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

