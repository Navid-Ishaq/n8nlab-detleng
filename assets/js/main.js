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
    const headings = [...article.querySelectorAll(':scope > h1')];
    headings.forEach((heading, index) => {
      const id = `chapter-${index + 1}`;
      heading.id = id;
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading.textContent.replace(/^\d+\.\s*/, '');
      nav.appendChild(link);
    });
    const links = [...nav.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    headings.forEach(heading => observer.observe(heading));

    const progress = document.querySelector('.progress-bar');
    const updateProgress = () => {
      if (!progress) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.height = `${Math.min(100, Math.max(0, scrollY / max * 100))}%`;
    };
    addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
})();
