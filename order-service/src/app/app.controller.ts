import { Controller, Get, Inject, Param  } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from './Constant';
@Controller('orders')
export class AppController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy
  ) {}

 

  @Get(':userId')
  async getOrderForUser(@Param('userId') userId: string) {
    // Call the auth service to validate the user
    const pattern = { cmd: 'validate_user' }; 
    const payload = {userId: Number(userId)};

    const userValidationResponse = await firstValueFrom(this.authClient.send(pattern, payload));

    if (userValidationResponse.status === 'success') {
      // If the user is valid, return the order details
      return {
        message: 'Order details for user',
        orderId: 123,
        product: 'NestJS Book',
        quantity: 1,
        user: userValidationResponse.user
      };
    } else {
      // If the user is invalid, return an error message
      return { error: 'Invalid user' };
    }
  } 
}
