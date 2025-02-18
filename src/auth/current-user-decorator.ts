import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserPayload } from './jwt.stratagy'

export const CurrentUser = createParamDecorator(
  // _: never, o promeiro parametro é a função que usará o decorator, nesse caso não vamos utilizar
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)
