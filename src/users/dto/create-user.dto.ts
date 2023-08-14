import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        default: 'test@gmail.com',
    })
    email: string;

    @ApiProperty({
        default: 'John',
    })
    fullName: string;

    @ApiProperty({
        default: 'qwerty123',
    })
    password: string;
}