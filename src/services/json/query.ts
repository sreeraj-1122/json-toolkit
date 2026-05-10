import { JSONPathQuery, JSONPath } from 'jsonpath-plus'
import type { JSONPathResult } from '@/types'

export function queryJSON(data: any, query: string): JSONPathResult[] {
  try {
    const results = JSONPath({
      path: query,
      json: data,
    })

    return results.map((value, index) => ({
      path: query,
      value,
    }))
  } catch {
    return []
  }
}

export function searchJSON(data: any, searchTerm: string, searchInKeys = true): any[] {
  const results: any[] = []
  const term = searchTerm.toLowerCase()

  function traverse(obj: any, path = ''): void {
    if (obj === null || obj === undefined) {
      return
    }

    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          traverse(item, `${path}[${index}]`)
        })
      } else {
        for (const key in obj) {
          if (searchInKeys && key.toLowerCase().includes(term)) {
            results.push({
              path: `${path}.${key}`,
              key,
              value: obj[key],
            })
          }
          traverse(obj[key], `${path}.${key}`)
        }
      }
    } else if (typeof obj === 'string' && obj.toLowerCase().includes(term)) {
      results.push({
        path,
        value: obj,
      })
    }
  }

  traverse(data)
  return results
}

export function searchRegex(data: any, pattern: string): any[] {
  const results: any[] = []
  let regex: RegExp

  try {
    regex = new RegExp(pattern, 'i')
  } catch {
    return results
  }

  function traverse(obj: any, path = ''): void {
    if (obj === null || obj === undefined) {
      return
    }

    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          traverse(item, `${path}[${index}]`)
        })
      } else {
        for (const key in obj) {
          if (regex.test(key)) {
            results.push({
              path: `${path}.${key}`,
              key,
              value: obj[key],
            })
          }
          traverse(obj[key], `${path}.${key}`)
        }
      }
    } else if (typeof obj === 'string' && regex.test(obj)) {
      results.push({
        path,
        value: obj,
      })
    }
  }

  traverse(data)
  return results
}
