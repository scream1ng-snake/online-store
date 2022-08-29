import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypesController } from './types.controller';
import { Type } from './types.model';
import { TypesService } from './types.service';

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [
    SequelizeModule.forFeature([Type]),
  ]
})
export class TypesModule {}
