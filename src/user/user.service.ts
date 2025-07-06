import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { STATUS } from 'src/constants';
import { messages } from 'src/config/messages';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async create(createUserDto: CreateUserDto) {
    const exist = await this.userRepository.findOne({
      where: {
        name: createUserDto.name,
        status: STATUS.ACTIVE
      },
    });

    if (exist) return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.USER.EXIST };

    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return { status: HttpStatus.OK, message: messages.COMMON.SUCCESS, data: { id: result.id } };
  }

  async findAll() {
    const result = await this.userRepository.find({
      select: ['id', 'name', 'status', 'createdAt', 'updatedAt'],
    });

    return {
      status: HttpStatus.OK,
      message: messages.USER.LIST,
      data: result,
    };
  }
}
