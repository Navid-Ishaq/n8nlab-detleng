(() => {
  const toggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  if (toggle && header) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const article = document.querySelector('.guide-article');
  const nav = document.querySelector('.guide-nav');
  if (article && nav) {
    const headings = [...article.querySelectorAll(':scope > h1')]
      .filter(heading => /^\d+\./.test(heading.textContent.trim()));

    headings.forEach((heading, index) => {
      const id = `section-${index + 1}`;
      heading.id = id;
      heading.dataset.guideSection = String(index + 1);
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading.textContent.replace(/^\d+\.\s*/, '');
      nav.appendChild(link);
    });

    const labelKinds = {
      'the human scene': 'human-scene',
      'human meaning': 'human-meaning',
      'professional meaning': 'professional-meaning',
      'professional caution': 'warning',
      'why it matters': 'why-it-matters',
      'tiny workflow': 'tiny-workflow',
      'tiny example': 'tiny-workflow',
      'example': 'tiny-workflow',
      'a little smile': 'smile',
      'common misunderstanding': 'warning',
      'remember it like this': 'memory-hook',
      'n8n whisper': 'whisper'
    };
    article.querySelectorAll('h3').forEach(heading => {
      const key = heading.textContent.trim().toLowerCase();
      if (labelKinds[key]) heading.classList.add('guide-label', `guide-label--${labelKinds[key]}`);
    });

    article.querySelectorAll('pre').forEach(pre => {
      const code = pre.textContent.trim();
      const lines = code.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
      const isWorkflow = lines.length > 1 && lines.length <= 18 && lines.some(line => line === '→' || line.includes('→')) && !/[{};]/.test(code);
      if (!isWorkflow) return;
      pre.classList.add('workflow-visual');
      pre.setAttribute('aria-label', `Workflow example: ${code.replace(/\s+/g, ' ')}`);
    });

    const ragHeading = headings.find(heading => heading.textContent.includes('Optional Extension'));
    if (ragHeading) ragHeading.classList.add('optional-section');
    const roadMapHeading = headings.find(heading => heading.textContent.includes('Everyday Road Map'));
    if (roadMapHeading) roadMapHeading.classList.add('road-map-section');

    const links = [...nav.querySelectorAll('a')];
    const progressLabel = document.querySelector('.progress-label');
    let activeSection = 1;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        activeSection = Number(entry.target.dataset.guideSection);
        links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
        if (progressLabel) progressLabel.textContent = `Section ${activeSection} of ${headings.length}`;
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    headings.forEach(heading => observer.observe(heading));

    const progress = document.querySelector('.progress-bar');
    const updateProgress = () => {
      if (!progress) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      const percent = Math.round(Math.min(100, Math.max(0, scrollY / max * 100)));
      progress.style.height = `${percent}%`;
      if (progressLabel) progressLabel.textContent = `Section ${activeSection} of ${headings.length} · ${percent}%`;
    };
    addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
})();
