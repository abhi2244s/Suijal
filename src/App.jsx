import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  X,
} from 'lucide-react'
import productImage from './assets/suijal.jpeg'

/*
const features = [
  {
    number: '01',
    icon: Droplets,
    title: 'Made to feel like you',
    description: 'A considered scent profile that settles in differently on every skin.',
    tone: 'rose',
  },
  {
    number: '02',
    icon: Flower2,
    title: 'Less, but better',
    description: 'Thoughtful ingredients. A point of view. Nothing added just to fill space.',
    tone: 'lilac',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'A ritual of your own',
    description: 'An everyday essential designed to make the ordinary feel a little more yours.',
    tone: 'sage',
  },
]
*/

/*
function FeatureCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <Reveal className={`feature-card feature-card--${feature.tone}`} delay={index * 0.1}>
      <div className="feature-card__top">
        <span className="feature-card__number">{feature.number} / 03</span>
        <span className="feature-card__icon" aria-hidden="true">
          <Icon size={20} strokeWidth={1.5} />
        </span>
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      <span className="feature-card__line" aria-hidden="true" />
    </Reveal>
  )
}
*/

function InvitationModal({ onClose }) {
  const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      previousFocus?.focus()
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const value = contact.trim()
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    const digits = value.replace(/\D/g, '')
    const isWhatsApp = /^[+\d\s().-]+$/.test(value) && digits.length >= 8 && digits.length <= 15

    inputRef.current.setCustomValidity(
      isEmail || isWhatsApp ? '' : 'Enter a valid email address or WhatsApp number.',
    )

    if (!inputRef.current.reportValidity()) return
    setSubmitted(true)
  }

  return (
    <motion.div
      className="invitation-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.section
        aria-labelledby="invitation-title"
        aria-modal="true"
        className="invitation-modal"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        role="dialog"
        transition={{ duration: 0.24, ease: 'easeOut' }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') onClose()
          if (event.key === 'Tab') {
            const focusableElements = event.currentTarget.querySelectorAll('button, input')
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault()
              lastElement.focus()
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }}
      >
        <button
          aria-label="Close invitation dialog"
          className="invitation-modal__close"
          onClick={onClose}
          type="button"
        >
          <X size={18} />
        </button>
        <p className="invitation-modal__eyebrows">SUIJAL</p>
        <p className="invitation-modal__eyebrow">EARLY ACCESS</p>
        <h2 id="invitation-title">Be there from the beginning.</h2>
        <p className="invitation-modal__description">
          Leave your email or WhatsApp number and we’ll let you know when we launch.
        </p>
        <form className="invitation-modal__form" onSubmit={handleSubmit}>
          <label htmlFor="invitation-contact">Email or WhatsApp number</label>
          <input
            autoComplete="email tel"
            id="invitation-contact"
            onChange={(event) => {
              setContact(event.target.value)
              event.target.setCustomValidity('')
              setSubmitted(false)
            }}
            placeholder="Enter your email or WhatsApp number"
            ref={inputRef}
            required
            type="text"
            value={contact}
          />
          <button className="invitation-modal__submit" type="submit">
            Notify Me at Launch <ArrowRight size={17} />
          </button>
        </form>
        <p aria-live="polite" className={`invitation-modal__notice${submitted ? ' invitation-modal__notice--visible' : ''}`}>
          {submitted && 'Thanks for your interest. Notifications are not connected in this preview.'}
        </p>
      </motion.section>
    </motion.div>
  )
}

