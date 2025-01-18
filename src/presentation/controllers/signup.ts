import { CreateUser } from "../../domain/protocols/usecases/create-user"
import { HttpRequest } from "../http/request"
import { HttpResponse } from "../http/response"
import { Controller } from "../protocols/controller"

export class SignupController implements Controller {
    constructor(private readonly createUserUseCase: CreateUser) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ["name", "email", "password"]
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return {
                        statusCode: 400,
                        body: new Error(`missing param ${field}`)
                    }                
                }
            }
    
            const { name, email, password } = httpRequest.body;
            const user = await this.createUserUseCase.execute({
                name,
                email,
                password,
            })  

            return {
                statusCode: 201,
                body: user
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: new Error("internal server error")
            }
        }
    }
}
