import bcrypt from "bcrypt";
import { Encrypter } from "../../application/protocols/encrypter";

export class EncrypterAdapter implements Encrypter {
    salt = 12;

    async hash(value: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.salt);
        const genHash = await bcrypt.hash(value, salt);
        return genHash;
    }
}
