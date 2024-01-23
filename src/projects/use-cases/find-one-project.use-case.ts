import { Inject, Injectable } from "@nestjs/common";
import { ProjectTypeOrmRepository } from "../project.repository";

@Injectable()
export class FindOneProjectUseCase {

    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: ProjectTypeOrmRepository
    ){}

    execute(id: string){
        return this.projectRepo.findById(id);
    }
}