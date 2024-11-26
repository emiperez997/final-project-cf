import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let message = 'Database error';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2002':
        message = 'Unique constraint failed on the fields.';
        status = HttpStatus.CONFLICT;
        break;
      default:
        message = 'Database error';
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
