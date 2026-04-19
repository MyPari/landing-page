import { useState } from 'react'

const FORMSPREE_WAITLIST = import.meta.env.VITE_FORMSPREE_WAITLIST_ID
const FORMSPREE_CONTACT = import.meta.env.VITE_FORMSPREE_FORM_ID
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@mypari.com'

/** Formspree stores each POST in the dashboard; optional dedicated waitlist form or shared contact form. */
const FORMSPREE_ID = FORMSPREE_WAITLIST || FORMSPREE_CONTACT

export default function Waitlist() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const form = e.target
    const fd = new FormData(form)
    const email = String(fd.get('email') || '').trim()
    if (!email) {
      setError('Please enter your email.')
      return
    }

    if (FORMSPREE_ID) {
      setStatus('sending')
      const body = new FormData()
      body.append('email', email)
      if (!FORMSPREE_WAITLIST && FORMSPREE_CONTACT) {
        body.append('_subject', 'MyPari waitlist signup')
      }
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body,
          headers: { Accept: 'application/json' },
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok) {
          setStatus('success')
          form.reset()
        } else {
          setError(data.error || 'Something went wrong. Please try again.')
          setStatus('idle')
        }
      } catch {
        setError('Network error. Try again or email us.')
        setStatus('idle')
      }
      return
    }

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('MyPari waitlist')}&body=${encodeURIComponent(`Please add me to the waitlist:\n${email}`)}`
    window.location.href = mailto
    setStatus('success')
    form.reset()
  }

  return (
    <section
      className="jb-section jb-newsletter jb-waitlist"
      id="waitlist"
      aria-labelledby="waitlist-title"
    >
      <div className="jb-newsletter__box">
        <h2 id="waitlist-title">Join the waitlist</h2>
        <p>
          Be first to know when MyPari opens early access—product updates, regions, and
          partnership news.
        </p>
        {status === 'success' ? (
          <p style={{ color: 'var(--jb-gold)', margin: 0, fontWeight: 600 }}>
            {FORMSPREE_ID
              ? 'You’re on the list. We’ll be in touch.'
              : 'Thanks — if your mail app opened, send the message to confirm. Otherwise email us at the address in the footer.'}
          </p>
        ) : (
          <form className="jb-newsletter__form" onSubmit={handleSubmit}>
            {error ? (
              <p className="jb-waitlist__error" role="alert" style={{ margin: '0 0 0.75rem', color: '#f87171', fontSize: '0.9rem' }}>
                {error}
              </p>
            ) : null}
            <label htmlFor="email-waitlist" className="visually-hidden">
              Email
            </label>
            <input
              id="email-waitlist"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              disabled={status === 'sending'}
            />
            <button type="submit" className="jb-btn jb-btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Joining…' : 'Join waitlist'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
