import { Body, Controller, Get, Param, Post, Redirect, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { response, Response } from 'express';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginUserDto } from 'src/users/dto/login-user.dto'; 
import { Blob } from 'buffer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post("/registration")
  @UseInterceptors(FileInterceptor("image"))
  async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response, @UploadedFile() image?: Blob) {
    userDto = {...userDto, image: image}
    const userData = await this.authService.registration(userDto);
    response.cookie("refreshToken", userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
    return userData;
  }

  @Post("/login")
  async login(@Body() userDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const data = await this.authService.login(userDto);
    response.cookie("refreshToken", data.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
    return data;
  }

  @Get("/logout")
  logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const {refreshToken} = request.cookies;
    response.clearCookie('refreshToken')
    return this.authService.logout(refreshToken)
  }

  @Get("/activate/:link")
  activate(@Param('link') link: string, @Res({ passthrough: true }) response: Response) {
    this.authService.activate(link)
    return response.redirect(`${process.env.FRONT_URL}`)
  }

  @Get("/refresh")
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const {refreshToken} = request.cookies;
    const newToken = await this.authService.refresh(refreshToken);
    return response.cookie("refreshToken", newToken.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
  }
}
