import { useEffect, useState } from 'react'

const faizModes = [
  {
    name: 'Standing By',
    code: '5-5-5 ENTER',
    aura: 'โหมดเตรียมแปลงร่าง ระบบกำลังล็อก KPI ที่ต้องจับตา',
  },
  {
    name: 'Faiz Mode',
    code: 'COMPLETE',
    aura: 'แปลงร่างสำเร็จ! รายงานถูกยิงเข้าเข็มขัดเป็น digest พร้อมสู้ตลาด',
  },
  {
    name: 'Axel Form',
    code: 'START UP',
    aura: 'เร่งความเร็วการตัดสินใจ 1000% สำหรับสัปดาห์ที่โคตรเดือด',
  },
]

const reportCards = [
  { title: 'Orphnoch Threat Level', value: 'Severe', note: 'CPA พุ่งแรงจากแคมเปญที่ยิง broad เกินไป' },
  { title: 'Rider Energy Core', value: '+18.3%', note: 'MRR พุ่งจาก plan upgrade หลังเปิดฟีเจอร์ใหม่' },
  { title: 'Delta Conversion Lock', value: '71%', note: 'Onboarding flow เวอร์ชันล่าสุดแปลง lead ได้ดีกว่าเดิม' },
  { title: 'Mission Runway', value: '17.6 เดือน', note: 'Burn rate ลดลงหลัง optimize infra และ team ops' },
]

const integrations = ['Stripe', 'Notion', 'Slack', 'HubSpot', 'GA4', 'Airtable']

const faqs = [
  {
    q: 'มันเป็นแดชบอร์ดอีกอันไหม?',
    a: 'ไม่ใช่ Quiet KPI คือเข็มขัดแปลงร่างข้อมูล: เอาความวุ่นวายมาเรียบเรียงเป็น weekly digest เดียวจบ.',
  },
  {
    q: 'ต้องเซ็ตอัพนานแค่ไหน?',
    a: 'โดยเฉลี่ย 15-20 นาที เชื่อมเครื่องมือแล้วระบบจะเริ่ม “Standing By” ให้อัตโนมัติ.',
  },
  {
    q: 'ส่งให้นักลงทุนด้วยได้ไหม?',
    a: 'ได้ มีโหมด investor-ready summary ที่ตัดคำฟุ่มเฟือย เหลือแต่สัญญาณสำคัญ.',
  },
]

export default function App() {
  const [modeIndex, setModeIndex] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [yearly, setYearly] = useState(true)
  const transformed = modeIndex > 0

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
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
      { threshold: 0.18 },
    )

    revealElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const testimonials = [
    '“ทุกวันจันทร์เรากดเข็มขัด 555 แล้วทีมเห็นสัญญาณธุรกิจพร้อมกันใน 1 หน้า” — Founder, Nebula Commerce',
    '“จากเดิมอ่าน dashboard 7 อัน ตอนนี้มี digest เดียวที่พร้อมพุ่งเข้าประชุม” — CEO, Crimson Works',
    '“โทนมันเบียวมาก แต่ insight แม่นจริง โคตรชอบ” — Co-founder, Night Shift Labs',
  ]

  return (
    <div className={`page-shell ${transformed ? 'transformed' : ''}`}>
      <div className="grid-noise" />
      <div className="bg-blur bg-blur-1" />
      <div className="bg-blur bg-blur-2" />

      <main className="container">
        <section className="hero glass-panel">
          <p className="pill">QUIET KPI // MASKED RIDER FAIZ PROTOCOL</p>
          <h1>ข้อมูลจะไม่ใช่ความวุ่นวายอีกต่อไป... HENSHIN.</h1>
          <p>
            แปลง metric ดิบให้เป็น weekly digest แบบพระเอกโทคุซัตสึ: คม, เร็ว, และพร้อมยิง
            action ในการประชุมทันที.
          </p>

          <div className="belt-console glass-panel">
            <div className="belt-header">
              <strong>FAIZ GEAR</strong>
              <span>{faizModes[modeIndex].code}</span>
            </div>
            <p>{faizModes[modeIndex].aura}</p>
            <div className="belt-buttons">
              {faizModes.map((mode, index) => (
                <button
                  key={mode.name}
                  type="button"
                  className={modeIndex === index ? 'selected' : ''}
                  onClick={() => setModeIndex(index)}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          </div>

          <form className="email-capture" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="rider@startup.com" aria-label="Email address" />
            <button type="submit">Insert Mission Code</button>
          </form>
        </section>

        <section className="section reveal-on-scroll">
          <h2>Weekly Battle Report</h2>
          <div className="report-grid">
            {reportCards.map((card) => (
              <article className="glass-panel card" key={card.title}>
                <h3>{card.title}</h3>
                <p className="metric">{card.value}</p>
                <p>{card.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Connect Your Arsenal</h2>
          <div className="integration-row glass-panel">
            {integrations.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Rider Voices</h2>
          <div className="testimonial glass-panel">
            <p>{testimonials[activeTestimonial]}</p>
            <div className="carousel-dots" role="tablist" aria-label="testimonial selector">
              {testimonials.map((_, index) => (
                <button
                  key={index}
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
          <h2>Choose Your Form</h2>
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
              <h3>Faiz Base</h3>
              <p className="price">
                {yearly ? '$39' : '$49'}<small>/month</small>
              </p>
              <ul>
                <li>1 workspace</li>
                <li>Weekly battle digest</li>
                <li>Core integrations</li>
              </ul>
              <button type="button">Stand By</button>
            </article>
            <article className="glass-panel pricing-card featured">
              <h3>Faiz Axel</h3>
              <p className="price">
                {yearly ? '$99' : '$129'}<small>/month</small>
              </p>
              <ul>
                <li>Unlimited recipients</li>
                <li>Narrative AI briefing</li>
                <li>Investor finisher mode</li>
              </ul>
              <button type="button">Complete</button>
            </article>
          </div>
        </section>

        <section className="section faq">
          <h2>FAQ</h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <details className="glass-panel" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Quiet KPI // SMART BRAIN OPS</p>
        <div>
          <a href="#">Gear Manual</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  )
}
