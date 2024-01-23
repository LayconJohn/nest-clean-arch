import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";

@Injectable()
export class FindOneProjectUseCase {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>,
    ){}

    execute(id: string){
        return this.projectRepo.findOneOrFail({ where: { id  } });
    }
}