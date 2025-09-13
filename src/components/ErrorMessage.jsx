import "../styles/ErrorMessage.css"
// handling errors
export default function ErrorMessage({ message, onRetry, onBack }) {
  return (
    <div className="error-message">
      <h3>⚠ Oops!</h3>
      <p>{message}</p>

      <div>
        {onRetry && (
          <button onClick={onRetry}>
            Retry
          </button>
        )}
        {onBack && (
          <button onClick={onBack}>
            Go Back
          </button>
        )}
      </div>
    </div>
  )
}