const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MESSAGE_MIN_LENGTH = 10

export function invalidContactFields({ name, email, subject, message }) {
  return [
    !String(name ?? '').trim() && 'name',
    !EMAIL_PATTERN.test(String(email ?? '').trim()) && 'email',
    !String(subject ?? '').trim() && 'subject',
    String(message ?? '').trim().length < MESSAGE_MIN_LENGTH && 'message',
  ].filter(Boolean)
}
