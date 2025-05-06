import { Injectable } from '@nestjs/common';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { UpdateUserMessageDto } from './dto/update-user-message.dto';

@Injectable()
export class UserMessageService {
  create(createUserMessageDto: CreateUserMessageDto) {
    return 'This action adds a new userMessage';
  }

  findAll() {
    return `This action returns all userMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMessage`;
  }

  update(id: number, updateUserMessageDto: UpdateUserMessageDto) {
    return `This action updates a #${id} userMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMessage`;
  }
}
