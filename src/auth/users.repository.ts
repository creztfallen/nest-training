import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient, Users } from '@prisma/client';
import { AuthCredentialsDto } from './dto/auth-credenials.dto';

const prisma = new PrismaClient();

@Injectable()
export class usersRepository {
  async createUser(authDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authDto;

    const found = await prisma.users.findFirst({ where: { username } });

    const user = await prisma.users.create({
      data: {
        username,
        password,
      },
    });

    if (found) {
      throw new ConflictException('Username already exists.');
    }
  }
}
