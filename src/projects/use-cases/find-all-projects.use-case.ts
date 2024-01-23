import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Project } from "../entities/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectTypeOrmRepository } from "../project.repository";

@Injectable()
export class FindAllProjectsUseCase {

    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: ProjectTypeOrmRepository
        ){}


    execute () {
        return this.projectRepo.findAll();
    }
}