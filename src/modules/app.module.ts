import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Token } from 'src/auth/token.model';
import { Brand } from 'src/brands/brand.model';
import { BrandsModule } from 'src/brands/brands.module';
import { CartDevices } from 'src/cartDevices/cart_devices.model';
import { Cart } from 'src/carts/cart.model';
import { DeviceInfo } from 'src/deviceInfo/deviceInfo.model';
import { Device } from 'src/devices/device.model';
import { DevicesModule } from 'src/devices/devices.module';
import { FilesModule } from 'src/files/files.module';
import { Folowers } from 'src/friends/friends.model';
import { FriendsModule } from 'src/friends/friends.module';
import { Rating } from 'src/ratings/rating.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { TypeBrand } from 'src/types/typeBrand.model';
import { Type } from 'src/types/types.model';
import { TypesModule } from 'src/types/types.module';
import { User } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Cart, CartDevices, Device, DeviceInfo, Type, Brand, TypeBrand, Rating, Role, UserRoles, Token, Folowers],
      autoLoadModels: true
    }),
    UsersModule,
    TypesModule,
    BrandsModule,
    DevicesModule,
    AuthModule,
    RolesModule,
    FilesModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
