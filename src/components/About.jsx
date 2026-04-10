function pickCellEdges(cols, rows, density) {
  const vertical = []
  const horizontal = []

  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (Math.random() > density) continue
      const x = (c / cols) * 100
      const y1 = (r / rows) * 100
      const y2 = ((r + 1) / rows) * 100
      vertical.push({ x1: x, y1, x2: x, y2 })
    }
  }

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > density) continue
      const y = (r / rows) * 100
      const x1 = (c / cols) * 100
      const x2 = ((c + 1) / cols) * 100
      horizontal.push({ x1, y1: y, x2, y2: y })
    }
  }

  return { vertical, horizontal }
}

function buildAboutGridLines() {
  const { vertical, horizontal } = pickCellEdges(18, 12, 0.42)
  return [...vertical, ...horizontal].map((coords) => ({
    ...coords,
    delay: Math.random() * 14,
    duration: 3.5 + Math.random() * 3.5,
    peak: 0.55 + Math.random() * 0.4,
  }))
}

let aboutGridLinesCache = null

function getAboutGridLines() {
  if (aboutGridLinesCache === null) {
    aboutGridLinesCache = buildAboutGridLines()
  }
  return aboutGridLinesCache
}

function AboutGridBackdrop() {
  const lines = getAboutGridLines()

  return (
    <div className="jb-about__grid-wrap" aria-hidden="true">
      <svg
        className="jb-about__grid-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {lines.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className="jb-about__grid-line"
            style={{
              animationDelay: `${line.delay}s`,
              animationDuration: `${line.duration}s`,
              '--jb-grid-peak': String(line.peak),
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function About() {
  return (
    <section className="jb-section jb-about" id="about" aria-labelledby="about-title">
      <AboutGridBackdrop />
      <div className="jb-about__content jb-section__head">
        <p className="jb-section__eyebrow">About</p>
        <h2 id="about-title" className="jb-section__title">
          One platform, four core systems
        </h2>
        <p className="jb-section__desc">
          <strong>Prediction creation</strong> — users define category, event, and
          stake; posts surface in a live feed.{' '}
          <strong>Bet acceptance</strong> — a counterparty matches the wager; both
          fund escrow and the contract is live.{' '}
          <strong>Escrow &amp; resolution</strong> — trusted data settles outcomes;
          winners receive payouts after fees.{' '}
          <strong>Social layer</strong> — comments, follows, history, and leaderboards
          turn predictions into community and credibility.
        </p>
        <p className="jb-section__desc jb-about__extra">
          Categories can span sports (NFL, NBA, soccer, college), esports (LoL,
          CS2, Valorant, Dota), entertainment, politics, and more—availability
          depends on legal compliance and region. Long-term vision: a global
          prediction network where collective forecasting data itself becomes
          valuable.
        </p>
      </div>
    </section>
  )
}

