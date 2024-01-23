import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { FindOneProjectUseCase } from './use-cases/find-one-project.use-case';
import { UpdateProjectUseCase } from './use-cases/update-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';
import { CompleteProjectUseCase } from './use-cases/complete-project.use-case';
import { ProjectTypeOrmRepository } from './project.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project])
  ],
  controllers: [ProjectsController],
  providers: [
    CreateProjectUseCase, 
    FindAllProjectsUseCase, 
    FindOneProjectUseCase, 
    UpdateProjectUseCase, 
    StartProjectUseCase,
    CancelProjectUseCase,
    CompleteProjectUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository
    },
  ],
})
export class ProjectsModule {}
 