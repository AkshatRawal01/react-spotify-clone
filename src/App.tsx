import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PlayerProvider } from './contexts/PlayerContext'
import { PlaylistProvider } from './contexts/PlaylistContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Library from './pages/Library'
import Playlist from './pages/Playlist'
import Album from './pages/Album'
import Artist from './pages/Artist'
import Genre from './pages/Genre'

function App() {
  return (
    <PlayerProvider>
      <PlaylistProvider>
        <Router>
          <div className="flex h-screen bg-spotify-dark">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/genre/:id" element={<Genre />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </PlaylistProvider>
    </PlayerProvider>
  )
}

export default App 