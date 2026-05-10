export interface JSONValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export interface ValidationError {
  line: number
  column: number
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationWarning {
  message: string
  type: string
}

export interface EditorState {
  content: string
  language: 'json' | 'yaml' | 'csv'
  isDirty: boolean
  history: string[]
  historyIndex: number
}

export interface Tool {
  id: string
  name: string
  description: string
  category: 'validate' | 'view' | 'convert'
  icon: string
  path: string
  tags: string[]
}

export interface DiffResult {
  added: string[]
  removed: string[]
  modified: string[]
  unchanged: string[]
}

export interface JSONSizeAnalysis {
  fileSize: number
  depth: number
  keyCount: number
  valueCount: number
  arrayCount: number
  objectCount: number
  stringSize: number
  numberSize: number
}

export interface JSONPathResult {
  path: string
  value: any
}

export interface DiffHighlight {
  type: 'added' | 'removed' | 'modified' | 'unchanged'
  content: string
  line: number
}
