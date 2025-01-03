import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(createUserDto: Partial<User| any>){
    const newUser= (await this.userRepository.create(createUserDto)).toObject();
    if (newUser)  delete newUser?.password
    return newUser
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async find(user: Partial<User>, fieldsToSelect?: string) {
    return await this.userRepository.find(user, fieldsToSelect)
    }

  async update(user:Partial<User>) {
    return await this.userRepository.update(user)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
