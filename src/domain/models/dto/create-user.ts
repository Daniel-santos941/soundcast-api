export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    preferences?: string[];
}
