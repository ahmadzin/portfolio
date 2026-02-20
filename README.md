# Fullstack Portfolio (Simple)

This repository contains a minimal fullstack portfolio site.

- Backend: Express server in `backend/` that serves the frontend and exposes `/api/projects` and `/api/contact`.
- Frontend: Static site in `frontend/` (HTML/CSS/JS) that fetches projects and submits the contact form.

Quick start (static site)

1. Open `frontend/index.html` in your browser (no server required).

Optional: use a simple static server for local testing (Python or Node).

Python 3:
```powershell
cd frontend
python -m http.server 8000
```

Node (serve package):
```powershell
npm install -g serve
cd frontend
serve .
```

Notes

- Projects are embedded in `frontend/app.js` (static). Replace or extend the array there.
- The contact form opens your mail client via `mailto:` and also saves a local copy to `localStorage`.
- If you later want a backend, the previous `backend/` folder contains an example Express server.
