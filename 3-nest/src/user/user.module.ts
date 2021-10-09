import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

export class User
{
    
    
  toJson() {
    return {
      id: this.id,
      name:this.name,
      age: this.age,
      email: this.email
    }
  }
    static values() {
      throw new Error('Method has not been implemented');
  }
    
  public id : string;
  public name : string;
  public age : number;
  public email : string;
  public password : string;
    User: any;

  constructor(id : string , name:string, age : number, email:string, password : string) {
    this.id = id ;
    this.name = name ;
    this.age = age ;
    this.email = email ;
    this.password = password ;

  }

  public get()
     {
      return{
        id : this.id,
        name : this.name,
        age : this.age,
        email : this.email,
        password : this.password,
      }
    }
    
   
   
      values()
      {
       return{
         id : this.id,
         name : this.name,
         age : this.age,
         email : this.email,
         
       }

      
    }
}