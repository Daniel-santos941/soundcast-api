import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../../domain/models/dto/create-user";
import { CreateUser } from "../../domain/protocols/usecases/create-user";
import { Encrypter } from "../protocols/encrypter";
import { CreateUserRepository } from "../repositories/create-user";

export class CreateUserUseCase implements CreateUser {
    constructor(
        private readonly encrypter: Encrypter,
        private readonly createUserRepository: CreateUserRepository,
    ) {}

    async execute(data: CreateUserDto): Promise<User> {
        // ver se o usuario existe

        // criptografar a senha
        const encryptedPass = await this.encrypter.hash(data.password);

        // ver se o usuario esta ativo

        // criar o usuario
        const newUser = new User(data)
        const userCreated = await this.createUserRepository.add(newUser)

        return userCreated;
    }
}