function App() {
  const [invitationOpen, setInvitationOpen] = useState(false)

  return (
    <main>
      <header className="site-header">
        <a className="wordmark wordmark--header" href="#home" aria-label="Suijal by Miglox home">
          <span>SUIJAL</span>
          <span className="wordmark__subline"><span className="wordmark__by">BY</span><span>MIGLOX</span></span>
        </a>
        <button className="header-cta" onClick={() => setInvitationOpen(true)} type="button">
          Apply For Invites <ArrowUpRight size={15} strokeWidth={1.8} />
        </button>
      </header>

      <AnimatePresence>
        {invitationOpen && <InvitationModal onClose={() => setInvitationOpen(false)} />}
      </AnimatePresence>

      <section className="hero" id="home">
        <motion.div
          className="hero__image-wrap"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.img
            alt="SUIJAL bottle on a rocky coastline"
            className="hero__image"
            src={productImage}
          />
        </motion.div>
      </section>

      <section className="details section-shell" id="details">
        <div className="feature-grid feature-grid--two">
          <article className="feature-card feature-card--premium feature-card--formula">
            <h3>
              Zero taste. Zero calories. <br />
              A formula designed to<br />
              support your visceral fat care.
            </h3>
          </article>

          <article className="feature-card feature-card--premium feature-card--stat">
            <h3>
              With over 70% of<br />
              healthy Indian adults unknowingly<br />
              carrying hidden visceral fat.<br />
              
            </h3>
          </article>

          <article className="feature-card feature-card--premium feature-card--statement">
            <h3 className="feature-card__statement">
              <span className=''>Something clear is coming to change</span>
              <strong>Indian drinking water forever.</strong>
            </h3>
          </article>
        </div>
      </section>

      <section className="launch" aria-labelledby="launch-title">
        <div className="coming-soon">
          <div aria-hidden="true" className="coming-soon__rings">
            <span className="coming-soon__ring coming-soon__ring--one" />
            <span className="coming-soon__ring coming-soon__ring--two" />
            <span className="coming-soon__ring coming-soon__ring--three" />
            <span className="coming-soon__ring-dot" />
          </div>

          <p className="coming-soon__eyebrow">THE FIRST DROP</p>

          <h2 className="coming-soon__title" id="launch-title">
            <span>UNCOVERING</span>
            <span>SOON</span>
          </h2>

          <span aria-hidden="true" className="coming-soon__rule"><span /></span>
        </div>
      </section>

      {/* <section className="story section-shell" id="story">
        <Reveal className="section-kicker">
          <span>01</span><span className="kicker-rule" /><span>THE THOUGHT</span>
        </Reveal>
        <div className="story__grid">
          <Reveal>
            <h2>Some things are<br />better <em>felt.</em></h2>
          </Reveal>
          <Reveal className="story__body" delay={0.12}>
            <p>
              We believe fragrance should be more than the first thing people
              notice. It should be the thing they remember, even after you have
              left the room.
            </p>
            <p>
              MIGLOX is taking its time to make something personal, quietly
              distinctive, and entirely worth the wait.
            </p>
            <a className="text-link text-link--dark" href="#details">
              A little more about us <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>
        <div className="story__signature" aria-hidden="true"><span>M</span></div>
      </section> */}

      {/* <section className="teaser section-shell">
        <Reveal className="teaser__inner">
          <span className="teaser__ornament" aria-hidden="true"><span /><span /><span /></span>
          <p className="section-kicker"><span>03</span><span className="kicker-rule" /><span>JUST BETWEEN US</span></p>
          <h2>It starts with<br />a <em>whisper.</em></h2>
          <p className="teaser__copy">
            A detail you can't quite place. A memory you didn't know you had.
            The kind of presence that never needs to announce itself.
          </p>
          <span className="teaser__signoff">You'll know it when you feel it.</span>
        </Reveal>
      </section> */}

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#home" aria-label="Suijal by Miglox home">
          <span>SUIJAL</span>
          <span className="wordmark__subline"><span className="wordmark__by">BY</span><span>MIGLOX</span></span>
        </a>
        {/* <span className="site-footer__note">A new feeling is on its way.</span> */}
        <a className="site-footer__top" href="#home">BACK TO THE TOP <ArrowUpRight size={14} /></a>
        <span className="site-footer__copyright">© 2026 SUIJAL</span>
      </footer>
    </main>
  )
}

export default App
