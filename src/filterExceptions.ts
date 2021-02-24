import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
        console.log('apply filter exception')
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
        const msg = exception instanceof HttpException
        ? exception.message
        : "";
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message:msg,
        path: request.url,
      });

    }
  }