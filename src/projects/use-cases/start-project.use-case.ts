import { InjectRepository } from "@nestjs/typeorm";
import { Project, ProjectStatus } from "../entities/project.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { StartProjectDto } from "../dto/start-project.dto";

@Injectable()
export class StartProjectUseCase {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>
    ){}

    async execute(id: string, input: StartProjectDto) {
        const project = await this.projectRepo.findOneOrFail({where: {id} })
        
        if (project.status === ProjectStatus.Active) throw new Error("Cannot start actived project");
    
        if (project.status === ProjectStatus.Completed) throw new Error("Cannot start completed project");
  
        if (project.status === ProjectStatus.Cancelled) throw new Error("Cannot start cancelled project");
      
      
        project.status = ProjectStatus.Active;
        project.started_at = input.started_at;

        return this.projectRepo.save(project)
    }
}