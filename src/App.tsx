import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './components/theme-provider'
import { Header } from './components/common/Header'
import HomePage from './pages/HomePage'
import VideoPage from './pages/VideoPage'
import UserProfilePage from './pages/UserProfilePage'
import UploadPage from './pages/UploadPage'
import SearchResultsPage from './pages/SearchResultsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vidshare-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="/video/:id" element={<PrivateRoute><VideoPage /></PrivateRoute>} />
              <Route path="/user/:username" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
              <Route path="/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
              <Route path="/search" element={<PrivateRoute><SearchResultsPage /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

