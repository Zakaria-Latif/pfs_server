import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGuard extends AuthGuard('local'){
    constructor(){
        super()
    }
    
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const gqlReq = ctx.getContext().req;
        const {
          loginInput: { email, password },
        } = ctx.getArgs();
        gqlReq.body.email = email;
        gqlReq.body.password = password;
        return gqlReq;
      } 
}