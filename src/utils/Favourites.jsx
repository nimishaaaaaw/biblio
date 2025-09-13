import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BookCard from "../components/BookCard"

// Helper function to get favourites from localStorage
// If no favourites, return empty array
function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || []
}

export default function Favourites() {
  const [favs, setFavs] = useState([]) // state to store favorite books
  const navigate = useNavigate() // allows navigation to other pages

  // when component loads, get the favourites from localStorage and set to state
  useEffect(() => {
    setFavs(getFavourites())
  }, [])

  return (
    <div className="results">
      {/* Header with back button and title */}
      <div className="results-header">
        <button className="results-back" onClick={() => navigate("/search")}>
          back
        </button>
        <h1 className="results-title">My Favourites</h1>
        <div style={{ width: "100px" }}></div> {/* spacer */}
      </div>

      {/* If no favourites, show message */}
      {favs.length === 0 ? (
        <p className="results-subtitle">No favourites yet.</p>
      ) : (
        /* Otherwise, show list of favourite books with BookCard component */
        <div className="results-grid">
          {favs.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}