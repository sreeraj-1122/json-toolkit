import { JSONValidationResult, ValidationError } from '@/types'

export function validateJSON(jsonString: string): JSONValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  if (!jsonString || jsonString.trim() === '') {
    return {
      valid: false,
      errors: [{
        line: 1,
        column: 1,
        message: 'Empty JSON input',
        severity: 'error',
      }],
      warnings: [],
    }
  }

  try {
    JSON.parse(jsonString)
    return {
      valid: true,
      errors: [],
      warnings: [],
    }
  } catch (error: any) {
    const message = error.message || 'Invalid JSON'
    const match = message.match(/position (\d+)/)
    const position = match ? parseInt(match[1]) : 0
    
    const lines = jsonString.substring(0, position).split('\n')
    const line = lines.length
    const column = lines[lines.length - 1].length + 1

    errors.push({
      line,
      column,
      message: parseErrorMessage(message),
      severity: 'error',
    })
  }

  return {
    valid: false,
    errors,
    warnings,
  }
}

function parseErrorMessage(message: string): string {
  if (message.includes('Unexpected token')) {
    return 'Unexpected character or token'
  }
  if (message.includes('JSON.parse')) {
    return 'Invalid JSON syntax'
  }
  if (message.includes('Unterminated string')) {
    return 'String is not properly terminated'
  }
  if (message.includes('Expected')) {
    return message.replace('JSON.parse: ', '')
  }
  return message
}

export function getValidationDetails(jsonString: string): {
  isValid: boolean
  errorLine?: number
  errorColumn?: number
  errorMessage?: string
  fileSize: number
  charCount: number
} {
  const result = validateJSON(jsonString)
  const error = result.errors[0]

  return {
    isValid: result.valid,
    errorLine: error?.line,
    errorColumn: error?.column,
    errorMessage: error?.message,
    fileSize: new Blob([jsonString]).size,
    charCount: jsonString.length,
  }
}
