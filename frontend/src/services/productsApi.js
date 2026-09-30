const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function findProductByScanCode(scanCode) {
  const query = new URLSearchParams({ code: scanCode })
  const response = await fetch(`${apiUrl}/products/by-code?${query}`)
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(payload.message || 'No se pudo buscar el producto.')
    error.code = payload.error || 'request_failed'
    error.status = response.status
    throw error
  }

  return payload.data
}