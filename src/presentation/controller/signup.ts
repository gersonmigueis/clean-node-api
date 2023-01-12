import { HttpResponse, HttpRequest } from "../protocols/http"
import { MissingParamError } from "../erros/missing-param-error"
import { badRequest } from "../helpers/http-helpers"
import { Controller } from "../protocols/controler"
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../erros/invalid-param-error'
export class SignUpController implements Controller  {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }
  handle (httpRequest: HttpRequest): any {
    const requiredFilds = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFilds) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
