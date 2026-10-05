import './ProgressBar.css'

function ProgressBar({ completed, total }) {
  const percentage =
    total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <section className="progress-section">
      <div className="progress-header">
        <div>
          <h2>Bendras progresas</h2>
          <p>
            Atlikta {completed} iš {total} užduočių
          </p>
        </div>

        <span className="progress-percentage">
          {percentage}%
        </span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Bendras užduočių progresas"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  )
}

export default ProgressBar