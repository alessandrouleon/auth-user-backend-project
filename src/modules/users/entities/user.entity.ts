import { randomUUID as uuid } from "crypto";

export class UserEntity {
     id: string;
     name: string;
     username: string;
     email: string;
     password: string;
     createdAt: Date;
     updatedAt: Date;
     deletedAt: Date;
   
    constructor(props: Omit<UserEntity, 'id'>, id?: string) {
        Object.assign(this, props);
        this.id = id ?? uuid();    
    }
}