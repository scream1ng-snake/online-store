import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './schemas/roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }
  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({where: {value}})
    if(!role) throw new HttpException("Роль не найдена", HttpStatus.BAD_REQUEST);
    return role;
  }
}
