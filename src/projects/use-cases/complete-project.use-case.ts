import { Inject, Injectable } from "@nestjs/common";
import { CompleteProjectDto } from "../dto/complete-project.sto";
import { ProjectTypeOrmRepository } from "../project.repository";

@Injectable()
export class CompleteProjectUseCase {
    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: ProjectTypeOrmRepository
    ) {}

    async execute(id: string, input: CompleteProjectDto) {
        const project = await this.projectRepo.findById(id);
    
        project.complete(input.finished_at);
    
        return this.projectRepo.create(project);
    }
}