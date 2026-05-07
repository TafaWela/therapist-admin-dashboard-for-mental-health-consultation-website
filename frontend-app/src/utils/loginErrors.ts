/**
 * Human-readable login failure from apiFetch errors (includes optional JSON body, status hints).
 */
export function formatLoginError(err: unknown): string {
  if (!(err instanceof Error)) {
    return 'Sign in failed. Please try again.';
  }
  const e = err as Error & { status?: number; body?: unknown };
  let message = e.message || 'Sign in failed.';

  if (e.body != null && typeof e.body === 'object') {
    const b = e.body as Record<string, unknown>;
    const ve = b.validationErrors;
    if (Array.isArray(ve) && ve.length > 0) {
      try {
        message += ` ${JSON.stringify(ve)}`;
      } catch {
        /* ignore */
      }
    } else {
      const snippet = JSON.stringify(e.body);
      if (snippet && snippet !== '{}' && snippet.length < 600) {
        message += ` ${snippet}`;
      }
    }
  } else if (typeof e.body === 'string' && e.body.length > 0 && e.body.length < 500) {
    message += ` ${e.body}`;
  }

  if (e.status === 500) {
    message +=
      ' Server error (500): the Neurea API failed while handling login — check API server logs or contact the backend team.';
  }

  return message;
}
