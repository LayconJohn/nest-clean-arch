import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";
import { CancelProjectDto } from "../dto/cancel-project.dto";

@Injectable()
export class CancelProjectUseCase {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>
    ){}

    async execute(id: string, input: CancelProjectDto) {
        const project = await this.projectRepo.findOneOrFail({where: {id} });

        project.cancel(input.cancelled_at);

        return this.projectRepo.save(project)
    }
}