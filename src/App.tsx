import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/video/:videoId" element={<VideoPlayer />} /> */}
              {/* <Route path="/channel/:username" element={<UserProfile />} />
              <Route path="/upload" element={<PrivateRoute><VideoUpload /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
              <Route path="/playlists" element={<PrivateRoute><Playlists /></PrivateRoute>} />
              <Route path="/liked-videos" element={<PrivateRoute><LikedVideos /></PrivateRoute>} /> */}
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white py-4 text-center">
            <p>&copy; 2023 VideoApp. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

