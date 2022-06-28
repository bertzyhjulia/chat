import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReadMessageDto } from '../model/dto/readMessage.dto';
import { ReadMessageEntity } from '../model/read_message.entity';

@Injectable()
export class ReadMessageService {
  constructor(
    @InjectRepository(ReadMessageEntity)
    private reactionsRepository: Repository<ReadMessageEntity>,
  ) {}

  async create(dto: CreateReadMessageDto) {
    return this.reactionsRepository.save(
      await this.reactionsRepository.create(dto),
    );
  }
}
