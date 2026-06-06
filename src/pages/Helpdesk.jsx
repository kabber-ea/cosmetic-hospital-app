import { useState } from 'react'
import { Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Helpdesk() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ email: '', subject: '', message: '' })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = (e) => {
    e.preventDefault()
    console.log('Helpdesk request:', form)
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <section className="card p-8 md:p-10">
        <div className="mb-8 flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-100 text-rose-700"><Mail /></span>
          <div>
            <h1 className="text-3xl font-black">{t.contactHelp}</h1>
            <p className="text-slate-500">help@cosmeticcare-demo.com</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <input required type="email" className="input" placeholder={t.email} value={form.email} onChange={(e) => update('email', e.target.value)} />
          <input required className="input" placeholder={t.subject} value={form.subject} onChange={(e) => update('subject', e.target.value)} />
          <textarea required className="input min-h-40" placeholder={t.message} value={form.message} onChange={(e) => update('message', e.target.value)} />
          <button className="btn-primary w-full" type="submit">{t.send}</button>
        </form>
        {sent && <p className="mt-5 rounded-2xl bg-green-50 p-4 font-semibold text-green-700">{t.formSuccess}</p>}
      </section>
    </div>
  )
}
