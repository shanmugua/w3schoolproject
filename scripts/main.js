// W3Learn - Main JavaScript

// Search data
const searchData = [
  { title: 'HTML Introduction', desc: 'Learn what HTML is and how it works', url: 'tutorials/html.html', tag: 'HTML' },
  { title: 'HTML Elements', desc: 'HTML elements and tags reference', url: 'tutorials/html.html#elements', tag: 'HTML' },
  { title: 'HTML Forms', desc: 'Build interactive HTML forms', url: 'tutorials/html.html#forms', tag: 'HTML' },
  { title: 'HTML Tables', desc: 'Create tables in HTML', url: 'tutorials/html.html#tables', tag: 'HTML' },
  { title: 'CSS Introduction', desc: 'Learn what CSS is and how it styles pages', url: 'tutorials/css.html', tag: 'CSS' },
  { title: 'CSS Selectors', desc: 'How to select HTML elements', url: 'tutorials/css.html#selectors', tag: 'CSS' },
  { title: 'CSS Flexbox', desc: 'Layout with CSS Flexbox', url: 'tutorials/css.html#flexbox', tag: 'CSS' },
  { title: 'CSS Grid', desc: 'CSS Grid layout system', url: 'tutorials/css.html#grid', tag: 'CSS' },
  { title: 'JavaScript Introduction', desc: 'Learn JavaScript basics', url: 'tutorials/javascript.html', tag: 'JS' },
  { title: 'JavaScript Functions', desc: 'Functions in JavaScript', url: 'tutorials/javascript.html#functions', tag: 'JS' },
  { title: 'JavaScript DOM', desc: 'DOM manipulation with JavaScript', url: 'tutorials/javascript.html#dom', tag: 'JS' },
  { title: 'Python Introduction', desc: 'Get started with Python', url: 'tutorials/python.html', tag: 'Python' },
  { title: 'Python Lists', desc: 'Working with lists in Python', url: 'tutorials/python.html#lists', tag: 'Python' },
  { title: 'SQL SELECT', desc: 'Query data with SQL SELECT', url: 'tutorials/sql.html', tag: 'SQL' },
  { title: 'SQL WHERE', desc: 'Filter data with SQL WHERE', url: 'tutorials/sql.html#where', tag: 'SQL' },
  { title: 'React Introduction', desc: 'Learn React basics', url: 'tutorials/react.html', tag: 'React' },
  { title: 'HTML Color Names', desc: 'All HTML color names', url: 'references.html#colors', tag: 'Ref' },
  { title: 'HTTP Status Codes', desc: 'Complete HTTP status code reference', url: 'references.html#http', tag: 'Ref' },
];

function handleSearch(e) {
  const val = e.target.value.trim().toLowerCase();
  const resultsEl = document.getElementById('searchResults');
  if (!val || val.length < 2) { resultsEl.style.display = 'none'; return; }
  const matches = searchData.filter(item =>
    item.title.toLowerCase().includes(val) ||
    item.desc.toLowerCase().includes(val) ||
    item.tag.toLowerCase().includes(val)
  ).slice(0, 8);
  if (!matches.length) { resultsEl.style.display = 'none'; return; }
  resultsEl.innerHTML = matches.map(m => `
    <div class="search-result-item" onclick="window.location='${m.url}'">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
        <span class="tag">${m.tag}</span>
        <h5>${m.title}</h5>
      </div>
      <p>${m.desc}</p>
    </div>
  `).join('');
  resultsEl.style.display = 'block';
}

// Close search on outside click
document.addEventListener('click', (e) => {
  const sr = document.getElementById('searchResults');
  if (sr && !e.target.closest('.search-box') && !e.target.closest('.search-results')) {
    sr.style.display = 'none';
  }
});

// Mobile menu
function toggleMobileMenu() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}

