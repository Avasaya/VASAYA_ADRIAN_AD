import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {

    getHello(name: string){
        return "Hi There " +name + " Nice to meet you ^_^";
    }

    loopsTriangle(height: number){
    
        for (var i = 1; i <= height; i++) {
          var string = '';
          var j = i;
          while(j){
                string += "*";
                j--;
        }
        console.log(string);
    }  
        return; 
    }

    primeNumber(number: number){
        for (var x = 2; x < number ; x++){
            if(number % x != 0){
                return "HOORAYY "+ number +" Is a Prime Number!!";
            }
                else if (number % x == 0) {
                return "Uh Oh " + number +" Is a not Prime Number...";
                }
                else if (number % 3 == 0){
                return "Uh Oh " + number +" Is a not Prime Number...";
                }
            }
    }

}
