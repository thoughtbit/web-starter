/**
 * ValidationError to be used with multiple validation errors return from Ajv or other validators
 */
export class HttpError {
  private message: string
  private code: string | number
  private name: string

  public constructor (message: string, code: string | number) {
    this.message = message
    this.code = code
    this.name = 'ValidationError'
  }
  public toString () {
    return 'HttpError' + this.code + ': ' + this.message
  }
}
