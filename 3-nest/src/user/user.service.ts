import { Injectable } from '@nestjs/common';
import e from 'express';
import { InformationEvent } from 'http';
import { User } from './user.module';
import { v4 as uuidv4 } from 'uuid';
import { Helper } from './helper';


@Injectable()
export class UserService {
    private users : Map<string,User> = new Map<string,User>();
    private populatedData : Map<string,User> = Helper.populate();
    
    constructor()
    {
        console.log("shets");

        this.users = Helper.populate();
        console.log(this.users);
    }
     register(body:any){
        var unDefined;
        var user = null;
        var id = uuidv4();
        try{
        
            
            if (  body.name == unDefined ||
                body.age == unDefined || body.email == unDefined ||
               body.password == unDefined )
            {
                return {
                    success: false,
                    data: "Attribute is missing!"
                }
            }

            if ( typeof body.name != typeof "noice" ||
                typeof body.age != typeof 23 || typeof body.email != typeof "body" ||
                typeof body.password != typeof "password" )
            {
                return {
                    success: false,
                    data: "Attribute is a wrong type!" 
                } 
            }

            var existingUser = this.getId(body.id);
            var existingUserEmail = this.searchUser(body.email);

            if (typeof existingUser.data != typeof ""  )
            {
                return {
                    success: false,
                    data: "Attribute key is invalid"
                } 
            }

            if (typeof existingUserEmail.data != typeof "")
            {
                return{
                    success: false,
                    data: "Email is already in the database"
                } 
            }
        
            
            user = new User(id , body.name, body.age, body.email, body.password);
            this.populatedData.set(id, user);
            
        } catch(e)

        {
            console.log(e);
            return {
                success: false,
                data : "Oops there is an error"
            };
        }

        
        return {
            success: true,
            data: user
        };
        
    } 

    getAll(){

        var userList = [];
        this.populatedData.forEach((u)=>
        {
            var user = u;
            var bodyx = 
            {
                id : user.id,
                name : user.name,
                age : user.age,
                email : user.email
            }

            userList.push(bodyx);
        })

       return {
           success: true,
           data: userList
       }
    }

     getId(id :any){
        var data = null;


        this.populatedData.forEach((u)=>
        {
            var user = u;

            if (user.id == id )
            {
                var ux = {
                    id : user.id,
                    name : user.name,
                    age : user.age,
                    email : user.email
                };
                data = null;

                data ={
                    success: true,
                    data: ux
                };
                console.log(data);

            }
        })

        if(!data)
            return {
                success: false,
                data: "ID does not match any user in the databse pls try again"
            }
                

        
       return data;
    }

    editUser(id:any, body:any)
    {
        var unDefined;
        var user = null;
        try{
            this.populatedData.forEach((u)=>
            {
                if (u.id == id )
                {
                    user = u;
                }
            });
                    

            if (  body.name == unDefined ||
                body.age == unDefined || body.email == unDefined ||
                body.password == unDefined )
            {
                return{
                    success: false,
                    data: "An Attribute is MISSING!"
                } 
            }

            if (  typeof body.name != typeof "noice" ||
                typeof body.age != typeof 23 || typeof body.email != typeof "body" ||
                typeof body.password != typeof "password" )
            {
                return {
                    success: false,
                    data: "Attribute has a wrong type!"
                }
                    
            }

            var existingUser = this.getId(body.id).success;
            var existingUserEmail = this.searchUser(body.email).success; 

            if (existingUser ) 
            {
                return {
                    success: false,
                    data: "Attribute key is invalid"
                }
            }

            if (existingUserEmail)
            {
                return {
                    success: false,
                    data: "Email already exist in database!"
                }
            }
//hmmmmmm
            var updatedUser = new User(user.id, body.name, body.age, body.email, body.password);
            this.populatedData.set(user.id,updatedUser);

            updatedUser.password = null;
                
                

            return {
                success: true, 
                data: {
                    id : updatedUser.id,
                    name : updatedUser.name,
                    age: updatedUser.age,
                    email : updatedUser.email
                }
            }

        }catch(e)
        {
            return {
                success: false,
                data: "grrrr"
            }
        }

       return {
           success: false,
           data: "ok"
       }
    }

