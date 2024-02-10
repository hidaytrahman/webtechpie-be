// not in used
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ValidationError } from "@nestjs/common";

// @ts-ignore
@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.BAD_REQUEST;

    // Format validation errors for API consistency
    // @ts-ignore
    const formattedErrors = this.formatErrors(exception.errors);

    // Send a custom response with the formatted errors
    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }

  // Helper function to format errors consistently
  private formatErrors(errors: ValidationError[]): Record<string, string>[] {
    return errors.map((error) => ({
      field: error.property,
      message: error.constraints ? Object.values(error.constraints)[0] : 'Invalid value',
    }));
  }
}