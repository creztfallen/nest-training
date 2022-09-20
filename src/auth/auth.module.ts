import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { usersRepository } from './users.repository';

@Module({
  providers: [AuthService, usersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
