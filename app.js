// Static projects data (frontend-only)
const projects = [
  {
    id: 1,
    title: 'Task Manager App',
    description: 'Fullstack task management app with REST API and React frontend.',
    tech: ['Node.js', 'Express', 'SQLite', 'Vanilla JS']
  },
  {
    id: 2,
    title: 'E-commerce Prototype',
    description: 'Shopping cart, product pages, and checkout flow.',
    tech: ['Node.js', 'Express', 'Stripe', 'HTML/CSS']
  },
  {
    id: 3,
    title: 'Realtime Chat',
    description: 'WebSocket-powered realtime chat with rooms and presence.',
    tech: ['Node.js', 'Socket.io', 'React']
  }
];

function renderProjects(items){
  const root = document.getElementById('projects-list');
  root.innerHTML = '';
  items.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h4>${p.title}</h4><p>${p.description}</p>`;
    const tech = document.createElement('div');
    tech.className = 'tech';
    p.tech.forEach(t => { const tEl = document.createElement('span'); tEl.className='tag'; tEl.textContent = t; tech.appendChild(tEl); });
    el.appendChild(tech);
    root.appendChild(el);
  });
}

function saveContactLocally(entry){
  try{
    const key = 'portfolio_contacts';
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(entry);
    localStorage.setItem(key, JSON.stringify(arr));
  }catch(e){ console.warn('Could not save contact locally', e); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProjects(projects);
  const form = document.getElementById('contact-form');
  const result = document.getElementById('contact-result');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if(!data.name || !data.email || !data.message){ result.textContent = 'Please fill all fields.'; return; }
    // Save a local copy
    const entry = { id: Date.now(), ...data, date: new Date().toISOString() };
    saveContactLocally(entry);

    // Open mail client with pre-filled content
    const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
    const mailto = `mailto:${data.email}?subject=${subject}&body=${body}`;
    // Trying to open mail client; fallback: inform user
    try{
      window.location.href = mailto;
      result.textContent = 'Opening your mail client...';
      form.reset();
    }catch(err){
      result.textContent = 'Please send an email to your address manually.';
    }
  });
});
