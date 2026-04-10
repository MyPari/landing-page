const items = [
  { value: '4', label: 'Core systems' },
  { value: 'Escrow', label: 'Locked stakes' },
  { value: '5%', label: 'Example fee on pot*' },
  { value: 'P2P', label: 'Peer contracts' },
]

export default function Stats() {
  const stars = Array.from({ length: 36 }, (_, i) => {
    const x = ((i * 31) % 96) + 2
    const y = ((i * 47) % 78) + 10
    const delay = ((i * 23) % 45) / 10
    const size = i % 4 === 0 ? 3 : 1.5
    return { x, y, delay, size }
  })

  return (
    <section className="jb-stats" id="stats" aria-label="Platform highlights">
      <div className="jb-stars jb-stars--stats" aria-hidden="true">
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
      <div className="jb-stats__grid">
        {items.map((item) => (
          <div key={item.label} className="jb-stats__item">
            <div className="jb-stats__value">{item.value}</div>
            <div className="jb-stats__label">{item.label}</div>
          </div>
        ))}
      </div>
      <p className="jb-stats__note">
        *Illustrative fee on resolved pots (e.g. 5% of total pot); final economics
        depend on product rules and jurisdiction. Not an offer of real-money services
        on this demo.
      </p>
    </section>
  )
}
