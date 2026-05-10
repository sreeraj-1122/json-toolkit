export function generateJSONSchema(data: any, title = 'Generated Schema'): any {
  const schema: any = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title,
    type: getType(data),
  }

  if (schema.type === 'object') {
    schema.properties = {}
    schema.required = []

    for (const key in data) {
      schema.properties[key] = generatePropertySchema(data[key])
      if (data[key] !== undefined && data[key] !== null) {
        schema.required.push(key)
      }
    }
  } else if (schema.type === 'array' && data.length > 0) {
    schema.items = generatePropertySchema(data[0])
  }

  return schema
}

function generatePropertySchema(value: any): any {
  const type = getType(value)

  const schema: any = { type }

  if (type === 'object') {
    schema.properties = {}
    for (const key in value) {
      schema.properties[key] = generatePropertySchema(value[key])
    }
  } else if (type === 'array' && value.length > 0) {
    schema.items = generatePropertySchema(value[0])
  } else if (type === 'string') {
    schema.pattern = `^.*$`
  } else if (type === 'number') {
    schema.minimum = value
    schema.maximum = value
  }

  return schema
}

function getType(value: any): string {
  if (value === null) {
    return 'null'
  }
  if (Array.isArray(value)) {
    return 'array'
  }
  return typeof value
}
