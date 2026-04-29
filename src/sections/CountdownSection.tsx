import { useEffect, useState } from 'react'

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

// Defina aqui a data/hora de encerramento da promoção (UTC-3)
const PROMO_END_DATE = new Date('2026-05-12T23:59:59-03:00')

function calcTimeLeft(): TimeLeft {
  const diff = PROMO_END_DATE.getTime() - Date.now()
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 }

  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const hasEnded = timeLeft.dias === 0 && timeLeft.horas === 0 && timeLeft.minutos === 0 && timeLeft.segundos === 0

  return (
    <div className="bg-noue-charcoal text-white py-3 px-4 text-center">
      <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-noue-gold mb-1">
        Mês das Mães · Oferta especial
      </p>
      {hasEnded ? (
        <p className="text-sm font-semibold">Promoção encerrada</p>
      ) : (
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <span className="text-xs uppercase tracking-wider text-white/70 hidden sm:inline">
            Promoção acaba em
          </span>
          {[
            { label: 'dias', value: timeLeft.dias },
            { label: 'horas', value: timeLeft.horas },
            { label: 'min', value: timeLeft.minutos },
            { label: 'seg', value: timeLeft.segundos },
          ].map(({ label, value }, idx) => (
            <div key={label} className="flex items-center gap-3 sm:gap-5">
              {idx > 0 && <span className="text-noue-gold font-bold text-lg">:</span>}
              <div className="flex flex-col items-center">
                <span className="font-mono font-bold text-xl sm:text-2xl leading-none text-white">
                  {pad(value)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 mt-0.5">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
