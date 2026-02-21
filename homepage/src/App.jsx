const faq = [
  'Which models does Klean support?',
  'How do I use Klean?',
  'What is Klean built for?'
];

const pricing = [
  ['Claude Opus 4.6', '$5.00', '$25.00', '$0.50', '$6.25'],
  ['Claude Haiku 4.5', '$1.00', '$5.00', '$0.10', '$1.25'],
  ['GPT-5.2 Extra High', '$1.75', '$14.00', '$0.17', '-'],
  ['GPT-5.2 Codex', '$1.75', '$14.00', '$0.17', '-'],
  ['Gemini 3 Pro', '$2.00', '$12.00', '$0.20', '-'],
  ['GLM 4.7', '$0.45', '$1.80', '$0.11', '-'],
  ['Kimi K2.5', '$0.60', '$3.00', '$0.10', '-']
];

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="logo">❧</span>
          <span>Klean</span>
        </div>
        <nav>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#changelog">Changelog</a>
          <a href="#community">Community ↗</a>
          <button>↓ Download</button>
        </nav>
      </header>

      <main className="content">
        <section className="hero">
          <h1>Review and fix your CLI coded slop.</h1>
          <p>
            Klean runs a team of agents to catch bugs and improve code quality,
            all on your desktop.
          </p>
          <div className="cta-row">
            <button>↓ Download for Free</button>
            <code>curl -fsSL klean.sh/install | bash ⌘</code>
          </div>
          <small>View all downloads · 1,692,435 lines in the last day</small>
        </section>

        <section className="terminal-preview" aria-label="CLI preview">
          <div className="terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <p>klean run --fix hydration-mismatch</p>
          </div>
          <div className="terminal-body">
            <p>$ Scanning repository...</p>
            <p>✓ Reproduced hydration mismatch in dashboard header</p>
            <p>✓ Diagnosed useEffect date drift</p>
            <p>✓ Patched component + validated fix</p>
            <p>✓ Opened branch and prepared PR summary</p>
            <p className="muted">Generating final report...</p>
          </div>
        </section>

        <section id="features" className="copy">
          <h2>How it works</h2>
          <ul>
            <li>
              <strong>Reproduce.</strong> Instruments your code and runs it
              locally to trigger the actual bug.
            </li>
            <li>
              <strong>Diagnose.</strong> Spawns parallel agents that test
              competing hypotheses.
            </li>
            <li>
              <strong>Fix.</strong> Patches the code and validates the issue is
              resolved.
            </li>
          </ul>

          <h2>Code review</h2>
          <ul>
            <li>
              <strong>Drop in a PR.</strong> Klean checks out the branch, runs
              it, and gives feedback based on what actually happens.
            </li>
            <li>
              <strong>Pre-check your own PRs before pushing.</strong> Catch the
              things reviewers will flag before they do.
            </li>
          </ul>

          <h2>What Klean catches</h2>
          <ul>
            <li>React infinite re-render loops</li>
            <li>SSR hydration mismatches</li>
            <li>Race conditions in streaming responses</li>
            <li>Performance bottlenecks and unnecessary re-renders</li>
            <li>Code that works but shouldn't</li>
          </ul>
        </section>

        <section id="pricing" className="copy">
          <h2>Pricing</h2>
          <p>Priced at API cost. We don't charge over. 2M tokens free to start.</p>
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Input</th>
                <th>Output</th>
                <th>Cached Read</th>
                <th>Cached Write</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="copy" id="changelog">
          <h2>Frequently asked questions</h2>
          {faq.map((item) => (
            <details key={item}>
              <summary>{item}</summary>
              <p>Built for teams that ship fast and need confidence.</p>
            </details>
          ))}
        </section>

        <section className="copy cta-foot">
          <p>Runs on your machine. You do the product work. Klean does the detective work.</p>
          <h3>Ready to squash some bugs?</h3>
          <button>↓ Download</button>
        </section>
      </main>

      <footer id="community">
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
