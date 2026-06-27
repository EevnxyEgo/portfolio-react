import { Mail, Github, Linkedin, FileText, MapPin } from 'lucide-react'
import { SeoHead } from '../components/primitives/SeoHead.jsx'
import { Reveal } from '../components/primitives/Reveal.jsx'
import { ContactForm } from '../components/contact/ContactForm.jsx'
import { profile } from '../data/profile.js'

const EXTERNAL = { target: '_blank', rel: 'noreferrer' }

export default function Contact() {
  return (
    <>
      <SeoHead
        title="Contact"
        description="Open to work — full-time, freelance, or a conversation. Send Arsenius Audley a message."
        path="/contact"
      />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 sm:px-10">
        <Reveal>
          <h1 className="font-display text-display text-ink">Contact</h1>
          <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
            Open to work — full-time, freelance, or just a conversation. Tell me what you&rsquo;re
            building and how I can help.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:grid-cols-[1.4fr_1fr] sm:gap-14">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="flex flex-col gap-5">
              <p className="font-mono text-xs tracking-[0.1em] text-ink-faint">direct</p>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 text-ink-soft transition-colors hover:text-ink"
              >
                <Mail size={18} aria-hidden="true" className="text-ink-faint" />
                {profile.email}
              </a>
              <a
                href={profile.links.github}
                {...EXTERNAL}
                className="inline-flex items-center gap-3 text-ink-soft transition-colors hover:text-ink"
              >
                <Github size={18} aria-hidden="true" className="text-ink-faint" />
                GitHub
              </a>
              <a
                href={profile.links.linkedin}
                {...EXTERNAL}
                className="inline-flex items-center gap-3 text-ink-soft transition-colors hover:text-ink"
              >
                <Linkedin size={18} aria-hidden="true" className="text-ink-faint" />
                LinkedIn
              </a>
              <a
                href={profile.links.resume}
                {...EXTERNAL}
                className="inline-flex items-center gap-3 text-ink-soft transition-colors hover:text-ink"
              >
                <FileText size={18} aria-hidden="true" className="text-ink-faint" />
                Résumé
              </a>

              <div className="mt-2 flex items-center gap-3 font-mono text-sm text-ink-faint">
                <MapPin size={18} aria-hidden="true" />
                {profile.locationNote}
              </div>
              <p className="inline-flex items-center gap-2 font-mono text-sm text-shipped">
                <span className="h-2 w-2 rounded-full bg-shipped-bright" aria-hidden="true" />
                {profile.availability}
              </p>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  )
}
