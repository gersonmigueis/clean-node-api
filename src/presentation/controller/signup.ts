import { HttpResponse, HttpRequest } from "../protocols/http"
import { MissingParamError } from "../erros/missing-param-error"
import { badRequest } from "../helpers/http-helpers"
import { Controller } from "../protocols/controler"
export class SignUpController implements Controller  {

  handle (httpRequest: HttpRequest): any {

    const requiredFilds = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFilds) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
