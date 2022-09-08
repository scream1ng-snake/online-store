import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'
import { User } from 'src/users/user.model';
import { MailService } from 'src/mail/mail.service';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Token) private tokenRepository: typeof Token,
    private userService: UsersService, 
    private jwtService: JwtService, 
    private mailService: MailService
  ) {}


  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = this.generateToken(user);
    await this.saveToken(user.id, tokens.refreshToken);
    let resp = {
      id: user.id,
      username: user.username,
      email: user.email,
      link: user.link,
      smallimage: user.smallimage,
      highimage: user.highimage,
      cart: user.cart,
      ...tokens
    }
    return resp;
  }


  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(`Пользователь с email ${userDto.email} существует`, HttpStatus.BAD_REQUEST);
    };
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const activationLink = uuidv4();
    const user = await this.userService.createUser({...userDto, password: hashPassword, activationLink});
    await this.mailService.sendActivationMail(userDto.email, `${process.env.API_URL}/auth/activate/${activationLink}`);
    const tokens = this.generateToken(user);
    await this.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user}
  }


  private async saveToken(user: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({where: {user}})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    };
    const token = await this.tokenRepository.create({user: user, refreshToken: refreshToken});
    return token;
  }


  private generateToken(user: User) {
    const payload = {
      email: user.email, 
      id: user.id, 
      roles: user.roles.map((r) => r.value)
    }
    const accessToken = this.jwtService.sign(payload, {expiresIn: "1h", secret: "SECRET"});
    const refreshToken = this.jwtService.sign(payload, {expiresIn: "1d", secret: "SECRET"})
    return {
      accessToken,
      refreshToken
    }
  }


  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email);
    if (!user) {throw new UnauthorizedException("Неверный email пользователя")};
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (!passwordEquals) {throw new UnauthorizedException("Неверный пароль")};
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException("Внутренняя ошибка сервера" ,HttpStatus.INTERNAL_SERVER_ERROR);
  }

  
  async logout(refreshToken: string) {
    const deleted = await this.tokenRepository.destroy({where: {refreshToken}})
  }

  async activate(activationLink: string) {
    const user = await this.userRepository.findOne({where: {activationLink}});
    if (!user) {
      return new HttpException("Некоректнная ссылка активации", HttpStatus.BAD_REQUEST);
    }
    user.isActivated = true;
    user.save();
  }

  async refresh(refreshToken: string) {
    if (!refreshToken || refreshToken === "null") {throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)};
    const user = await this.validateRefreshToken(refreshToken);
    const userData = await this.userService.getUsersByEmail(user.email);
    const tokenData = await this.tokenRepository.findOne({where: {refreshToken}});
    if(!userData || !tokenData) {throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)};
    const newTokens = this.generateToken(userData);
    await this.saveToken(userData.id, newTokens.refreshToken);
    return newTokens;
  };

  async validateAccessToken(token: string) {
    const userData = this.jwtService.verify(token);
    return userData;
  };

  async validateRefreshToken(token: string) {
    const userData = this.jwtService.verify(token);
    return userData;
  };
}
