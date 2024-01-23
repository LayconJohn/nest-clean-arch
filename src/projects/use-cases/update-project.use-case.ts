import { UpdateProjectDto } from "../dto/update-project.dto";
import { Inject, Injectable } from "@nestjs/common";
import { IProjectRepository } from "../project.repository";

@Injectable()
export class UpdateProjectUseCase {
    constructor(
      @Inject('IProjectRepository')
        private readonly projectRepo: IProjectRepository
    ) {}

    async execute(id: string, input: UpdateProjectDto) {
        const project = await this.projectRepo.findById(id)

        project.update(input)
    
        return this.projectRepo.update(project);
    }
}