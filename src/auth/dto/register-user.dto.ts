import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class RegisterUserDto {
    @IsEmail({}, { message: 'Невірний формат email' })
    @IsNotEmpty()
    loginEmail: string;

    @IsNotEmpty({ message: 'Пароль обов\'язковий' })
    @MinLength(6, { message: 'Пароль має містити мінімум 6 символів' })
    password: string;

    @IsNotEmpty({ message: 'Ім\'я обов\'язкове' })
    @MaxLength(50)
    firstName: string;

    @IsNotEmpty({ message: 'Прізвище обов\'язкове' })
    @MaxLength(50)
    lastName: string;
}
