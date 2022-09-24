import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailModule } from 'src/mail/mail.module';
import { User } from 'src/users/schemas/user.model';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token } from './schemas/token.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MailModule,
    ConfigModule.forRoot({envFilePath: ".env"}),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN
      },
    }),
    SequelizeModule.forFeature([Token, User])
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {
}
