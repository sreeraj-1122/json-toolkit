export function formatJSON(jsonString: string, options: { indent?: number; tabs?: boolean } = {}): string {
  const indent = options.indent || 2
  const indentStr = options.tabs ? '\t' : ' '.repeat(indent)

  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed, null, indentStr)
  } catch {
    return jsonString
  }
}

export function minifyJSON(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed)
  } catch {
    return jsonString
  }
}

export function sortJSONKeys(jsonString: string, recursive: boolean = true): string {
  try {
    const parsed = JSON.parse(jsonString)
    const sorted = recursiveSort(parsed)
    return JSON.stringify(sorted, null, 2)
  } catch {
    return jsonString
  }
}

function recursiveSort(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => recursiveSort(item))
  }

  const sorted: Record<string, any> = {}
  const keys = Object.keys(obj).sort()

  for (const key of keys) {
    sorted[key] = recursiveSort(obj[key])
  }

  return sorted
}

export function escapeJSON(jsonString: string): string {
  return JSON.stringify(jsonString)
}

export function unescapeJSON(escapedString: string): string {
  try {
    return JSON.parse(escapedString)
  } catch {
    return escapedString
  }
}

export function stringifyObject(obj: any): string {
  return JSON.stringify(JSON.stringify(obj))
}

export function flattenJSON(obj: any, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(result, flattenJSON(obj[key], newKey))
      } else {
        result[newKey] = obj[key]
      }
    }
  }

  return result
}

export function unflattenJSON(flatObj: Record<string, any>): any {
  const result: any = {}

  for (const key in flatObj) {
    const keys = key.split('.')
    let current = result

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]
      if (!current[k]) {
        current[k] = {}
      }
      current = current[k]
    }

    current[keys[keys.length - 1]] = flatObj[key]
  }

  return result
}
