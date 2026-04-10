import {
  PlusCircleOutlined,
  UserAddOutlined,
  LockOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'

const features = [
  {
    Icon: PlusCircleOutlined,
    title: 'Prediction creation',
    text: 'Choose category, event, and stake—straight picks, custom conditions, or multi-leg bets. Your challenge appears in the public feed for others to accept.',
  },
  {
    Icon: UserAddOutlined,
    title: 'Bet acceptance',
    text: 'When someone accepts, both sides lock funds in escrow. The wager becomes a binding peer-to-peer prediction contract until the event finishes.',
  },
  {
    Icon: LockOutlined,
    title: 'Escrow & resolution',
    text: 'Outcomes are resolved from verified data sources. The winner receives the pot minus a platform fee (e.g. 5% of the pot)—not a bet against the house.',
  },
  {
    Icon: ShareAltOutlined,
    title: 'Social layer',
    text: 'Comments, shares, follows, profiles, history, and leaderboards—so skilled predictors build reputation and the feed drives discovery and rivalry.',
  },
]

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

function buildFeaturesGridLines() {
  const { vertical, horizontal } = pickCellEdges(18, 12, 0.42)
  return [...vertical, ...horizontal].map((coords) => ({
    ...coords,
    delay: Math.random() * 14,
    duration: 3.5 + Math.random() * 3.5,
    peak: 0.55 + Math.random() * 0.4,
  }))
}

let featuresGridLinesCache = null

function getFeaturesGridLines() {
  if (featuresGridLinesCache === null) {
    featuresGridLinesCache = buildFeaturesGridLines()
  }
  return featuresGridLinesCache
}

function FeaturesGridBackdrop() {
  const lines = getFeaturesGridLines()

  return (
    <div className="jb-features-section__grid-wrap" aria-hidden="true">
      <svg
        className="jb-features-section__grid-svg"
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
            className="jb-features-section__grid-line"
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

export default function Features() {
  return (
    <section
      className="jb-section jb-features-section"
      id="why-my-pari"
      aria-labelledby="features-title"
    >
      <FeaturesGridBackdrop />
      <div className="jb-features-section__content jb-section__head">
        <p className="jb-section__eyebrow">Why MyPari</p>
        <h2 id="features-title" className="jb-section__title">
          Prediction markets meet social competition
        </h2>
        <p className="jb-section__desc">
          MyPari combines prediction markets, social mechanics, and peer-to-peer
          wagering—so forecasting is social, interactive, and head-to-head.
        </p>
      </div>
      <div className="jb-features__grid">
        {features.map((item, index) => {
          const IconComponent = item.Icon
          return (
            <article
              key={item.title}
              className="jb-feature"
              style={{ '--feature-step': index }}
            >
              <div className="jb-feature__icon" aria-hidden="true">
                <IconComponent />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
