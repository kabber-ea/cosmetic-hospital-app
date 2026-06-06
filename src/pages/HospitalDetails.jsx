import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, DollarSign } from 'lucide-react'
import hospitals from '../data/hospitals.json'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function HospitalDetails() {
  const { hospitalId } = useParams()
  const { language, t } = useLanguage()
  const hospital = hospitals.find((item) => item.id === hospitalId)
  if (!hospital) return <p>Hospital not found</p>

  return (
    <div className="space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-slate-950"><ArrowLeft size={18} /> {t.back}</Link>
      <section className="card overflow-hidden">
        <img src={hospital.image} alt={hospital.name[language]} className="h-72 w-full object-cover" />
        <div className="space-y-3 p-8">
          <p className="font-semibold text-rose-700">{hospital.city}, {hospital.country}</p>
          <h1 className="text-4xl font-black">{hospital.name[language]}</h1>
          <p className="max-w-3xl text-lg text-slate-600">{hospital.summary[language]}</p>
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        {hospital.procedures.map((procedure) => (
          <article key={procedure.id} className="card space-y-4 p-6">
            <h2 className="text-2xl font-black">{procedure.name[language]}</h2>
            <p className="text-slate-600">{procedure.details[language]}</p>
            <div className="grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-2">
              <span className="flex items-center gap-2"><Clock size={16} /> {procedure.duration}</span>
              <span className="flex items-center gap-2"><DollarSign size={16} /> {procedure.price}</span>
            </div>
            <Link to={`/hospital/${hospital.id}/procedure/${procedure.id}`} className="btn-primary inline-flex">{t.viewDetails}</Link>
          </article>
        ))}
      </section>
    </div>
  )
}
