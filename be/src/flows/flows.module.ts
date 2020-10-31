import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowsService } from './flows.service';
import { FlowRepository } from './repository/flow.repository';
import { FlowsController } from './flows.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FlowRepository])],
  providers: [FlowsService],
  controllers: [FlowsController],
})
export class FlowsModule {}
