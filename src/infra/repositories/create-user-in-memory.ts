import { User } from "../../domain/entities/User";
import { CreateUserRepository } from "../../application/repositories/create-user";
import { CreateUserDto } from "../../domain/models/dto/create-user";

export class CreateUserInMemory implements CreateUserRepository {
    async add(data: CreateUserDto): Promise<User> {
        return null
    }
}