import { User } from "../../entities/User";
import { CreateUserDto } from "../../models/dto/create-user";

export interface CreateUser {
    execute(data: CreateUserDto): Promise<User>;
}