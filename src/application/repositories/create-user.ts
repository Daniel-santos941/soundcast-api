import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../../domain/models/dto/create-user";

export interface CreateUserRepository {
    add(data: CreateUserDto): Promise<User>;
}