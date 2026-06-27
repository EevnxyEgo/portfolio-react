// Client-side validation for the contact form. Returns { ok, errors } where errors is a
// map of field → message. Kept pure so it's easy to unit-test.
export function validateContact({ name, email, message }) {
  const errors = {}

  if (!name || !name.trim()) {
    errors.name = 'Please enter your name.'
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || '').trim())
  if (!emailOk) {
    errors.email = 'Enter a valid email address.'
  }

  if (!message || message.trim().length < 10) {
    errors.message = 'A little more detail helps — at least 10 characters.'
  }

  return { ok: Object.keys(errors).length === 0, errors }
}
