import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "src/user/user.service";

@ValidatorConstraint({ name: 'IsEmailUserAlreadyExist', async: true })
@Injectable()
export class IsEmailUserAlreadyExistConstraint
	implements ValidatorConstraintInterface
{
	private static useuserService: UserService;

	constructor(protected readonly userService: UserService) {
		// Разобраться почему не приходит сервис юзера
		// console.log(userService)
		if (!IsEmailUserAlreadyExistConstraint.useuserService) {
			IsEmailUserAlreadyExistConstraint.useuserService = userService;
		}else{
			this.userService = IsEmailUserAlreadyExistConstraint.useuserService;
		}
	}
	
	async validate(text: string) {
		return !(await this.userService.userExists({
			email: text,
		}));
	}
}
    
export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
	registerDecorator({
		target: object.constructor,
		propertyName: propertyName,
		options: validationOptions,
		constraints: [],
		validator: IsEmailUserAlreadyExistConstraint,
	});
	};
}