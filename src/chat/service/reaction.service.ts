import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReactionDto } from '../model/dto/createReaction.dto';
import { ReactionsEntity } from '../model/reactions/reaction.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactionsEntity)
    private reactionsRepository: Repository<ReactionsEntity>,
  ) {}

  async create(dto: CreateReactionDto) {
    return this.reactionsRepository.save(
      await this.reactionsRepository.create(dto),
    );
  }

  async delete(id: number) {
    return this.reactionsRepository.delete(id);
  }
}
