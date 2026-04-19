import { Controller } from '@nestjs/common';
import { MessagePattern,Payload } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'validate_user' })
  validateUser(@Payload() data: any) {

    console.log('Received data for user validation:', data);

    if(data.userId === 1){
      return { status: 'success', message: 'User is valid' , 
        user: { id: 1, name: 'John Doe', email: 'john.doe@example.com' }};
    }
    return { status: 'error', message: 'User is invalid' };
   
  }

}
