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
        if (input.started_at) {
          if (project.status === ProjectStatus.Active) throw new Error("Cannot start actived project");
    
          if (project.status === ProjectStatus.Completed) throw new Error("Cannot start completed project");
    
          if (project.status === ProjectStatus.Cancelled) throw new Error("Cannot start cancelled project");
        
        
          project.status = ProjectStatus.Active;
          project.started_at = input.started_at;
        }
    
    
        if (input.cancelled_at) {
          if (project.status === ProjectStatus.Completed) throw new Error("Cannot cancel completed project")
    
          if (project.status === ProjectStatus.Cancelled) throw new Error("Cannot cancel cancelled project")
    
          if(input.cancelled_at < project.started_at) throw new Error("Cannot cancel before it started")
    
          project.status = ProjectStatus.Cancelled;
          project.cancelled_at = input.cancelled_at; 
        }
    
        if (input.finished_at) {
          if (project.status === ProjectStatus.Completed) throw new Error("Cannot finish completed project")
    
          if (project.status === ProjectStatus.Cancelled) throw new Error("Cannot finish cancelled project")
    
          if(input.finished_at < project.started_at) throw new Error("Cannot finish before it started")
    
          project.status = ProjectStatus.Completed;
          project.finished_at = input.finished_at; 
        }
    
        return this.projectRepo.save(project);
    }
}