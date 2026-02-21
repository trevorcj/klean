import { useState } from 'react';

const faq = [
  {
    question: 'Which models does Klean support?',
    answer: 'Any model you can call from your CLI workflow. Start with GPT-5.2-Codex, Claude, or Gemini and swap instantly.'
  },
  {
    question: 'How do I use Klean?',
    answer: 'Install with one command, run `klean review` before pushing, and apply fixes directly from your terminal.'
  },
  {
    question: 'What is Klean built for?',
    answer: 'Teams shipping fast in React, Node, and TypeScript who want deterministic code review and fix verification.'
  }
];

export function App() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="page">
      <header className="topbar content-width">
        <div className="brand">
          <span className="brand-mark">⬢</span>
          <span>Klean</span>
        </div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#changelog">Changelog</a>
          <a href="#community">Community ↗</a>
        </nav>
        <button className="btn btn-primary">⬇ Download</button>
      </header>

      <main className="content-width main-content">
        <section className="hero">
          <h1>Review and fix your terminal coded slop.</h1>
          <p>
            Klean runs a team of agents to catch bugs and improve code quality, all on your machine.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">⬇ Download for Free</button>
            <button className="btn btn-command">curl -fsSL klean.dev/install | bash</button>
          </div>
          <small>View all downloads • 2,349,020 lines reviewed in the last day</small>
        </section>

        <section className="terminal-preview" aria-label="Klean CLI preview">
          <div className="terminal-top">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="title">klean review --fix</span>
          </div>
          <div className="terminal-body">
            <div className="pane pane-left">
              <h3>project dashboard</h3>
              <ul>
                <li>● Fix hydration mismatch <span>3m</span></li>
                <li>● Review React PR #87 <span>8m</span></li>
                <li>● Debug race condition <span>12m</span></li>
                <li>● Write integration tests <span>6m</span></li>
              </ul>
            </div>
            <div className="pane pane-middle">
              <h3>analysis</h3>
              <p className="code ok">✓ detected stale useEffect dependency</p>
              <p className="code warn">~ pre-mount fallback differs from client render</p>
              <p className="code ok">✓ patch generated and tests queued</p>
              <p className="muted">Resolving comment #2…</p>
              <div className="mini-input">Use '@' to add context</div>
            </div>
            <div className="pane pane-right">
              <h3>diff preview</h3>
              <pre>{`- const greeting = new Date().getHours() < 12
+ const greeting = mounted
+   ? new Date().getHours() < 12
+   : "Good morning"`}</pre>
            </div>
          </div>
        </section>

        <section className="stack" id="features">
          <h2>How it works</h2>
          <ul>
            <li><strong>Reproduce.</strong> Runs your code locally to trigger real failures.</li>
            <li><strong>Diagnose.</strong> Spawns parallel agents that test competing hypotheses.</li>
            <li><strong>Fix.</strong> Patches your code and validates the issue is resolved.</li>
          </ul>

          <h2>Code review</h2>
          <ul>
            <li>Drop in a PR. Klean checks out the branch and executes realistic checks.</li>
            <li>Pre-check your own PRs before pushing to catch reviewer comments early.</li>
          </ul>

          <h2>What Klean catches</h2>
          <ul>
            <li>React infinite re-render loops</li>
            <li>SSR hydration mismatches</li>
            <li>Race conditions in streaming responses</li>
            <li>Performance bottlenecks and unnecessary re-renders</li>
            <li>Code that works but should not</li>
          </ul>
        </section>

        <section id="pricing" className="pricing">
          <h2>Pricing</h2>
          <p>Priced at API cost. We don&apos;t charge over. 2M tokens free to start.</p>
          <table>
            <thead>
              <tr><th>Model</th><th>Input</th><th>Output</th><th>Cached Read</th><th>Cached Write</th></tr>
            </thead>
            <tbody>
              <tr><td>GPT-5.2-Codex</td><td>$1.75</td><td>$14.00</td><td>$0.17</td><td>-</td></tr>
              <tr><td>Claude Opus 4.6</td><td>$5.00</td><td>$25.00</td><td>$0.50</td><td>$6.25</td></tr>
              <tr><td>Gemini 3 Pro</td><td>$2.00</td><td>$12.00</td><td>$0.20</td><td>-</td></tr>
              <tr><td>GLM 4.7</td><td>$0.45</td><td>$1.80</td><td>$0.11</td><td>-</td></tr>
            </tbody>
          </table>
        </section>

        <section className="faq" id="community">
          <h2>Frequently asked questions</h2>
          {faq.map((item, index) => (
            <button
              key={item.question}
              className="faq-item"
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
            >
              <div>
                <strong>{item.question}</strong>
                {openFaq === index && <p>{item.answer}</p>}
              </div>
              <span>{openFaq === index ? '−' : '+'}</span>
            </button>
          ))}
        </section>

        <section className="cta">
          <p>Runs on your machine. You do the product work, Klean does the detective work.</p>
          <h3>Ready to squash some bugs?</h3>
          <button className="btn btn-primary">⬇ Download</button>
        </section>
      </main>

      <footer className="content-width footer" id="changelog">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Data Use</a>
        <a href="#">Security</a>
        <a href="#">Careers ↗</a>
        <a href="#">Community ↗</a>
        <a href="#">X (Twitter) ↗</a>
      </footer>
    </div>
  );
}
