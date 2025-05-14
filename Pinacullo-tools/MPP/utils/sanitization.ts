// utils/sanitize.ts


export const sanitizePassword = (input: unknown): string => {
  const raw = typeof input === 'string' ? input : String(input ?? '')

  return raw
    .trim()
    // Remove espaços e quebras perigosas
    .replace(/\s+/g, '')
    // Remove comandos comuns de SQL ou XSS
    .replace(/(['"`;\\])/g, '')
    .replace(/--/g, '')
    .replace(/\b(SELECT|UPDATE|DELETE|INSERT|DROP|UNION|OR|AND)\b/gi, '')
}
// utils/sanitize.ts

export const sanitizeText = (input: unknown): string => {
  const raw = typeof input === 'string' ? input : String(input ?? '')

  return raw
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/(['"`;\\])/g, '')
    .replace(/--/g, '')
    .replace(/\b(SELECT|UPDATE|DELETE|INSERT|DROP|UNION|OR|AND)\b/gi, '')
    .replace(/\bjavascript:\s*/gi, '')
    .replace(/[^\w\sÀ-ÿ-]/g, '') // permite letras acentuadas e hífen
}
export const sanitizeNumber = (input: unknown): string => {
  const raw = typeof input === 'number'
    ? input.toString()
    : typeof input === 'string'
    ? input.trim()
    : String(input ?? '').trim()

  // Permite apenas números e ponto decimal
  const sanitized = raw.replace(/[^\d.]/g, '')

  // Evita múltiplos pontos decimais
  const [intPart, ...rest] = sanitized.split('.')
  const decimal = rest.length > 0 ? `.${rest.join('')}` : ''

  return `${intPart}${decimal}`
}

export const sanitizeAccess = (input: unknown): string => {
  const raw = typeof input === 'string' ? input : String(input ?? '')

  return raw
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/(['"`;\\])/g, '')
    .replace(/--/g, '')
    .replace(/\b(SELECT|UPDATE|DELETE|INSERT|DROP|UNION|OR|AND)\b/gi, '')
    .replace(/\bjavascript:\s*/gi, '')
    .replace(/[^a-zA-Z0-9_-]/g, '')
}
