import { Link, Outlet, NavLink } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'
import { languageOptions, useLanguage } from './context/LanguageContext.jsx'

export default function App() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3 font-bold text-slate-950">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-100 text-rose-700"><HeartPulse size={22} /></span>
            <span>{t.appName}</span>
          </Link>
          <nav className="flex items-center gap-3">
            <NavLink to="/" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-100">{t.home}</NavLink>
            <NavLink to="/helpdesk" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-100">{t.helpdesk}</NavLink>
            <label className="sr-only">{t.language}</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
              {languageOptions.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
            </select>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8"><Outlet /></main>
    </div>
  )
}
