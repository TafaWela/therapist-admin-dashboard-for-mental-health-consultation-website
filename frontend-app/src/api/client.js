/**
 * API base: empty string in dev → same-origin /api (Vite proxy).
 * Set VITE_API_BASE_URL for production or when not using the proxy.
 */
export function getApiBase() {
  const raw = import.meta.env.VITE_API_BASE_URL
  if (raw === undefined || raw === null) return ''
  const s = String(raw).trim()
  if (!s) return ''
  return s.replace(/\/$/, '')
}

/**
 * @param {string} path - e.g. /api/users (must start with / when using proxy)
 * @param {RequestInit & { jsonBody?: unknown, skipAuth?: boolean }} options
 */
export async function apiFetch(path, options = {}) {
  const base = getApiBase()
  const pathPart = path.startsWith('/') ? path : `/${path}`
  const url = `${base}${pathPart}`

  const { jsonBody, skipAuth, headers: initHeaders, ...rest } = options
  const headers = { ...(initHeaders || {}) }

  if (jsonBody !== undefined) {
    headers['Content-Type'] = 'application/json'
    rest.body = JSON.stringify(jsonBody)
  }

  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
  if (token && !skipAuth) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, { ...rest, headers })
  const text = await res.text()
  let parsed = text
  if (text) {
    try {
      parsed = JSON.parse(text)
    } catch {
      parsed = text
    }
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    if (parsed && typeof parsed === 'object') {
      message =
        parsed.message ||
        parsed.detail ||
        parsed.title ||
        (Array.isArray(parsed.errors) ? parsed.errors.join(', ') : null) ||
        message
    } else if (typeof parsed === 'string' && parsed) {
      message = parsed
    }
    const err = new Error(message)
    err.status = res.status
    err.body = parsed
    throw err
  }

  return parsed
}
