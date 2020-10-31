import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowsService } from './flows.service';
import { FlowRepository } from './repository/flow.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FlowRepository])],
  providers: [FlowsService],
})
export class FlowsModule {}
