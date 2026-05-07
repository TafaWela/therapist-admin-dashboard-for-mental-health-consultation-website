import { apiFetch } from './client.js'

export function loginRequest(email, password) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    skipAuth: true,
    jsonBody: { email, password },
  })
}

export function fetchUsers() {
  return apiFetch('/api/users')
}

export function fetchUserById(id) {
  return apiFetch(`/api/users/${encodeURIComponent(id)}`)
}

export function fetchTherapistPatients(therapistId) {
  return apiFetch(`/api/users/therapist/${encodeURIComponent(therapistId)}/patients`)
}

export function fetchTherapistSessions(therapistId) {
  return apiFetch(`/api/users/therapist/${encodeURIComponent(therapistId)}/sessions`)
}

export function fetchTherapistMedicines(therapistId) {
  return apiFetch(`/api/users/therapist/${encodeURIComponent(therapistId)}/medicines`)
}

export function fetchTherapistPayments(therapistId) {
  return apiFetch(`/api/users/therapist/${encodeURIComponent(therapistId)}/payments`)
}

export function fetchTherapistDashboard(therapistId) {
  return apiFetch(`/api/users/therapist/${encodeURIComponent(therapistId)}/dashboard`)
}

export function fetchTherapistAvailabilitySlots(therapistId) {
  return apiFetch(`/api/ApiAvailabilitySlots/therapist/${encodeURIComponent(therapistId)}/slots`)
}

export function fetchTherapistProfiles() {
  return apiFetch('/api/ApiTherapistProfile')
}

export function fetchReports() {
  return apiFetch('/api/ApiReport')
}

function asArray(maybe) {
  if (Array.isArray(maybe)) return maybe
  if (maybe?.data && Array.isArray(maybe.data)) return maybe.data
  if (maybe?.items && Array.isArray(maybe.items)) return maybe.items
  return []
}

export function normalizeUsersPayload(payload) {
  return asArray(payload)
}

export function mapApiPatientToAdminRow(p, index) {
  const first = p.firstName ?? p.first_name ?? ''
  const last = p.lastName ?? p.last_name ?? ''
  const name = [first, last].filter(Boolean).join(' ') || p.username || p.email || 'Unknown'
  const id = p.id != null ? `#P-${p.id}` : `#P-${index}`
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const colors = [
    'bg-blue-100 text-blue-600',
    'bg-emerald-100 text-emerald-600',
    'bg-purple-100 text-purple-600',
  ]
  return {
    id,
    name,
    initials,
    email: p.email || '—',
    plan: 'standard',
    status: 'active',
    date: p.birthday || '—',
    color: colors[index % colors.length],
  }
}

export function mapApiPatientToTherapistRow(p, index) {
  const first = p.firstName ?? p.first_name ?? ''
  const last = p.lastName ?? p.last_name ?? ''
  const initials = [first, last].map((s) => s[0]).join('').toUpperCase() || 'P'
  const palette = [
    { mood: 'stable', moodLabel: '—', colorBg: 'bg-gray-100', colorText: 'text-gray-600' },
    { mood: 'anxious', moodLabel: '—', colorBg: 'bg-blue-100', colorText: 'text-blue-600' },
  ]
  const pick = palette[index % palette.length]
  return {
    id: p.id != null ? `P-${p.id}` : `P-${index}`,
    firstName: first || '—',
    lastName: last || '',
    initials,
    plan: 'standard',
    mood: pick.mood,
    nextSession: '—',
    moodLabel: pick.moodLabel,
    colorBg: pick.colorBg,
    colorText: pick.colorText,
  }
}

export function mapDashboardStats(raw) {
  if (!raw || typeof raw !== 'object') {
    return {
      activePatients: null,
      hoursCompleted: null,
      upcomingEarnings: null,
      chatSessionsToday: null,
    }
  }
  const r = raw
  return {
    activePatients:
      r.activePatients ?? r.active_patients ?? r.patientCount ?? r.patients_count ?? null,
    hoursCompleted: r.hoursCompleted ?? r.hours_completed ?? r.hoursThisWeek ?? null,
    upcomingEarnings:
      r.upcomingEarnings ?? r.upcoming_earnings ?? r.pendingPayout ?? r.pending_payout ?? null,
    chatSessionsToday:
      r.chatSessionsToday ?? r.sessions_today ?? r.todaySessions ?? r.sessionsToday ?? null,
  }
}

export function formatSessionTime(iso) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleString(undefined, { hour: 'numeric', minute: '2-digit' })
  } catch {
    return String(iso)
  }
}

export function mapSessionToOverviewCard(s) {
  const name = s.patientName ?? s.patient_name ?? 'Patient'
  const when = formatSessionTime(s.sessionDate ?? s.session_date)
  const topic = s.progressLevel ?? s.progress_level ?? s.status ?? 'Session'
  return {
    patientName: name,
    timeLabel: when,
    topic,
    sessionId: s.sessionId ?? s.session_id,
    raw: s,
  }
}

