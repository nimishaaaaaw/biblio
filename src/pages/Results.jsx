import BookCard from "../components/BookCard"
import ErrorMessage from "../components/ErrorMessage"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/Results.css"

export default function Results() {
  const [params] = useSearchParams()
  const query = params.toString()
  const navigate = useNavigate()

  const [books, setBooks] = useState([])
  const [visibleBooks, setVisibleBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [chunkIndex, setChunkIndex] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(false)

  const CHUNK_SIZE = 20
  const API_PAGE_SIZE = 100

  useEffect(() => {
    // if there's no search query, go back to the search page
    if (!query) {
      navigate("/search")
      return
    }

    // reset all state when the query changes
    setBooks([])
    setVisibleBooks([])
    setPage(1)
    setChunkIndex(1)
    setHasMore(true)
    setError(false)
  }, [query, navigate])

  useEffect(() => {
    // fetching books from the api
    async function fetchBooks() {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(
          `https://openlibrary.org/search.json?${query}&page=${page}`
        )
        const data = await res.json()

        if (!data.docs || data.docs.length === 0) {
          // if first page had no results, show no results
          if (page === 1) {
            setVisibleBooks([])
            setHasMore(false)
          } else {
            setHasMore(false)
          }
          return
        }

        // adding new books to the existing list
        setBooks((prev) => [...prev, ...data.docs])

        // showing the first chunk of 20 books when the page loads
        if (page === 1) {
          setVisibleBooks(data.docs.slice(0, CHUNK_SIZE))
        }
      } catch (err) {
        // handle network errors
        console.error("Error fetching books:", err)
        setError(true)
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [page, query])

  function handleLoadMore() {
    const totalShown = chunkIndex * CHUNK_SIZE
    // if there are more books in the current list, show the next chunk
    if (totalShown < books.length) {
      setVisibleBooks(books.slice(0, totalShown + CHUNK_SIZE))
      setChunkIndex((c) => c + 1)
      // if we've shown all the current books, fetch the next page from the api
    } else if (books.length >= page * API_PAGE_SIZE && hasMore) {
      setPage((p) => p + 1)
      setChunkIndex(1)
    } else {
      // no more books to show
      setHasMore(false)
    }
  }

  return (
    <div className="results">
      <div className="results-header">
        <button className="results-back" onClick={() => navigate("/search")}>
          back
        </button>
        <h1 className="results-title">Biblio</h1>
        <div style={{ width: "100px" }}></div> {/* Spacer */}
      </div>

      <p className="results-subtitle">Results</p>

      {error && (
        <ErrorMessage
          message="Network issue. Please check your connection."
          onRetry={() => setPage((p) => p)} // trivial retry
          onBack={() => navigate("/search")}
        />
      )}

      {loading && visibleBooks.length === 0 && !error && (
        <div className="results-spinner">
          <div></div>
        </div>
      )}

      {!error && visibleBooks.length > 0 && (
        <>
          <div className="results-grid">
            {visibleBooks.map((book, i) => (
              <BookCard
                key={book.key ?? book.cover_edition_key ?? i}
                book={book}
              />
            ))}
          </div>

          {hasMore && (
            <button
              className="results-showmore"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Show More"}
            </button>
          )}
        </>
      )}

      {!loading && !error && visibleBooks.length === 0 && (
        <ErrorMessage
          message={`No results found for "${query}".`}
          onBack={() => navigate("/search")}
        />
      )}
    </div>
  )
}