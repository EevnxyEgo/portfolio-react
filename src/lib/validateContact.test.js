import { describe, it, expect } from 'vitest'
import { validateContact } from './validateContact.js'

describe('validateContact', () => {
  it('accepts a complete, valid submission', () => {
    const { ok, errors } = validateContact({
      name: 'Recruiter',
      email: 'hire@acme.com',
      message: 'We have a role that needs shipping.',
    })
    expect(ok).toBe(true)
    expect(errors).toEqual({})
  })

  it('flags an empty name', () => {
    const { ok, errors } = validateContact({ name: '   ', email: 'a@b.co', message: 'long enough message' })
    expect(ok).toBe(false)
    expect(errors.name).toBeTruthy()
  })

  it('flags an invalid email', () => {
    const { errors } = validateContact({ name: 'A', email: 'not-an-email', message: 'long enough message' })
    expect(errors.email).toBeTruthy()
  })

  it('flags a too-short message', () => {
    const { errors } = validateContact({ name: 'A', email: 'a@b.co', message: 'hi' })
    expect(errors.message).toBeTruthy()
  })
})
