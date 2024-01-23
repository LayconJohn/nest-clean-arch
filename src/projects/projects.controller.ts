import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { FindOneProjectUseCase } from './use-cases/find-one-project.use-case';
import { UpdateProjectUseCase } from './use-cases/update-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';
import { CancelProjectDto } from './dto/cancel-project.dto';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly findAllProjectsUseCase: FindAllProjectsUseCase,
    private readonly findOneProjectUseCase: FindOneProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly startProjectUseCase: StartProjectUseCase,
    private readonly cancelProjectUseCase: CancelProjectUseCase
    ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneProjectUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.updateProjectUseCase.execute(id, updateProjectDto);
  }


  @Post(":id/start")
  start(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto)
  }

  @Post(":id/cancel")
  cancel(@Param('id') id: string, @Body() cancelProjectDto: CancelProjectDto) {
    return this.cancelProjectUseCase.execute(id, cancelProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
