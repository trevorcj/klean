const faqItems = [
  {
    q: 'Which models does Klean support?',
    a: 'Klean works with modern coding models from Anthropic, OpenAI, Google, and more through your API keys.',
  },
  {
    q: 'How do I use Klean?',
    a: 'Install the CLI, run it in your repo, and let Klean reproduce, diagnose, and validate fixes before you push.',
  },
  {
    q: 'What is Klean built for?',
    a: 'Klean is built for local-first debugging workflows where correctness, speed, and code quality matter.',
  },
];

const pricingRows = [
  ['Claude Opus 4.1', '$5.00', '$25.00', '$0.50', '$6.25'],
  ['Claude Haiku 4.5', '$1.00', '$5.00', '$0.10', '$1.25'],
  ['GPT-5.2 Extra High', '$1.75', '$14.00', '$0.17', '–'],
  ['GPT-5.2 Codex', '$1.75', '$14.00', '$0.17', '–'],
  ['Gemini 3 Pro', '$2.00', '$12.00', '$0.20', '–'],
  ['GLM 4.7', '$0.45', '$1.80', '$0.11', '–'],
  ['Kimi K2.5', '$0.60', '$3.00', '$0.10', '–'],
];

export default function App() {
  return (
    <div className="page">
      <header className="topbar container">
        <div className="brand">🍃 Klean</div>
        <nav>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#changelog">Changelog</a>
          <a href="#community">Community ↗</a>
          <button className="btn">⌄ Download</button>
        </nav>
      </header>

      <main className="container">
        <section className="hero" id="features">
          <h1>Review and fix your CLI code slop.</h1>
          <p>
            Klean runs a team of agents to catch bugs and improve code quality, all
            from your terminal.
          </p>
          <div className="cta-row">
            <button className="btn">⌄ Download for Free</button>
            <code>curl -fsSL klean.sh/install | bash</code>
          </div>
          <small>View all downloads • 1,692,435 lines in the last day</small>
        </section>

        <section className="mock-window" aria-label="Klean CLI view">
          <aside>
            <h3>klean dashboard</h3>
            <ul>
              <li className="active">Fix hydration mismatch</li>
              <li>Review React PR #87</li>
              <li>Debug race condition</li>
              <li>Write integration tests</li>
              <li>Fix webhook retry logic</li>
              <li>Optimize list perf</li>
              <li>Add offline support</li>
            </ul>
          </aside>
          <div>
            <h3>Current session</h3>
            <pre>
$ klean review
✓ reproducing issue
✓ running competing hypotheses
✓ validating pre-mount fallback
→ generated patch (2 files)
            </pre>
            <p>Found 2 suggestions · resolving comment #2...</p>
          </div>
          <div>
            <h3>Patch check</h3>
            <pre>
- const greeting = new Date().getHours() &lt; 12
+ const greeting = mounted
+   ? new Date().getHours() &lt; 12
+   : ''

✓ hydration mismatch resolved
✓ lint checks passing
            </pre>
          </div>
        </section>

        <section className="content-block">
          <h2>How it works</h2>
          <ul>
            <li>
              <strong>Reproduce.</strong> Instruments your code and runs it locally to
              trigger the actual bug.
            </li>
            <li>
              <strong>Diagnose.</strong> Spawns parallel agents that test competing
              hypotheses about the root cause.
            </li>
            <li>
              <strong>Fix.</strong> Patches the code and validates the fix resolves the
              issue.
            </li>
          </ul>

          <h2>Code review</h2>
          <ul>
            <li>
              <strong>Drop in a PR.</strong> Klean checks out the branch, runs it, and
              gives feedback based on what actually happens.
            </li>
            <li>
              <strong>Pre-check your own PRs before pushing.</strong> Catch issues
              reviewers flag before they do.
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

        <section className="content-block" id="pricing">
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
              {pricingRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="content-block faq" id="community">
          <h2>Frequently asked questions</h2>
          {faqItems.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className="closing content-block">
          <p>Runs on your machine. You do the product work, Klean does the detective work.</p>
          <h3>Ready to squash some bugs?</h3>
          <button className="btn">⌄ Download</button>
        </section>
      </main>

      <footer className="container" id="changelog">
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
