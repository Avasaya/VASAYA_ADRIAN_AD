import { Injectable } from '@nestjs/common';
import { get } from 'http';
import { userInfo } from 'os';
import { identity, map } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class UserService {

    private users: Map<string,User> = new Map<string,User>();

    getAll(){
        for(const [key,users] of this.users.entries()){
            console.log(key);
           users.userLogs();
        }
    }

    
    addUser(user:any){
        var youSir: User;
        youSir = new User(user?.name, user?.age, user?.email, user?.password);
        this.users.set(user.id, youSir);
        this.getAll();
        return "User has been added succesfully";
    }

    replaceUser(user:any, id:string){
        var youSir: User;
        youSir = new User(user?.name, user?.age, user?.email, user?.password);
        this.users.set(id, youSir);
        this.getAll();
    }

  
    searchUser(id: string){
        if(this.users.has(id)){
            return this.users.get(id).toJson();
       }
       else {
           return id + " Does not exist on the database";
       } 
    }

    loginUser(email: string, password: string){
        for(const [number,users] of this.users.entries()){
            return users.login(email, password);
         }
    }

    deleteUser(id:string){
        if(this.users.has(id)){
             this.users.delete(id);

             return id+" Has been deleted!";
        }
        else {
        return id+" does not exist in database!";
        }
    }


}
