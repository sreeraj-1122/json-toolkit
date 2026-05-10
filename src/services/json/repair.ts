export function repairJSON(jsonString: string): string {
  try {
    JSON.parse(jsonString)
    return jsonString
  } catch {}

  let repaired = jsonString

  // Fix trailing commas
  repaired = repaired.replace(/,\s*([}\]])/g, '$1')

  // Fix single quotes to double quotes
  repaired = repaired.replace(/'/g, '"')

  // Fix unquoted keys
  repaired = repaired.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')

  // Try to parse again
  try {
    JSON.parse(repaired)
    return repaired
  } catch {}

  // Additional repair attempts
  // Fix missing closing brackets
  let openBraces = (repaired.match(/{/g) || []).length
  let closeBraces = (repaired.match(/}/g) || []).length
  let openBrackets = (repaired.match(/\[/g) || []).length
  let closeBrackets = (repaired.match(/]/g) || []).length

  while (openBraces > closeBraces) {
    repaired += '}'
    closeBraces++
  }
  while (openBrackets > closeBrackets) {
    repaired += ']'
    closeBrackets++
  }

  return repaired
}

export function analyzeError(jsonString: string): string {
  try {
    JSON.parse(jsonString)
    return 'JSON is valid'
  } catch (error: any) {
    const message = error.message

    let explanation = 'There is an error in your JSON: '

    if (message.includes('Unexpected token')) {
      explanation += 'An unexpected character or token was found.'
    } else if (message.includes('Unterminated string')) {
      explanation += 'A string is not properly closed with a closing quote.'
    } else if (message.includes('Expected')) {
      explanation += `The parser expected different content: ${message}`
    } else {
      explanation += message
    }

    return explanation
  }
}
