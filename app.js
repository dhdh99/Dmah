(() => {
  const base = window.DMAH_DEFAULT || {};
  let content = base;
  try {
    const saved = localStorage.getItem('dmah_preview_data');
    if (saved) content = { ...base, ...JSON.parse(saved) };
  } catch (_) {}
  const $ = (id) => document.getElementById(id);
  const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const setText = (id, value) => { const node = $(id); if (node) node.textContent = value || ''; };
  document.title = content.siteName || 'DMAH — 디마';
  setText('hero-eyebrow', content.heroEyebrow);
  setText('hero-title', content.heroTitle);
  setText('hero-lead', content.heroLead);
  setText('hero-quote', content.heroQuote);
  setText('intro-eyebrow', content.introEyebrow);
  setText('intro-title', content.introTitle);
  setText('intro-text', content.introText);
  setText('intro-note', content.introNote);
  setText('world-eyebrow', content.worldEyebrow);
  setText('world-title', content.worldTitle);
  setText('world-intro', content.worldIntro);
  setText('monument-eyebrow', content.monumentEyebrow);
  setText('monument-title', content.monumentTitle);
  setText('monument-intro', content.monumentIntro);
  setText('organization-eyebrow', content.organizationEyebrow);
  setText('organization-mark', content.organizationMark);
  setText('organization-title', content.organizationTitle);
  setText('organization-lead', content.organizationLead);
  setText('organization-note', content.organizationNote);
  setText('organization-public-goal', content.organizationPublicGoal);
  setText('organization-hidden-goal', content.organizationHiddenGoal);
  setText('characters-eyebrow', content.charactersEyebrow);
  setText('characters-title', content.charactersTitle);
  setText('characters-intro', content.charactersIntro);
  setText('timeline-eyebrow', content.timelineEyebrow);
  setText('timeline-title', content.timelineTitle);
  setText('timeline-intro', content.timelineIntro);
  setText('archive-eyebrow', content.archiveEyebrow);
  setText('archive-title', content.archiveTitle);
  setText('archive-type', content.archiveType);
  setText('archive-text', content.archiveText);
  setText('archive-quote', content.archiveQuote);
  setText('archive-attribution', content.archiveAttribution);
  setText('footer-note', content.footerNote);
  const heroImage = $('hero-image');
  if (heroImage) { heroImage.src = content.heroImage || 'assets/hero.webp'; heroImage.alt = content.heroImageAlt || ''; }
  const meta = $('hero-meta');
  if (meta) meta.innerHTML = (content.heroMeta || []).map(x => `<span>${escapeHTML(x)}</span>`).join('');
  const worldCards = $('world-cards');
  if (worldCards) worldCards.innerHTML = (content.worldCards || []).map((item, i) => `<article class="world-card"><p class="card-label">${escapeHTML(item.label || `FILE / 0${i+1}`)}</p><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></article>`).join('');
  const monumentCards = $('monuments-list');
  if (monumentCards) monumentCards.innerHTML = (content.monuments || []).map((item, i) => `<article class="monument-card"><span class="monument-kind">${escapeHTML(item.kind || `TYPE / 0${i+1}`)}</span><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.text)}</p></article>`).join('');
  const characters = $('characters-list');
  if (characters) characters.innerHTML = (content.characters || []).map((item, i) => `<article class="character-card"><p class="character-stamp">${escapeHTML(item.stamp || `PERSONNEL / 0${i+1}`)}</p><h3>${escapeHTML(item.name)}</h3><p class="character-role">${escapeHTML(item.role)}</p><p>${escapeHTML(item.text)}</p></article>`).join('');
  const timeline = $('timeline-list');
  if (timeline) timeline.innerHTML = (content.timeline || []).map(item => `<li class="timeline-item"><p class="timeline-date">${escapeHTML(item.when)}</p><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></li>`).join('');
  const credit = $('hero-credit');
  if (credit) credit.textContent = `사진: ${content.photoCredit || ''}`;
  const creditLink = $('photo-credit-link');
  if (creditLink) { creditLink.textContent = content.photoCredit || ''; creditLink.href = content.photoCreditUrl || '#'; }
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? '메뉴 열기' : '메뉴 닫기');
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', '메뉴 열기');
      nav.classList.remove('is-open');
    }));
  }
})();
