import { Module } from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { UserMessageController } from './user-message.controller';

@Module({
  controllers: [UserMessageController],
  providers: [UserMessageService],
})
export class UserMessageModule {}
