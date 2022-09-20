import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient, Users } from '@prisma/client';
import { AuthCredentialsDto } from './dto/auth-credenials.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersRepository {
  async getUser(username: string) {
    return await prisma.users.findFirst({ where: { username } });
  }

  async createUser(authDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authDto;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const found = await prisma.users.findFirst({ where: { username } });

    await prisma.users.create({
      data: {
        username,
        password: hashed,
      },
    });

    if (found) {
      throw new ConflictException('Username already exists.');
    }
  }
}
