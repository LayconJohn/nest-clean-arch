import { Repository } from "typeorm";
import { Project, ProjectStatus } from "../entities/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateProjectUseCase {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>
    ) {}

    async execute(id: string, input: UpdateProjectDto) {
        const project = await this.projectRepo.findOneOrFail({where: {id} })

        input.name && (project.name = input.name);
        input.description && (project.description = input.description);
    
        return this.projectRepo.save(project);
    }
}