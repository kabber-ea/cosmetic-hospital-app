import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Clock, DollarSign, ShieldCheck, UserRound } from 'lucide-react'
import hospitals from '../data/hospitals.json'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function ProcedureDetails() {
  const { hospitalId, procedureId } = useParams()
  const { language, t } = useLanguage()
  const [showLegal, setShowLegal] = useState(false)
  const hospital = hospitals.find((item) => item.id === hospitalId)
  const procedure = hospital?.procedures.find((item) => item.id === procedureId)
  if (!hospital || !procedure) return <p>Procedure not found</p>

  return (
    <div className="space-y-8">
      <Link to={`/hospital/${hospital.id}`} className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-slate-950"><ArrowLeft size={18} /> {t.back}</Link>
      <section className="card p-8">
        <p className="font-semibold text-rose-700">{hospital.name[language]}</p>
        <h1 className="mt-2 text-4xl font-black">{procedure.name[language]}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{procedure.details[language]}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5 font-semibold"><Clock className="mb-2" />{t.duration}: {procedure.duration}</div>
          <div className="rounded-2xl bg-slate-50 p-5 font-semibold"><DollarSign className="mb-2" />{t.price}: {procedure.price}</div>
        </div>
        <button onClick={() => setShowLegal(true)} className="btn-danger mt-8 inline-flex items-center gap-2"><ShieldCheck size={20} /> {t.legal}</button>
      </section>

      <section className="card p-8">
        <h2 className="mb-5 text-2xl font-black">{t.doctors}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {procedure.doctors.map((doctor) => (
            <div key={doctor} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-700"><UserRound /></span>
              <div><p className="font-bold">{doctor}</p><p className="text-sm text-slate-500">{procedure.name[language]}</p></div>
            </div>
          ))}
        </div>
      </section>

      {showLegal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <div className="max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-red-100 text-red-700"><AlertTriangle /></span>
              <div>
                <h3 className="text-2xl font-black">{t.legal}</h3>
                <p className="mt-3 text-slate-600">{procedure.legal[language]}</p>
                <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-800">This is placeholder guidance for demo only. Replace with verified legal text from official authorities before production.</p>
                <button onClick={() => setShowLegal(false)} className="btn-primary mt-6">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
