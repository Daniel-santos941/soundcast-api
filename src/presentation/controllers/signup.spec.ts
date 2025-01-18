import { omit } from "lodash";
import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../../domain/models/dto/create-user";
import { CreateUser } from "../../domain/protocols/usecases/create-user";
import { SignupController } from "./signup";

class CreateUserUseCaseStub implements CreateUser {
    async execute(data: CreateUserDto): Promise<User> {
        const createdAt = new Date();
        const fakeUser: User = {
            name: "paula balui",
            email: "paulabalui@gmail.com",
            password: "123456baluib@isumavez",
            avatar: null,
            isActive: true,
            preferences: [],
            createdAt, 
        }
        return new Promise((resolve) => resolve(fakeUser))
    }
}

const makeSut = (): SutTypes => {
    const createUserUseCaseStub = new CreateUserUseCaseStub()
    const sut = new SignupController(createUserUseCaseStub)
    return { 
        sut,
        createUserUseCaseStub
    };
}

interface SutTypes {
    sut: SignupController
    createUserUseCaseStub: CreateUser
}

describe("Signup controller", () => {
    it("should be defined", () => {
        const { sut } = makeSut()
        expect(sut).toBeDefined()
        expect(sut).toBeTruthy()
    })

    it("should return 400 if no name is provided", async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: "any_email@mail.com",
                password: "paula_balui",    
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error("missing param name"))
    })

    it("should return 400 if no email is provided", async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: "paula_balui",
                password: "paula_balui",    
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error("missing param email"))
    })

    it("should return 400 if no password is provided", async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: "paula_balui",
                email: "any_email@mail.com",
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error("missing param password"))
    })

    it("should return 500 if CreateuSerUseCase throws", async () => {
        const { sut, createUserUseCaseStub } = makeSut()
        jest
            .spyOn(createUserUseCaseStub, "execute")
            .mockImplementationOnce(() => {
                throw new Error()
            })
        const httpRequest = {
            body: {
                name: "paula balui",
                email: "paulabalui@gmail.com",
                password: "123456baluib@isumavez",
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new Error("internal server error"))
    })

    it("should return 201 if all params is provided", async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: "paula balui",
                email: "paulabalui@gmail.com",
                password: "123456baluib@isumavez",
            }
        }

        const fakeUserCreated = {
            name: "paula balui",
            email: "paulabalui@gmail.com",
            password: "123456baluib@isumavez",
            avatar: null,
            isActive: true,
            preferences: [],
            createdAt: new Date(),
        }

        const user = omit(fakeUserCreated, 'createdAt')
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(201)
        expect(httpResponse.body).toEqual(fakeUserCreated)
    })
})