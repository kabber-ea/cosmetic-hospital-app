import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Stethoscope } from 'lucide-react'
import hospitals from '../data/hospitals.json'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Home() {
  const { language, t } = useLanguage()
  const [country, setCountry] = useState('All')
  const [query, setQuery] = useState('')
  const countries = ['All', 'China', 'Japan', 'Korea']

  const filtered = useMemo(() => hospitals.filter((hospital) => {
    const q = query.toLowerCase().trim()
    const matchesCountry = country === 'All' || hospital.country === country
    const haystack = [hospital.city, hospital.country, hospital.name.en, hospital.name[language], ...hospital.procedures.map(p => `${p.name.en} ${p.name[language]}`)].join(' ').toLowerCase()
    return matchesCountry && (!q || haystack.includes(q))
  }), [country, query, language])

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-8 text-white shadow-soft md:p-12">
        <div className="max-w-3xl space-y-5">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">China • Japan • Korea</span>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">{t.heroTitle}</h1>
          <p className="text-lg text-slate-200">{t.heroText}</p>
        </div>
      </section>

      <section className="card p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input className="input pl-12" placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <select className="input" value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map(c => <option key={c} value={c}>{c === 'All' ? t.allCountries : c}</option>)}
          </select>
        </div>
      </section>

      {filtered.length === 0 && <div className="card p-10 text-center font-semibold text-slate-500">{t.noResults}</div>}

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((hospital) => (
          <article key={hospital.id} className="card overflow-hidden">
            <img src={hospital.image} alt={hospital.name[language]} className="h-52 w-full object-cover" />
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-700"><MapPin size={16} /> {hospital.city}, {hospital.country}</div>
              <h2 className="text-2xl font-black">{hospital.name[language]}</h2>
              <p className="text-slate-600">{hospital.summary[language]}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500"><Stethoscope size={16} /> {hospital.procedures.length} {t.procedures}</div>
              <Link to={`/hospital/${hospital.id}`} className="btn-primary inline-flex w-full justify-center">{t.viewHospital}</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
