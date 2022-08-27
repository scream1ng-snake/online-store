import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Folowers } from './friends.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [
    SequelizeModule.forFeature([User, Folowers]),
    AuthModule
  ]
})
export class FriendsModule {}
