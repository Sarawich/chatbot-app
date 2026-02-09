import { useEffect, useState } from 'react'

const reports = [
  {
    title: 'Revenue Momentum',
    value: '+12.4% WoW',
    note: 'MRR expansion led by self-serve upgrades and lower refund rates.',
  },
  {
    title: 'Activation Health',
    value: '68% activated',
    note: 'Onboarding flow 2 is outperforming control by 9 percentage points.',
  },
  {
    title: 'Cash Runway',
    value: '19.2 months',
    note: 'Burn decreased after support automation and infra rightsizing.',
  },
  {
    title: 'Pipeline Quality',
    value: '31 SQLs',
    note: 'Founder-led content is driving higher-intent inbound leads.',
  },
]

const transformationMoments = [
  {
    title: 'Faiz: Start-Up Pulse',
    detail: 'Critical KPIs lock in under 13 seconds so Monday standup starts in sync.',
  },
  {
    title: 'Axel Burst Mode',
    detail: 'A fast lane summary highlights sudden spikes and dramatic trend reversals.',
  },
  {
    title: 'Blaster Finish',
    detail: 'One cinematic executive recap ties metrics, causes, and next actions together.',
  },
]

const integrations = ['Stripe', 'HubSpot', 'Notion', 'Slack', 'Google Analytics', 'Airtable']

const testimonials = [
  {
    quote:
      'Quiet KPI helped us stop chasing vanity dashboards. Every Monday we know exactly what moved and what to do next.',
    author: 'Maya Chen',
    role: 'Founder, Loomly Labs',
  },
  {
    quote:
      'The digest reads like a sharp operator in our inbox. My cofounder and I use it as our weekly standup agenda.',
    author: 'Leo Martin',
    role: 'Co-founder, North Harbor',
  },
  {
    quote:
      'Our team literally calls the weekly “Faiz transformation scene” because it snaps chaos into focus so fast.',
    author: 'Rani Patel',
    role: 'CEO, August Health Tech',
  },
]

const faqItems = [
  {
    q: 'How long does setup take?',
    a: 'Most teams connect their tools and receive a first digest in under 20 minutes.',
  },
  {
    q: 'Do you replace our BI stack?',
    a: 'No. Quiet KPI sits on top of your stack and turns core signals into founder-ready narrative summaries.',
  },
  {
    q: 'Can I invite my team or investors?',
    a: 'Yes. You can add recipients and send separate views for operators, leadership, or investors.',
  },
]

export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [yearly, setYearly] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const starterPrice = yearly ? '$39' : '$49'
  const growthPrice = yearly ? '$99' : '$129'

  return (
    <div className="page-shell">
      <div className="bg-blur bg-blur-1" />
      <div className="bg-blur bg-blur-2" />

      <main className="container">
        <section className="hero glass-panel">
          <span className="pill">Founder-friendly weekly metric digest</span>
          <h1>Quiet KPI turns noisy data into your calm Monday brief.</h1>
          <p>
            Connect your stack and get one elegant weekly digest with what changed, why it matters,
            and what to do next.
          </p>
          <form className="email-capture" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@company.com" aria-label="Email address" />
            <button type="submit">Get early access</button>
          </form>
        </section>

        <section className="section reveal-on-scroll">
          <h2>Sample weekly report cards</h2>
          <div className="report-grid">
            {reports.map((report) => (
              <article className="glass-panel card" key={report.title}>
                <h3>{report.title}</h3>
                <p className="metric">{report.value}</p>
                <p>{report.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section transformation-strip">
          <h2>Faiz-inspired transformation moments</h2>
          <p>
            For teams that like a little drama: each digest includes a high-impact narrative pass that
            feels like a classic henshin sequence.
          </p>
          <div className="transformation-grid">
            {transformationMoments.map((moment) => (
              <article className="glass-panel transformation-card" key={moment.title}>
                <h3>{moment.title}</h3>
                <p>{moment.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section integrations">
          <h2>Connect the tools you already use</h2>
          <div className="integration-row glass-panel">
            {integrations.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>What founders are saying</h2>
          <div className="testimonial glass-panel">
            <p>“{testimonials[activeTestimonial].quote}”</p>
            <div>
              <strong>{testimonials[activeTestimonial].author}</strong>
              <span>{testimonials[activeTestimonial].role}</span>
            </div>
            <div className="carousel-dots" role="tablist" aria-label="testimonial selector">
              {testimonials.map((item, index) => (
                <button
                  key={item.author}
                  type="button"
                  className={index === activeTestimonial ? 'active' : ''}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section pricing-section">
          <h2>Simple pricing that scales with your team</h2>
          <div className="pricing-toggle" role="radiogroup" aria-label="billing period">
            <button type="button" className={!yearly ? 'selected' : ''} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button type="button" className={yearly ? 'selected' : ''} onClick={() => setYearly(true)}>
              Yearly <span>save 20%</span>
            </button>
          </div>
          <div className="pricing-grid">
            <article className="glass-panel pricing-card">
              <h3>Starter</h3>
              <p className="price">
                {starterPrice}<small>/month</small>
              </p>
              <ul>
                <li>1 workspace</li>
                <li>Weekly digest email</li>
                <li>Core integrations</li>
              </ul>
              <button type="button">Start free trial</button>
            </article>
            <article className="glass-panel pricing-card featured">
              <h3>Growth</h3>
              <p className="price">
                {growthPrice}<small>/month</small>
              </p>
              <ul>
                <li>Unlimited recipients</li>
                <li>AI trend narratives</li>
                <li>Investor snapshot mode</li>
              </ul>
              <button type="button">Choose Growth</button>
            </article>
          </div>
        </section>

        <section className="section faq">
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details className="glass-panel" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Quiet KPI. Built for calm, operator-grade growth.</p>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  )
}
