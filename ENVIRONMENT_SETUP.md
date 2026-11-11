# Environment Setup & Configuration Guide — TRIPORA AI

## 1. Environment Variable Inventory

### Backend Configuration (`backend/.env`)

```env
# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,https://tripora.vercel.app

# Database
DATABASE_URL="postgresql://tripora_admin:tripora_secure_password_2026@localhost:5432/tripora_db?schema=public"

# Authentication
JWT_SECRET="tripora-super-secure-jwt-secret-key-2026"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="tripora-super-secure-refresh-jwt-secret-key-2026"
JWT_REFRESH_EXPIRES_IN="7d"

# AI Integration (Optional - Falls back to high-grade sandbox generator)
AI_PROVIDER="GEMINI"
GEMINI_API_KEY=""
AI_MODEL="gemini-1.5-flash"

# Travel API Integrations (Optional - Falls back to curated sandbox data)
AMADEUS_CLIENT_ID=""
AMADEUS_CLIENT_SECRET=""
OPENWEATHER_API_KEY=""
GOOGLE_MAPS_API_KEY=""

# Commercial Billing (Optional)
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
```

### Frontend Configuration (`.env.local`)

```env
# Connection to Backend REST API
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

---

## 2. Quick Local Start

```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies & generate Prisma client
cd backend
npm install
npx prisma generate
npm run build

# 3. Run backend server (in one terminal)
npm start
# Server starts on http://localhost:5000

# 4. Run frontend client (in another terminal)
cd ..
npm run dev
# Frontend starts on http://localhost:3000
```
