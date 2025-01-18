export class User {
    public name: string;
    public email: string;
    public password: string;
    public preferences?: string[];
    public isActive?: boolean;
    public avatar?: string;
    public createdAt?: Date;

    constructor(props: User) {
        Object.assign(this, props)

        this.avatar = props.avatar ?? null
        this.isActive = props.isActive || true
        this.preferences = props.preferences ?? []
        this.createdAt = props.createdAt || new Date()
    }
}


