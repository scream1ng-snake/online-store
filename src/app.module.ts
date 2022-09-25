import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Token } from 'src/auth/schemas/token.model';
import { Brand } from 'src/brands/schemas/brand.model';
import { BrandsModule } from 'src/brands/brands.module';
import { CartDevices } from 'src/carts/schemas/cart_devices.model';
import { Cart } from 'src/carts/schemas/cart.model';
import { DeviceInfo } from 'src/devices/schemas/deviceInfo.model';
import { Device } from 'src/devices/schemas/device.model';
import { DevicesModule } from 'src/devices/devices.module';
import { FilesModule } from 'src/files/files.module';
import { Role } from 'src/roles/schemas/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/schemas/user-roles.model';
import { TypeBrand } from 'src/types/schemas/typeBrand.model';
import { Type } from 'src/types/schemas/types.model';
import { TypesModule } from 'src/types/types.module';
import { User } from 'src/users/schemas/user.model';
import { UsersModule } from 'src/users/users.module';
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { RubricsModule } from './rubrics/rubrics.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    ConfigModule.forRoot({envFilePath: '.env'}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Cart, CartDevices, Device, DeviceInfo, Type, Brand, TypeBrand, Role, UserRoles, Token],
      autoLoadModels: true
    }),
    UsersModule,
    TypesModule,
    BrandsModule,
    DevicesModule,
    AuthModule,
    RolesModule,
    FilesModule,
    RubricsModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
