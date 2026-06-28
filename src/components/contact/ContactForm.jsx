import { useRef, useState } from 'react'
import { AlertCircle, Check, Loader2 } from 'lucide-react'
import { validateContact } from '../../lib/validateContact.js'
import { profile } from '../../data/profile.js'
import { cn } from '../../lib/cn.js'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const ENDPOINT = 'https://api.web3forms.com/submit'

const EMPTY = { name: '', email: '', message: '' }

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-xs text-ink-soft">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-alert">
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const honeypotRef = useRef(null)

  const fieldClass = (invalid) =>
    cn(
      'w-full rounded-lg border bg-raised px-3.5 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none',
      invalid ? 'border-alert' : 'border-rule',
    )

  function update(key) {
    return (e) => setValues((v) => ({ ...v, [key]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const result = validateContact(values)
    setErrors(result.errors)
    if (!result.ok) return
    if (honeypotRef.current?.value) return // bot trap silently ignored

    // No key configured → degrade to a prefilled mailto so the form still works.
    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${values.name}`)
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${values.name}`,
          from_name: 'Arsenius portfolio',
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setValues(EMPTY)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-shipped bg-raised p-6" role="status">
        <p className="flex items-center gap-2 font-display text-xl text-ink">
          <Check size={20} className="text-shipped" aria-hidden="true" /> Message sent
        </p>
        <p className="mt-2 text-ink-soft">
          Thanks — I&rsquo;ll get back to you soon. You can also reach me at{' '}
          <a href={`mailto:${profile.email}`} className="text-shipped underline-offset-4 hover:underline">
            {profile.email}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field id="name" label="your name" error={errors.name}>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={fieldClass(errors.name)}
          placeholder="Jordan from Acme"
        />
      </Field>

      <Field id="email" label="your email" error={errors.email}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={fieldClass(errors.email)}
          placeholder="jordan@acme.com"
        />
      </Field>

      <Field id="message" label="your message" error={errors.message}>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(fieldClass(errors.message), 'resize-y')}
          placeholder="What are you building, and how can I help?"
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <input
        ref={honeypotRef}
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 rounded-full bg-shipped px-5 py-2.5 font-mono text-sm text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === 'submitting' && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'error' && (
          <p className="flex items-center gap-1.5 text-sm text-alert" role="alert">
            <AlertCircle size={14} aria-hidden="true" />
            Something went wrong. Email me directly at{' '}
            <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
              {profile.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  )
}
