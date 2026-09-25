# DeTLeng n8n Lab

The BUILD / EXPLAIN layer of the DeTLeng automation ecosystem, deployed as a dependency-free static site at `n8nlab.detleng.com`.

## Local preview

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Content model

- `postmortems/` contains one HTML build record per Ops project.
- `experiments/` contains bounded test-bench investigations.
- `content/n8n-where-ideas-find-their-flow-study-guide.md` is the canonical Field Guide source.
- `field-guide/index.html` is generated presentation HTML. Rebuild it after source edits with `pwsh ./scripts/build-field-guide.ps1`.
- `assets/css/styles.css` provides the shared design system.
- `assets/js/main.js` provides navigation, chapter tracking and reading progress.

## Adding a postmortem

1. Copy `postmortems/lead-automation-engine.html` to a new slug.
2. Update its metadata, status and Ops link.
3. Replace placeholders only with observed project evidence.
4. Add a card to `postmortems/index.html`.
5. Link important node concepts to relevant Field Guide chapters.

## Deployment

GitHub Pages serves the repository root. Keep `CNAME` containing `n8nlab.detleng.com`. No runtime dependencies are required.
