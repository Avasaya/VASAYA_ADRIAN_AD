import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get('/all')
    getAll(){
        return this.userService.getAll(); 
    }

    @Post('/addUser')
    addUser(@Body() user: any){
        return this.userService.addUser(user);
    }
    @Put('/:id')
    replaceUser(@Body() user: any, @Param("id") id:string){
        return this.userService.replaceUser(user, id);
    }

    @Get('/:id')
    searchUser(@Param("id") id: string){
        return this.userService.searchUser(id);
    }

    @Post('/login')
    loginUser(@Body("email") email:string, @Body("password") password:string){
        return this.userService.loginUser(email, password);
    }

    @Delete('/delete/:id')
    deleteId(@Param("id") id: string){
        return this.userService.deleteUser(id);
    }

    
}
