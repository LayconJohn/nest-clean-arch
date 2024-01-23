import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";
import { CompleteProjectDto } from "../dto/complete-project.sto";

@Injectable()
export class CompleteProjectUseCase {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>
    ) {}

    async execute(id: string, input: CompleteProjectDto) {
        const project = await this.projectRepo.findOneOrFail({where: {id} });
    
        project.complete(input.finished_at);
    
        return this.projectRepo.save(project);
    }
}