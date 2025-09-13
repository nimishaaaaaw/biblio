import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/Details.css"
import nocover from "../assets/nocover.png"
import Spinner from "../components/Spinner.jsx" // importing the spinner file

export default function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetching book details from the api based on the id in the url
    async function fetchBook() {
      try {
        setLoading(true)
        const res = await fetch(`https://openlibrary.org/works/${id}.json`)
        const data = await res.json()
        setBook(data)
      } catch (err) {
        //for any errors during fetching
        console.error("Error fetching book details:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  if (loading) {
    // a spinner while the data is loading
    return (
      <div className="details">
        <Spinner /> {/* showing spinner instead of plain text */}
      </div>
    )
  }

  if (!book) {
    // show a message if no book is found
    return (
      <div className="details">
        <p>Book not found.</p>
        <button className="details-back" onClick={() => navigate(-1)}>
          back
        </button>
      </div>
    )
  }

  // get the book cover url, or use a default if none exists
  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : nocover

  return (
    <div className="details">
      <button className="details-back" onClick={() => navigate(-1)}>
        back
      </button>

      <h1 className="details-title">Biblio</h1>
      <p className="details-subtitle">Details</p>

      <div className="details-content">
        <img src={coverUrl} alt={book.title} className="details-cover" />

        <div className="details-info">
          <h1>{book.title}</h1>

          {book.authors && (
            <p>
              <strong>Author(s):</strong>{" "}
              {book.authors.map((a, i) => (
                <span key={i}>{a.name || a.author?.key || "Unknown"} </span>
              ))}
            </p>
          )}

          {book.first_publish_date && (
            <p>
              <strong>Published:</strong> {book.first_publish_date}
            </p>
          )}

          {book.subjects && (
            <p>
              <strong>Subjects:</strong> {book.subjects.slice(0, 8).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}