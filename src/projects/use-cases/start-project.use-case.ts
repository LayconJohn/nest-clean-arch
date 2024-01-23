import { InjectRepository } from "@nestjs/typeorm";
import { Project, ProjectStatus } from "../entities/project.entity";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { StartProjectDto } from "../dto/start-project.dto";
import { ProjectTypeOrmRepository } from "../project.repository";

@Injectable()
export class StartProjectUseCase {
    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: ProjectTypeOrmRepository
    ){}

    async execute(id: string, input: StartProjectDto) {
        const project = await this.projectRepo.findById(id);

        project.start(input.started_at)

        return this.projectRepo.create(project);
    }
}