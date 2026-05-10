import YAML from 'js-yaml'

export function jsonToYAML(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString)
    return YAML.dump(parsed, { indent: 2 })
  } catch {
    return ''
  }
}

export function yamlToJSON(yamlString: string): string {
  try {
    const parsed = YAML.load(yamlString)
    return JSON.stringify(parsed, null, 2)
  } catch {
    return ''
  }
}

export function jsonToCSV(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString)
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return ''
    }

    const headers = Object.keys(parsed[0])
    const csv = [headers.join(',')]

    for (const obj of parsed) {
      const row = headers.map((header) => {
        const value = obj[header]
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}`
        }
        return value
      })
      csv.push(row.join(','))
    }

    return csv.join('\n')
  } catch {
    return ''
  }
}

export function csvToJSON(csvString: string): string {
  const lines = csvString.trim().split('\n')
  if (lines.length < 2) {
    return '[]'
  }

  const headers = lines[0].split(',').map((h) => h.trim())
  const result = []

  for (let i = 1; i < lines.length; i++) {
    const obj: Record<string, string> = {}
    const values = lines[i].split(',').map((v) => v.trim())

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] || ''
    }

    result.push(obj)
  }

  return JSON.stringify(result, null, 2)
}

export function encodeBase64(text: string): string {
  try {
    return btoa(text)
  } catch {
    return ''
  }
}

export function decodeBase64(encoded: string): string {
  try {
    return atob(encoded)
  } catch {
    return ''
  }
}

export function decodeJWT(token: string): { header: any; payload: any; valid: boolean } {
  const parts = token.split('.')
  if (parts.length !== 3) {
    return { header: null, payload: null, valid: false }
  }

  try {
    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    return { header, payload, valid: true }
  } catch {
    return { header: null, payload: null, valid: false }
  }
}
