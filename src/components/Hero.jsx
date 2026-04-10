import { Link } from 'react-router-dom'

export default function Hero() {
  const stars = Array.from({ length: 42 }, (_, i) => {
    const x = ((i * 37) % 96) + 2
    const y = ((i * 53) % 82) + 8
    const delay = ((i * 29) % 45) / 10
    const size = i % 3 === 0 ? 3 : 1.5
    return { x, y, delay, size }
  })

  return (
    <section className="jb-hero" aria-labelledby="hero-title">
      <div className="jb-stars jb-stars--hero" aria-hidden="true">
        {stars.map((i) => (
          <span
            key={`${i.x}-${i.y}-${i.delay}`}
            className="jb-stars__dot"
            style={{
              '--star-x': `${i.x}%`,
              '--star-y': `${i.y}%`,
              '--star-delay': `${i.delay}s`,
              '--star-size': `${i.size}px`,
            }}
          />
        ))}
      </div>
      <div>
        <p className="jb-hero__badge">Social feed • P2P contracts • Escrow-backed</p>
        <h1 id="hero-title">
          Wagers against
          <span className="jb-hero__accent">each other</span>
          — not the house
        </h1>
        <p className="jb-hero__lead">
          MyPari is a social prediction market: post challenges in a public feed,
          accept others’ predictions, and lock funds in escrow. When events settle,
          verified outcomes release the pot—minus a small platform fee. You compete
          on reads and reputation, not against a sportsbook’s edge.
        </p>
        <div className="jb-hero__ctas">
          <Link to="/#waitlist" className="jb-btn jb-btn--primary">
            Join waitlist
          </Link>
          <Link to="/#why-my-pari" className="jb-btn jb-btn--ghost">
            Why MyPari
          </Link>
        </div>
      </div>

      <div className="jb-hero__visual">
        <div className="jb-hero__card">
          <img
            src="/hero-mypari.png"
            alt="Stadium crowd with smartphones watching live football on a floodlit pitch—mobile peer-to-peer sports betting and social prediction markets, not a traditional sportsbook"
            width={1024}
            height={731}
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
