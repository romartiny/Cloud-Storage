import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    imports: [
        JwtModule.registerAsync({
           imports: [ConfigModule],
           inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
               return {
                   secret: configService.get('SECRET_KEY'),
                   signOptions: { expiresIn: configService.get('EXPIRES_IN')},
               }
            }
        }),
        UsersModule, PassportModule]
})
export class AuthModule {
}
