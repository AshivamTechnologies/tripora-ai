# Deployment & DevOps Guide — Render, Vercel & Docker

## 1. Vercel Deployment (Frontend)

The Next.js frontend is configured for deployment to **Vercel**:
1. Connect your GitHub repository (`https://github.com/Ritikgupta-tech/tripora-ai.git`).
2. Framework Preset: **Next.js**
3. Root Directory: `./` (Root)
4. Environment Variables:
   - `NEXT_PUBLIC_API_URL`: URL of your deployed Render backend (e.g. `https://tripora-backend.onrender.com`).
   - `NODE_ENV`: `production`
5. Deployment will automatically run `npm run build` and generate static/serverless routes.

---

## 2. Render Deployment (Backend + Database)

The backend is configured for deployment to **Render** using `render.yaml`:
1. In the Render Dashboard, click **New +** &rarr; **Blueprint**.
2. Select your repository (`Ritikgupta-tech/tripora-ai`).
3. Render automatically provisions:
   - **`tripora-ai-backend`**: Node.js web service running `node dist/server.js` with root directory set to `backend`.
   - **`tripora-ai-postgres`**: Managed PostgreSQL database with automatic connection string injection into `DATABASE_URL`.
4. Add your optional `GEMINI_API_KEY` in the Render environment variables tab.

---

## 3. Docker & Docker Compose (Containerized Production)

To run the entire platform locally or on a VPS (AWS EC2, DigitalOcean, Hetzner):

```bash
# Clone the repository
git clone https://github.com/Ritikgupta-tech/tripora-ai.git
cd tripora-ai

# Start PostgreSQL, Redis, Backend, and Frontend containers
docker-compose up --build -d

# Check running services
docker-compose ps
```

- Frontend accessible at: `http://localhost:3000`
- Backend API accessible at: `http://localhost:5000`
- Health check: `http://localhost:5000/health`
