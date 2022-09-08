import { Body, Controller, Get, Param, Post, Redirect, Req, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { response, Response } from 'express';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Blob } from 'buffer';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) { }

  @Post("/registration")
  @UseInterceptors(FileInterceptor("image"))
  async registration(@Body() userDto: CreateUserDto, @UploadedFile() image?: Blob) {
    userDto = { ...userDto, image: image };
    const userData = await this.authService.registration(userDto);
    return userData;
  }

  @Post("/login")
  async login(@Body() userDto: LoginUserDto) {
    const data = await this.authService.login(userDto);
    return data;
  }

  @Get("/logout")
  logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const { refreshToken } = request.cookies;
    response.clearCookie('refreshToken')
    return this.authService.logout(refreshToken)
  }

  @Get("/activate/:link")
  activate(@Param('link') link: string, @Res({ passthrough: true }) response: Response) {
    this.authService.activate(link)
    return response.redirect(`${process.env.FRONT_URL}`)
  }

  @Post("/refresh")
  async refresh(@Req() request: Request, @Body() {refreshToken}: RefreshDto) {
    const newTokens = await this.authService.refresh(refreshToken.split(" ")[1]);
    return newTokens;
  }
}
