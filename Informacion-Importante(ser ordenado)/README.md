# SaaS de gestion de ventas

Proyecto base con React + Vite en `frontend/`, Node.js + Express en `backend/` y MySQL en `database/`.

## Frontend

```powershell
cd frontend
npm run dev
```

## Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Antes de arrancar la API, configurar las credenciales de MySQL en `backend/.env` y ejecutar `database/schema.sql`.

La comprobacion de salud queda disponible en `http://localhost:3000/api/health`.
