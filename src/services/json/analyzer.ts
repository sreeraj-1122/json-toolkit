import type { JSONSizeAnalysis } from '@/types'

export function analyzeJSON(jsonString: string): JSONSizeAnalysis {
  try {
    const data = JSON.parse(jsonString)
    const stats = {
      fileSize: new Blob([jsonString]).size,
      depth: calculateDepth(data),
      keyCount: countKeys(data),
      valueCount: countValues(data),
      arrayCount: countArrays(data),
      objectCount: countObjects(data),
      stringSize: estimateStringSize(data),
      numberSize: 0,
    }
    return stats
  } catch {
    return {
      fileSize: 0,
      depth: 0,
      keyCount: 0,
      valueCount: 0,
      arrayCount: 0,
      objectCount: 0,
      stringSize: 0,
      numberSize: 0,
    }
  }
}

function calculateDepth(obj: any, current = 0): number {
  if (obj === null || typeof obj !== 'object') {
    return current
  }

  let maxDepth = current

  if (Array.isArray(obj)) {
    for (const item of obj) {
      maxDepth = Math.max(maxDepth, calculateDepth(item, current + 1))
    }
  } else {
    for (const key in obj) {
      maxDepth = Math.max(maxDepth, calculateDepth(obj[key], current + 1))
    }
  }

  return maxDepth
}

function countKeys(obj: any): number {
  let count = 0

  if (typeof obj !== 'object' || obj === null) {
    return count
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      count += countKeys(item)
    }
  } else {
    count = Object.keys(obj).length
    for (const key in obj) {
      count += countKeys(obj[key])
    }
  }

  return count
}

function countValues(obj: any): number {
  let count = 0

  if (typeof obj !== 'object' || obj === null) {
    return 1
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      count += countValues(item)
    }
  } else {
    for (const key in obj) {
      count += countValues(obj[key])
    }
  }

  return count
}

function countArrays(obj: any): number {
  let count = 0

  if (Array.isArray(obj)) {
    count = 1
    for (const item of obj) {
      count += countArrays(item)
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      count += countArrays(obj[key])
    }
  }

  return count
}

function countObjects(obj: any): number {
  let count = 0

  if (Array.isArray(obj)) {
    for (const item of obj) {
      count += countObjects(item)
    }
  } else if (typeof obj === 'object' && obj !== null) {
    count = 1
    for (const key in obj) {
      count += countObjects(obj[key])
    }
  }

  return count
}

function estimateStringSize(obj: any): number {
  let size = 0

  if (typeof obj === 'string') {
    size = obj.length
  } else if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        size += estimateStringSize(item)
      }
    } else {
      for (const key in obj) {
        size += key.length + estimateStringSize(obj[key])
      }
    }
  }

  return size
}
