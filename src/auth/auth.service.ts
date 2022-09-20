import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credenials.dto';
import { usersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersRepository: usersRepository) {}

  async signUp(authDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authDto);
  }

  async signIn(authDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authDto;
    const user = await this.usersRepository.getUser(username);
    const comparison = await bcrypt.compare(password, user.password);

    if (user && comparison) {
      return 'Success';
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}
