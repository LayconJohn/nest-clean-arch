import { Column, Entity, PrimaryColumn } from "typeorm";
import * as crypto from "crypto";

export enum ProjectStatus  {
    Pending = 'pennding',
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

    @Column()
    started_at: Date | null;

    @Column()
    cancelled_at: Date | null;

    @Column()
    forecasted_at: Date | null;

    @Column({ type: 'simple-enum' })
    status: ProjectStatus;

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
    }

}
