import { Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash'
import Search from './pages/Search'
import Results from './pages/Results'
import Details from './pages/Details'
import Favourites from './utils/Favourites'
import Advanced from './pages/Advanced'


/*adding routes for all other files*/
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes> 
        <Route path="/" element={<Splash />} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
        <Route path="/details/:id" element={<Details />} /> 
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/advanced" element={<Advanced />} />
      </Routes> 
      
    </div>
  )
}