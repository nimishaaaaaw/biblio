import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import heart from "../assets/heart.svg"
import unheart from "../assets/unheart.svg"
import nocover from "../assets/nocover.png"
import "../styles/BookCard.css"

export default function BookCard({ book }) {
  const [favourite, setFavourite] = useState(false)
  const navigate = useNavigate()

  // get the cover image url from the book data or use a placeholder
  const coverId = book.cover_i
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : nocover

  // determining a unique key for the book
  const workKey = book.key
    ? book.key.replace("/works/", "")
    : book.cover_edition_key || book.edition_key?.[0] || book.id || book.title

  useEffect(() => {
    try {
      // check for the current book in local storage or not
      const favs = JSON.parse(localStorage.getItem("favourites")) || []
      setFavourite(favs.includes(workKey))
    } catch {
      // default to not a favourite if local storage is not available
      setFavourite(false)
    }
  }, [workKey])

  function toggleFavourite(e) {
    // preventing clicking the card from navigating
    e.stopPropagation()
    e.preventDefault()
    let favs = JSON.parse(localStorage.getItem("favourites")) || []

    // removing book from favourites if it's already a favourite
    if (favourite) {
      favs = favs.filter((id) => id !== workKey)
      // adding book to favourites if it's not a favourite
    } else {
      favs.push(workKey)
    }

    // updating the local storage and the state
    localStorage.setItem("favourites", JSON.stringify(favs))
    setFavourite((f) => !f)
  }

  return (
    <div
      className="results-card"
      onClick={() => navigate(`/details/${encodeURIComponent(workKey)}`)}
    >
      {/* Heart button */}
      <button
        className="results-heart"
        onClick={toggleFavourite}
        aria-label={favourite ? "Remove favourite" : "Add favourite"}
        title={favourite ? "Remove favourite" : "Add favourite"}
      >
        <img src={favourite ? heart : unheart} alt="" />
      </button>

      {/* Cover */}
      <img src={coverUrl} alt={book.title} className="results-cover" />

      {/* Title andd year */}
      <p>
        {book.title} <br /> {book.first_publish_year || "Unknown"}
      </p>
    </div>
  )
}