export function mapMedicineToPrescription(m, index) {
  const dateRaw = m.startDate ?? m.start_date
  let date = '—'
  if (dateRaw) {
    try {
      date = new Date(dateRaw).toLocaleDateString(undefined, { dateStyle: 'medium' })
    } catch {
      date = String(dateRaw)
    }
  }
  return {
    id: m.medicineId ?? m.medicine_id ?? m.id ?? index,
    patientName: m.patientName ?? m.patient_name ?? '—',
    patientId: m.patientId != null ? `#P-${m.patientId}` : '—',
    medication: m.name ?? '—',
    dosage: m.dosage ?? '—',
    freq: m.scheduledTime ?? m.scheduled_time ?? '—',
    date,
  }
}

export function mapPaymentToTransaction(p, index) {
  const amount = p.amount ?? p.Amount ?? p.total ?? p.value
  const num = typeof amount === 'number' ? amount : parseFloat(String(amount || '0'))
  const signed = Number.isFinite(num) ? num : 0
  const isNegative = signed < 0
  const title = p.title ?? p.description ?? p.patientName ?? p.reference ?? `Payment ${index + 1}`
  const status = p.status ?? p.state ?? '—'
  const dateRaw = p.date ?? p.created_at ?? p.createdAt
  let date = '—'
  if (dateRaw) {
    try {
      date = new Date(dateRaw).toLocaleDateString(undefined, { dateStyle: 'medium' })
    } catch {
      date = String(dateRaw)
    }
  }
  return {
    id: p.id ?? index,
    date,
    title,
    type: p.type ?? 'Session',
    typeIcon: 'ph-chat-teardrop-text',
    amount: `${signed >= 0 ? '+' : ''}$${Math.abs(signed).toFixed(2)}`,
    status,
    isNegative,
  }
}

export function filterPatientsFromUsers(users) {
  return users.filter((u) => {
    const t = (u.user_type ?? u.userType ?? u.role ?? '').toString().toLowerCase()
    if (t.includes('patient')) return true
    if (t.includes('therapist') || t.includes('admin')) return false
    if (u.is_staff === true) return false
    return true
  })
}

export function mapApiUserToAdminPatientRow(u, index) {
  const first = u.firstName ?? u.first_name ?? ''
  const last = u.lastName ?? u.last_name ?? ''
  const name = [first, last].filter(Boolean).join(' ') || u.username || u.email || 'User'
  const id = u.id != null ? `#P-${u.id}` : `#P-${index}`
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const colors = [
    'bg-blue-100 text-blue-600',
    'bg-emerald-100 text-emerald-600',
    'bg-purple-100 text-purple-600',
  ]
  let date = '—'
  const dateRaw = u.created_at ?? u.createdAt ?? u.date_joined ?? u.joinedDate
  if (dateRaw) {
    try {
      date = new Date(dateRaw).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      date = String(dateRaw)
    }
  }
  const sub = (u.subscription ?? u.plan ?? '').toString().toLowerCase()
  const plan = sub.includes('pro') ? 'pro' : 'standard'
  const active = u.is_active !== false && u.status !== 'suspended' && u.status !== 'inactive'
  return {
    id,
    name,
    initials,
    email: u.email || '—',
    plan,
    status: active ? 'active' : 'suspended',
    date,
    color: colors[index % colors.length],
  }
}

export function mapTherapistProfileToDirectory(p, index) {
  const spec = p.specialization ?? '—'
  const uid = p.user_id ?? p.userId
  return {
    key: p.id ?? index,
    id: p.id,
    userId: uid,
    subtitle: `${spec} • user ${uid ?? '—'}`,
    imageSeed: uid ?? index,
    profileImage:
      typeof p.profile_image === 'string'
        ? p.profile_image
        : typeof p.profileImage === 'string'
          ? p.profileImage
          : null,
  }
}

function reportIsResolved(r) {
  const raw = r.status ?? r.Status ?? r.resolved ?? r.is_resolved
  if (raw === true) return true
  const s = String(raw ?? '').toLowerCase()
  return s.includes('resolved') || s.includes('closed') || s.includes('complete')
}

export function splitReportsByStatus(list) {
  const pending = []
  const resolved = []
  for (const r of list) {
    if (reportIsResolved(r)) resolved.push(r)
    else pending.push(r)
  }
  if (pending.length === 0 && resolved.length === 0 && list.length > 0) {
    return { pending: list, resolved: [] }
  }
  return { pending, resolved }
}

export function formatReportRow(r, index) {
  const id = r.id != null ? `#REP-${r.id}` : `#REP-${index}`
  const issue = r.primary_issue ?? r.primaryIssue ?? '—'
  const when = r.created_at ?? r.createdAt
  let whenLabel = '—'
  if (when) {
    try {
      whenLabel = new Date(when).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    } catch {
      whenLabel = String(when)
    }
  }
  const byUser = r.user_id ?? r.userId
  return {
    id,
    issue,
    details: r.details ?? '',
    whenLabel,
    reporterLabel: byUser != null ? `User #${byUser}` : '—',
    raw: r,
  }
}
