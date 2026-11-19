# APIForge — Full Stack Setup & Deployment Guide

This repository is organized into two standalone directories:
```
api-test-automation/
├── backend/            # FastAPI + PostgreSQL Python engine
├── frontend/           # React + Vite + Ant Design web UI
├── .gitignore          # Root-level ignore rules
└── README.md           # This document
```

---

## 1. Backend Setup (`backend/`)

### Prerequisites:
- Python 3.10+
- PostgreSQL database server running

### Steps:
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables in `.env` (refer to `.env.example`):
   ```ini
   DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<dbname>
   SECRET_KEY=your_secret_key_here
   FRONTEND_URL=http://localhost:5173
   UPLOAD_DIR=uploads
   ```
5. Apply database migrations:
   ```bash
   alembic upgrade head
   ```
6. Start the backend server:
   ```bash
   # Development
   uvicorn main:app --reload --host 0.0.0.0 --port 8000

   # Production
   uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

---

## 2. Frontend Setup (`frontend/`)

### Prerequisites:
- Node.js 18+ and npm

### Steps:
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env` (refer to `.env.example`):
   ```ini
   # Set to your deployed backend URL (or http://localhost:8000 for local dev)
   VITE_API_URL=http://localhost:8000
   ```
4. Run or Build:
   - **Local Development:**
     ```bash
     npm run dev
     ```
     Access UI at `http://localhost:5173`.
   - **Production Build:**
     ```bash
     npm run build
     ```
     Outputs production static files into `frontend/dist/` ready to be served by any static host (Nginx, Vercel, Netlify, Cloudflare Pages, S3, Apache).

---

## 3. Direct Cloud Deployment Without Docker

- **Backend (Render / Railway / Heroku / AWS EC2 / DigitalOcean):**
  - **Root Directory:** `backend`
  - **Build Command:** `pip install -r requirements.txt`
  - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
  - **Environment Variables:** Set `DATABASE_URL`, `SECRET_KEY`, and `FRONTEND_URL`.

- **Frontend (Vercel / Netlify / Cloudflare Pages / Render Static):**
  - **Root Directory:** `frontend`
  - **Build Command:** `npm run build`
  - **Publish Directory:** `dist`
  - **Environment Variable:** `VITE_API_URL=https://<your-backend-domain>`
