const requiredMetadataKey = Symbol('required')

const sealed = (constructor: Function) => {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

const required = (
  target: object,
  propertyKey: string | symbol,
  parameterIndex: number,
) => {
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
  existingRequiredParameters.push(parameterIndex)
  Reflect.defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey,
  )
}

@sealed
class BugReport {
  type = 'report'

  title: string

  constructor(t: string) {
    this.title = t
  }

  print(@required verbose: boolean) {
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`
    } else {
      return this.title
    }
  }
}
