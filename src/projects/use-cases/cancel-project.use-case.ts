import { Inject, Injectable } from "@nestjs/common";
import { CancelProjectDto } from "../dto/cancel-project.dto";
import { ProjectTypeOrmRepository } from "../project.repository";

@Injectable()
export class CancelProjectUseCase {
    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: ProjectTypeOrmRepository
    ){}

    async execute(id: string, input: CancelProjectDto) {
        const project = await this.projectRepo.findById(id);

        project.cancel(input.cancelled_at);

        return this.projectRepo.create(project);
    }
}