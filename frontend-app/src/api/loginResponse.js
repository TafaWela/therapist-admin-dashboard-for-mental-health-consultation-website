/**
 * Maps Neurea POST /api/auth/login responses (OpenAPI does not document the body).
 * Probe with a real account: token may be access | access_token | token | data.access, etc.
 */

export function decodeJwtPayload(token) {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = atob(b64)
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function extractTokenFromLoginResponse(data) {
  if (!data || typeof data !== 'object') return null
  const direct =
    data.access ??
    data.access_token ??
    data.accessToken ??
    data.token ??
    data.Token ??
    data.jwt ??
    data.jwt_token
  if (direct) return String(direct)
  const nested = data.data
  if (nested && typeof nested === 'object') {
    const t =
      nested.access ??
      nested.access_token ??
      nested.token
    if (t) return String(t)
  }
  return null
}

export function extractRawUserFromLoginResponse(data) {
  if (!data || typeof data !== 'object') return null
  const candidates = [
    data.user,
    data.User,
    data.profile,
    data.data?.user,
    data.account,
  ]
  for (const c of candidates) {
    if (c && typeof c === 'object' && (c.email != null || c.id != null || c.pk != null)) {
      return c
    }
  }
  return null
}

function resolveRole(apiUser, jwtPayload) {
  const u = apiUser || {}
  const t = jwtPayload || {}

  if (u.is_staff === true || u.is_superuser === true) return 'admin'
  if (String(u.is_staff).toLowerCase() === 'true') return 'admin'

  const roleFields = [u.role, u.user_type, u.userType, u.Role]
  for (const r of roleFields) {
    if (r == null) continue
    const s = String(r).toLowerCase()
    if (s.includes('admin')) return 'admin'
    if (s.includes('staff') && u.is_staff !== false) return 'admin'
  }

  const claimRole = t.role || t['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  const roles = Array.isArray(claimRole) ? claimRole : claimRole != null ? [claimRole] : []
  for (const r of roles) {
    if (String(r).toLowerCase().includes('admin')) return 'admin'
  }
  if (t.is_staff === true || String(t.is_staff).toLowerCase() === 'true') return 'admin'

  return 'therapist'
}

export function buildAppUserFromLogin({ data, email, token }) {
  const rawUser = extractRawUserFromLoginResponse(data)
  const jwtPayload = token ? decodeJwtPayload(token) : null
  const role = resolveRole(rawUser, jwtPayload)

  const idNum = rawUser?.id ?? rawUser?.user_id ?? rawUser?.pk ?? jwtPayload?.nameid ?? jwtPayload?.sub
  const id = idNum != null ? String(idNum) : String(Date.now())

  const first = rawUser?.first_name ?? rawUser?.firstName ?? ''
  const last = rawUser?.last_name ?? rawUser?.lastName ?? ''
  const username = rawUser?.username ?? ''
  const userEmail =
    rawUser?.email ??
    jwtPayload?.email ??
    jwtPayload?.unique_name ??
    jwtPayload?.upn ??
    email ??
    ''
  const name =
    [first, last].filter(Boolean).join(' ') ||
    username ||
    (userEmail ? userEmail.split('@')[0] : 'User')

  return {
    id,
    name,
    email: userEmail,
    role,
    avatar: rawUser?.profile_image || rawUser?.profileImage || rawUser?.avatar || '',
    status: 'active',
    createdAt: new Date().toISOString(),
  }
}
