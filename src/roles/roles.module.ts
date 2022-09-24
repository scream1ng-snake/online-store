import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/schemas/user.model';
import { RolesController } from './roles.controller';
import { Role } from './schemas/roles.model';
import { RolesService } from './roles.service';
import { UserRoles } from './schemas/user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [RolesService]
})
export class RolesModule {}
