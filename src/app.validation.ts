import { ValidationPipe, ValidationError } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

export const validationExceptionFactory = (errors: ValidationError[]) => {
	const formattedErrors = errors.reduce<Record<string, unknown>>((acc, error) => {
		acc[error.property] = Object.values(error.constraints || {})
		return acc;
	}, {});

	return new HttpException(
		{ message: 'Validation failed', errors: formattedErrors },
		HttpStatus.BAD_REQUEST,
	);
};

const AppValidation = () => new ValidationPipe({
    exceptionFactory: validationExceptionFactory,
	validateCustomDecorators: true
});

export default AppValidation;