import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/common/Header'
import HomePage from './pages/HomePage'
import VideoPage from './pages/VideoPage'
import UserProfilePage from './pages/UserProfilePage'
import UploadPage from './pages/UploadPage'
import SearchResultsPage from './pages/SearchResultsPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-primary text-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/user/:username" element={<UserProfilePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

