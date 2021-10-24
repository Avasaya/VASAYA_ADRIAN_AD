import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){
    }

    @Post('/register')
    register(@Body() body:any ) {
      console.log(body);
      return this.userService.register(body);

            /*fails if .has attributes of the wrong type
        is missing an attribute
        has an invalid attribute key
        Email already exists in database 
        */
    
    }

    @Get('/all')
    getAll(@Body() body:any){
    return this.userService.getAll();
    }

    @Get("/:id")
    getId(@Param('id') id ){
       return this.userService.getId(id);
    }

   
    @Put("/:id")
    editUser(@Param('id') id, @Body() body:any)
    {

        if(id!=null && body!=null)
            return this.userService.editUser(id,body);
        else
            return "No parameters added";
    }

    @Get("search/:term")
    searchUser(@Param('term') term)
    {
        return this.userService.searchUser(term);
    }


   
    @Patch("/:id")
    patchUser(@Param('id') id, @Body() body:any)
    {
        if(id!=null && body!=null)
            return this.userService.patchUser(id,body);
        else
            return "No parameters added";
    }

    
    @Delete("/:id")
    deleteUser(@Param('id') id)
    {
        return this.userService.deleteUser(id);
    }


    @Post('/login')
    logIn(@Body() body : any ) {
      
      return this.userService.logIn(body);
    
    }







   
}