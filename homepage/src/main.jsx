import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const navItems = ['Features', 'Pricing', 'Changelog', 'Community ↗'];
  const faq = [
    'Which models does Klean support?',
    'How do I use Klean?',
    'What is Klean built for?'
  ];

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-dot" aria-hidden>⌘</span>
          <span>Klean</span>
        </div>
        <nav>
          {navItems.map((item) => (
            <a key={item} href="#">{item}</a>
          ))}
          <button>↓ Download</button>
        </nav>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Review and fix your terminal coded slop.</h1>
          <p>
            Klean runs a team of agents to catch bugs and improve CLI quality,
            all from your shell.
          </p>
          <div className="hero-actions">
            <button>↓ Download for Free</button>
            <code>curl -fsSL klean.dev/install | bash</code>
          </div>
          <small>View all downloads · 1,204,101 installs in the last day</small>
        </section>

        <section className="mockup" aria-label="Klean terminal mockup">
          <div className="mock-left">
            <h3>klean dashboard</h3>
            <ul>
              <li><span /> Fix hydration mismatch</li>
              <li><span /> Review React PR #87</li>
              <li><span /> Debug race condition</li>
              <li><span /> Optimize list perf</li>
              <li><span /> Fix webhook retry logic</li>
            </ul>
          </div>
          <div className="mock-main">
            <h3>Current changes</h3>
            <pre>{`$ klean review
✓ Reproduced issue
✓ Diagnosed root cause
✓ Patched stale mount branch
✓ Validated passing tests`}</pre>
            <p>Found 2 suggestions · Resolving comment #2</p>
          </div>
        </section>

        <section className="content">
          <h2>How it works</h2>
          <ul>
            <li><strong>Reproduce.</strong> Runs your code locally to trigger bugs.</li>
            <li><strong>Diagnose.</strong> Spawns parallel agents to test hypotheses.</li>
            <li><strong>Fix.</strong> Patches code and validates the issue is resolved.</li>
          </ul>

          <h2>Code review</h2>
          <ul>
            <li>Drop in a PR. Klean checks the branch and runs it.</li>
            <li>Pre-check your own PRs before pushing.</li>
          </ul>

          <h2>What Klean catches</h2>
          <ul>
            <li>React infinite re-render loops</li>
            <li>SSR hydration mismatches</li>
            <li>Race conditions in streaming responses</li>
            <li>Performance bottlenecks and unnecessary re-renders</li>
            <li>Code that works but shouldn't</li>
          </ul>

          <h2>Pricing</h2>
          <p>Priced at API cost. No platform markup. 2M tokens free to start.</p>
          <table>
            <thead>
              <tr><th>Model</th><th>Input</th><th>Output</th></tr>
            </thead>
            <tbody>
              <tr><td>Claude Opus 4.6</td><td>$5.00</td><td>$25.00</td></tr>
              <tr><td>GPT-5.2 Codex</td><td>$1.75</td><td>$14.00</td></tr>
              <tr><td>Gemini 3 Pro</td><td>$2.00</td><td>$12.00</td></tr>
            </tbody>
          </table>

          <h2>Frequently asked questions</h2>
          <div className="faq">
            {faq.map((q) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>Klean focuses on practical debugging and safe fixes in your CLI workflow.</p>
              </details>
            ))}
          </div>

          <section className="cta">
            <p>Runs on your machine. You do the product work, Klean does the detective work.</p>
            <h3>Ready to squash some bugs?</h3>
            <button>↓ Download</button>
          </section>
        </section>
      </main>

      <footer>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Data Use</a>
        <a href="#">Security</a>
        <a href="#">Careers ↗</a>
        <a href="#">Community ↗</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
