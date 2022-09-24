import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Cookies } from './decorators/cookie.decorator';
import { SetCookie } from './decorators/set-cookie.decorator';
import { ClearCookie } from './decorators/clear-cookie.decorator';
import { Blob } from 'buffer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/registration")
  @UseInterceptors(FileInterceptor("image"))
  async registration(@Body() dto: CreateUserDto, @SetCookie() SetCookie, @UploadedFile() image?: Blob) {
    const { accessToken, refreshToken } = await this.authService.registration({ ...dto, image });
    SetCookie("refreshToken", refreshToken, "15d")
    return {accessToken};
  }

  @Post("/login")
  async login(@Body() dto: LoginUserDto, @SetCookie() SetCookie) {
    const { accessToken, refreshToken }  = await this.authService.login(dto);
    SetCookie("refreshToken", refreshToken, "15d")
    return {accessToken};
  }

  @Get("/logout")
  async logout(@Cookies("refreshToken") token: string, @ClearCookie() clearCookie) {
    const user = await this.authService.validateToken(token)
    clearCookie('refreshToken')
    return this.authService.logout(user.id);
  }

  @Get("/activate/:link")
  activate(@Param('link') link: string, @Res({ passthrough: true }) response: Response) {
    this.authService.activate(link)
    return response.redirect(`${process.env.FRONT_URL}`)
  }

  @Get("/refresh")
  async refresh(@Cookies("refreshToken") token: string, @SetCookie() SetCookie) {
    const { refreshToken, accessToken } = await this.authService.refresh(token);
    SetCookie("refreshToken", refreshToken, "15d");
    return {accessToken};
  }
}
