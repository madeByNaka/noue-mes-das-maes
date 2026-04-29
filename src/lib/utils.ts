import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function appendUtmToUrl(url: string): string {
  try {
    const storedUtms = localStorage.getItem('noue-utms')
    if (!storedUtms) return url

    const utms = JSON.parse(storedUtms) as Record<string, string>
    const urlObj = new URL(url)

    Object.entries(utms).forEach(([key, value]) => {
      if (value) urlObj.searchParams.set(key, value)
    })

    return urlObj.toString()
  } catch {
    return url
  }
}

export function captureUtms() {
  const params = new URLSearchParams(window.location.search)
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  const utms: Record<string, string> = {}

  utmKeys.forEach((key) => {
    const value = params.get(key)
    if (value) utms[key] = value
  })

  if (Object.keys(utms).length > 0) {
    localStorage.setItem('noue-utms', JSON.stringify(utms))
  }
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

export function calcDiscount(originalCents: number, currentCents: number): number {
  return Math.round(((originalCents - currentCents) / originalCents) * 100)
}
