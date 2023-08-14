import {ForbiddenException, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && user.password === password) {
            const { password, ...result} = user;
            return result;
        }

        return null;
    }

    async register(dto: CreateUserDto) {
        try {
            return await this.usersService.create(dto);
        } catch (err) {
            console.log(err);

            throw new ForbiddenException('Error creating user');
        }
    }
}
