import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      await user.setPassword(createUserDto.password);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    // return users.map((user, index) => {
    //   return plainToInstance(User, user);
    // });
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found.`);
    // return plainToInstance(User, user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }

  async findOneBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
    const user = await this.userRepository.findOneBy(where);
    if (!user) throw new NotFoundException(`User not found.`);
    // return plainToInstance(User, user);
    return user;
  }
}
