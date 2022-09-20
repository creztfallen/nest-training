import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credenials.dto';
import { usersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: usersRepository) {}

  async signUp(authDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authDto);
  }
}
