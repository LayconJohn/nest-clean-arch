import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    ) {}

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
