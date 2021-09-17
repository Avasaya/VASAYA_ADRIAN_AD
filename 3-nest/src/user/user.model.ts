import { get } from "http";
import { emitWarning } from "process";

export class User{
    private name: string;
    private age: number;
    private email: string;
    private password: string;

    constructor( name:string, age:number, email:string, password: string){

        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }
    userLogs(){
        console.log(`${this.name}:${this.age}:${this.email}`);
    }

    
    login(email:string, password: string){
        if (email === this.email && password === this.password){
            return "UwU Log in Successfully";
        }
        else {
            return "UmU oof Failed";
        }
    }
 
    toJson(){
        return{
            name: this.name,
            age: this.age,
            email: this.email
        }
    }
} 