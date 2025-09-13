import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import "../styles/Splash.css"
export default function Splash() {
  const nav = useNavigate()

  useEffect(() => {
    // a timer to navigate to the search page after a delay of 3s
    const timer = setTimeout(() => {
      nav("/search")
    }, 3000)
    // clearing the timer if the component unmounts
    return () => clearTimeout(timer)
  }, [nav])

  return (
    <div>
      <h1 className="splash-title">Biblio</h1>
      <p className="splash-tagline">Your book, found.</p>
      <img src={logo} alt="Book stack logo" className="splash-logo" />
    </div>
  )
}