import "../styles/Search.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import searchicon from "../assets/searchicon.svg"
import logo from "../assets/logo.png"
import ErrorMessage from "../components/ErrorMessage"

export default function Search() {
  const [title, setTitle] = useState("")
  const [showError, setShowError] = useState(false)
  const nav = useNavigate()

  function submit(e) {
    e.preventDefault()
    const q = title.trim()
    if (!q) {
      setShowError(true)
      return
    }
    nav(`/results?title=${encodeURIComponent(q)}`)
  }

  return (
    <div>
      {/* Title */}
      <h1 className="search-title">Biblio</h1>

      {/* search bar */}
      <form className="search-bar" onSubmit={submit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search Book By Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="search-button">
          <img src={searchicon} alt="Search" width="36" height="36" />
        </button>
      </form>

      {/* inline error if no inputs */}
      {showError && (
        <ErrorMessage
          message="Please enter at least one search term."
          onBack={() => setShowError(false)}
        />
      )}

      {/* advanced search button */}
      <button
        className="search-advanced"
        onClick={() => nav("/advanced")}
      >
        Advanced Search
      </button>

      {/* logo */}
      <img src={logo} alt="Book stack logo" className="search-logo" />
    </div>
  )
}