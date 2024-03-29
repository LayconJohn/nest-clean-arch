import { Column, Entity, PrimaryColumn } from "typeorm";
import * as crypto from "crypto";
import { UpdateProjectDto } from "../dto/update-project.dto";

export enum ProjectStatus  {
    Pending = 'pending',
    Active = 'active',
    Cancelled = "cancelled",
    Completed = "completed"
}

@Entity()
export class Project {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true, type: 'datetime' })
    started_at: Date | null;

    @Column({ nullable: true, type: 'datetime' })
    cancelled_at: Date | null;

    @Column({ nullable: true, type: 'datetime' })
    finished_at: Date | null;

    @Column({ nullable: true, type: 'datetime' })
    forecasted_at: Date | null;

    @Column({ type: 'simple-enum' })
    status: ProjectStatus = ProjectStatus.Pending;

    constructor(props: {
        name: string;
        description: string;
        started_at?: Date | null;
        cancelled_at?: Date | null;
        forecasted_at?: Date | null;
        
    },
    id?: string
    ) {
        Object.assign(this, props);
        this.id = id ?? crypto.randomUUID()

        if (props?.started_at) this.start(props.started_at)
    }

    start(started_at: Date) {
        if (this.status === ProjectStatus.Active) throw new Error("Cannot start actived project");
    
        if (this.status === ProjectStatus.Completed) throw new Error("Cannot start completed project");
  
        if (this.status === ProjectStatus.Cancelled) throw new Error("Cannot start cancelled project");

        this.status = ProjectStatus.Active;
        this.started_at = started_at;
    }

    cancel(cancelled_at: Date) {
        if (this.status === ProjectStatus.Completed) throw new Error("Cannot cancel completed project")
    
        if (this.status === ProjectStatus.Cancelled) throw new Error("Cannot cancel cancelled project")
  
        if(this.cancelled_at < this.started_at) throw new Error("Cannot cancel before it started")
  
        this.status = ProjectStatus.Cancelled;
        this.cancelled_at = cancelled_at; 
    }

    complete(finished_at: Date) {
        if (this.status === ProjectStatus.Completed) throw new Error("Cannot finish completed project")
    
        if (this.status === ProjectStatus.Cancelled) throw new Error("Cannot finish cancelled project")
  
        if(this.finished_at < this.started_at) throw new Error("Cannot finish before it started")
  
        this.status = ProjectStatus.Completed;
        this.finished_at = finished_at; 
    }

    update(updateProjectDto: UpdateProjectDto) {
        this.name && (this.name = updateProjectDto.name);
        this.description && (this.description = updateProjectDto.description);
    }
}
