import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// here we create a custom decorator to get the user object from the request object

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest(); // we use the switchToHttp() method to get the request object but for other need we can use websocket or microservice with switchToWs() and switchToRpc()
    if (data) {
	  return request.user[data];
	}
	return request.user;
  },
);