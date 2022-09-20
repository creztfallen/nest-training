import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credenials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authDto);
  }

  async signIn(authDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authDto;
    const user = await this.usersRepository.getUser(username);
    const comparison = await bcrypt.compare(password, user.password);

    if (user && comparison) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}
