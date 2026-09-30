# Frontend

## Desarrollo

```bash
npm install
copy .env.example .env
npm run dev
```

El frontend usa `VITE_API_URL` para localizar la API. Por defecto apunta a
`http://localhost:3000/api`.

## Lectura QR

Las pistolas configuradas como teclado envian el codigo y terminan con
`Enter`. En la vista Stock, el codigo se consulta mediante:

```text
GET /api/products/by-code?code=<codigo>
```

La interfaz distingue producto encontrado, codigo inexistente y API no
disponible.
