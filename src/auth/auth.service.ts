import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'
import { User } from 'src/users/schemas/user.model';
import { MailService } from 'src/mail/mail.service';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './schemas/token.model';
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


  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const tokens = this.generateToken(user);
    await this.saveToken(user.id, tokens.refreshToken);
    return tokens;
  }


  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(dto.email);
    if (candidate) {
      throw new HttpException(`Пользователь с email ${dto.email} существует`, HttpStatus.BAD_REQUEST);
    };
    const hashPassword = await bcrypt.hash(dto.password, 3);
    const activationLink = uuidv4();
    const user = await this.userService.createUser({...dto, password: hashPassword, activationLink});
    await this.mailService.sendActivationMail(dto.email, `${process.env.API_URL}/auth/activate/${activationLink}`);
    const tokens = this.generateToken(user);
    await this.saveToken(user.id, tokens.refreshToken);
    return tokens
  }


  private async saveToken(userId: number, token: string) {
    const tokenData = await this.tokenRepository.findOne({where: {userId}})
    if (tokenData) {
      tokenData.token = token;
      return tokenData.save();
    };
    const newToken = await this.tokenRepository.create({userId, token});
    return newToken;
  }


  private generateToken(user: User) {
    const payload = {
      email: user.email, 
      id: user.id, 
      roles: user.roles.map((r) => r.value)
    }
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {expiresIn: "15d"})
    };
  }


  private async validateUser(dto: LoginUserDto) {
    const user = await this.userService.getUsersByEmail(dto.email);
    if (!user) {throw new HttpException("Неверный email пользователя", HttpStatus.BAD_REQUEST)};
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (!passwordEquals) {throw new HttpException("Неверный пароль", HttpStatus.BAD_REQUEST)};
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException("Внутренняя ошибка сервера" ,HttpStatus.INTERNAL_SERVER_ERROR);
  }

  
  async logout(userId: number) {
    const deleted = await this.tokenRepository.destroy({where: {userId}})
  }

  async activate(activationLink: string) {
    const user = await this.userRepository.findOne({where: {activationLink}});
    if (!user) {
      return new HttpException("Некоректнная ссылка активации", HttpStatus.BAD_REQUEST);
    }
    user.isActivated = true;
    user.save();
  }

  async refresh(token: string) {
    const user = await this.validateToken(token);
    const userData = await this.userService.getUsersByEmail(user.email);
    const tokenData = await this.tokenRepository.findOne({where: {token}});
    if(!userData || !tokenData) {throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)};
    const { refreshToken, accessToken } = this.generateToken(userData);
    await this.saveToken(userData.id, refreshToken);
    return { refreshToken, accessToken };
  };

  async validateToken(token: string) {
    if(!token) throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)
    const userData = this.jwtService.verify(token);
    return userData;
  };
}