    patchUser(id:any, body:any)
    {

        var hasChanged = false;
        
        try{
            var existingUserEmail = null
            var user = null;
            if ( body.email != null )
            {
                 existingUserEmail = this.searchUser(body.email).success;
            }

            this.populatedData.forEach((u) =>
            {
                if (u.id == id )
                {
                    user = u;
                }
            });
                
        if(body.name != user.name && body.name != null  && !(body.name === "")) 
        {
        
            user.name = body.name;
            hasChanged = true;
            if ( typeof body.name != typeof "ok"  )
            {
                return {
                    success: false,
                    data: "Attribute has a wrong type!" 
                }
            }

        }
            
        if(body.age != user.age && body.age != null  && !(body.age === ""))
        {
            user.age =body.age;
            hasChanged = true;
            if ( typeof body.age != typeof 23  )
            {
                return { 
                    success: false,
                    data: "Attribute has a wrong type!" }
            }

        }

        if(existingUserEmail != null)
        {

            if(body.email!=user.email && body.email != null  && !(body.email === "") )
            {
                user.email = body.email;
                hasChanged = true;
                if ( typeof body.email != typeof "ok"  )
                {
                    return {
                        success: false,
                        data: "Attribute has a wrong type!" 
                    }
                }
                
                
            }


            if ( existingUserEmail && !(body.email != user.email) )
            {
                return {
                    success: false,
                    data: "Email already exist in database!"
                }
            }
        }



        if(body.password != user.password && body.password != null  && !(body.password === "") )
        {

            user.password = body.password;
            hasChanged = true;
            if ( typeof body.password != typeof "ok"  )
            {
                return {
                    success: false,
                    data: "Attribute has a wrong type!"
                }
            }
            
        }

        

        if(hasChanged)
        {
            var updatedUser = new User(user.id, user.name, user.age, user.email, user.password);
            this.populatedData.set(user.id, updatedUser); 
            return {
                success: true,
                data: {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                }
            };
        }
        else return {
            success: false,
            data: "There are no changes"
        };
        
                  
             
                

        }catch(e)
        {
            return {
            success : false,
            data: "There are no changes"
        };
        }

       
    }

    searchUser(term : any)
    {
        var array = [];
        if(this.populatedData == null)
            return null;

        this.populatedData.forEach((u) =>
        {
            var user = u;
               
            if (user.id == term || user.name.toUpperCase() == term.toUpperCase() || user.email.toUpperCase() == term.toUpperCase() || user.age == term )
            {
                
                array.push( {
                    id : user.id,
                    name : user.name,
                    age : user.age,
                    email : user.email
                
                });

            }
    
        } )
        if ( array.length > 0 )
               return{
                    success : true,
                    data: array
               } ;

        return {
            success:false,
            data: "Term is not found in the database"
        }
    }

    deleteUser(id :any)
    {
        try{
            var user = null;
            this.populatedData.forEach((u)=>
            {
                user = u;
            })

            if(user)
            {
                if (user.id == id )
                {
                    this.populatedData.delete(user.id);
                    return {
                        success: true,
                        data: "Deleted Successfully, Good Job"
                    };
                }
                
            }


        }catch(e)
        {
            return {
                success: false,
                data: "Error : Failure in Deleting"
            };
        }

        return {
            success: false,
            data: "Error : ID user not found"
        };
    }

    logIn( body:any )
    {
        try{
            var authenticatedUser = null;
            if(!body)
            return {
                success: false,
                data: "No parameters"
            };
            this.populatedData.forEach((u) =>
            {
                var user =  u;


                
                if ((user.password == body.password ) && (user.email == body.email) )
                {
                    authenticatedUser = u;
                }
                
            });



        }catch(e)
        {
            return {
                success: false,
                data: "Oops there is an error"
            } 
        }
        if(authenticatedUser !=null) 
        {
            return{
                success: true,
                data : authenticatedUser
            } 
        }
        else{
            return{
                success: false,
                data: "Email or Password is incorrect"
            } 
        }

    }


}