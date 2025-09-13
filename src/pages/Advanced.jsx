import "../styles/Advanced.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import searchicon from "../assets/searchicon.svg"

export default function Advanced() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [subject, setSubject] = useState("")
  const [year, setYear] = useState("")
  const [isbn, setIsbn] = useState("")

  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)

  const nav = useNavigate()

  function submit(e) {
    e.preventDefault()

    // creating a search query array
    const q = []
    // adding search terms to the query if they are not empty
    if (title.trim()) q.push(`title=${encodeURIComponent(title.trim())}`)
    if (author.trim()) q.push(`author=${encodeURIComponent(author.trim())}`)
    if (subject.trim()) q.push(`subject=${encodeURIComponent(subject.trim())}`)
    if (year.trim()) q.push(`first_publish_year=${encodeURIComponent(year.trim())}`)
    if (isbn.trim()) q.push(`isbn=${encodeURIComponent(isbn.trim())}`)

    // showing an error if no search terms are entered by user
    if (q.length === 0) {
      setError("Please enter at least one search term.")
      setShowError(true)
      return
    }

    // navigating to the results page with the new query
    nav(`/results?${q.join("&")}`)
  }

  return (
    <div className="advanced">
      <h1 className="advanced-title">Biblio</h1>

      <form onSubmit={submit}>
        <div className="advanced-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">
            <img src={searchicon} alt="Search" />
          </button>
        </div>

        <div className="advanced-input">
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit">
            <img src={searchicon} alt="Search" />
          </button>
        </div>

        <div className="advanced-input">
          <input
            type="text"
            placeholder="Genre / Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button type="submit">
            <img src={searchicon} alt="Search" />
          </button>
        </div>

        <div className="advanced-input">
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button type="submit">
            <img src={searchicon} alt="Search" />
          </button>
        </div>

        <div className="advanced-input">
          <input
            type="text"
            placeholder="Identifier (ISBN, OCLC, LCCN)"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
          <button type="submit">
            <img src={searchicon} alt="Search" />
          </button>
        </div>

        <button type="submit" className="advanced-button">
          Search
        </button>
      </form>

      {showError && (
        <ErrorMessage
          message={error}
          onBack={() => setShowError(false)}
        />
      )}
    </div>
  )
}