// Typewriter effect on hero
const lines = [
  '<span class="tag">&lt;!DOCTYPE html&gt;</span>',
  '<span class="tag">&lt;html&gt;</span>',
  '  <span class="tag">&lt;head&gt;</span>',
  '    <span class="tag">&lt;title&gt;</span><span class="txt">My Page</span><span class="tag">&lt;/title&gt;</span>',
  '  <span class="tag">&lt;/head&gt;</span>',
  '  <span class="tag">&lt;body&gt;</span>',
  '    <span class="tag">&lt;h1&gt;</span><span class="txt">Hello World!</span><span class="tag">&lt;/h1&gt;</span>',
  '    <span class="tag">&lt;p&gt;</span><span class="txt">Start learning!</span><span class="tag">&lt;/p&gt;</span>',
  '  <span class="tag">&lt;/body&gt;</span>',
  '<span class="tag">&lt;/html&gt;</span>',
];
const tw = document.getElementById('typewriter');
if (tw) {
  let li = 0, ci = 0;
  const stripped = lines.map(l => l.replace(/<[^>]+>/g, ''));
  let displayed = '';
  function typeNext() {
    if (li >= lines.length) {
      tw.innerHTML = displayed + '<span class="cursor"></span>';
      return;
    }
    const plain = stripped[li];
    if (ci <= plain.length) {
      // Count chars up to ci in original html line
      let count = 0, idx = 0, html = lines[li];
      let result = '';
      while (idx < html.length && count <= ci) {
        if (html[idx] === '<') {
          const end = html.indexOf('>', idx);
          result += html.slice(idx, end + 1);
          idx = end + 1;
        } else {
          if (count < ci) result += html[idx];
          count++;
          idx++;
        }
      }
      tw.innerHTML = displayed + result + '<span class="cursor"></span>';
      ci++;
      setTimeout(typeNext, ci === 1 ? 80 : 35);
    } else {
      displayed += lines[li] + '\n';
      li++;
      ci = 0;
      setTimeout(typeNext, 150);
    }
  }
  setTimeout(typeNext, 600);
}

// Sidebar active link based on scroll
function initSidebarScroll() {
  const links = document.querySelectorAll('.sidebar-link[href*="#"]');
  if (!links.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.sidebar-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('[id]').forEach(el => observer.observe(el));
}
initSidebarScroll();

// Copy code button
document.querySelectorAll('.code-btn[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.copy);
    if (target) {
      navigator.clipboard.writeText(target.innerText).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.background = 'var(--green)';
        btn.style.color = '#fff';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1500);
      });
    }
  });
});

// Exercise checker
function checkExercise(inputId, answer, feedbackId) {
  const input = document.getElementById(inputId);
  const feedback = document.getElementById(feedbackId);
  if (!input || !feedback) return;
  const val = input.value.trim().toLowerCase();
  const correct = answer.trim().toLowerCase();
  if (val === correct || val.replace(/\s+/g, '') === correct.replace(/\s+/g, '')) {
    input.className = 'ex-input correct';
    feedback.textContent = '✓ Correct! Well done!';
    feedback.className = 'ex-feedback ok';
  } else {
    input.className = 'ex-input wrong';
    feedback.textContent = `✗ Not quite. Hint: starts with "${answer[0]}"`;
    feedback.className = 'ex-feedback err';
  }
}

// Run editor
function runEditor() {
  const html = document.getElementById('editor-html')?.value || '';
  const css = document.getElementById('editor-css')?.value || '';
  const js = document.getElementById('editor-js')?.value || '';
  const frame = document.getElementById('preview-frame');
  if (!frame) return;
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`);
  doc.close();
}

// Format/reset editor
function resetEditor() {
  const defaults = {
    html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n\n  <h1>Hello World!</h1>\n  <p>Write your HTML here...</p>\n\n</body>\n</html>`,
    css: `body {\n  font-family: Arial, sans-serif;\n  background: #f0f0f0;\n  padding: 20px;\n}\n\nh1 {\n  color: #04AA6D;\n}`,
    js: `// Your JavaScript here\nconsole.log('Hello World!');\n\ndocument.querySelector('h1').style.color = 'steelblue';`
  };
  const h = document.getElementById('editor-html');
  const c = document.getElementById('editor-css');
  const j = document.getElementById('editor-js');
  if (h) h.value = defaults.html;
  if (c) c.value = defaults.css;
  if (j) j.value = defaults.js;
  runEditor();
}

// Accordion for FAQ/reference
document.querySelectorAll('.accordion-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.parentElement;
    item.classList.toggle('open');
  });
});
