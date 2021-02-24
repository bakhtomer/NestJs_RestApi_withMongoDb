import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CarDto{

    @IsNumber()
    @IsNotEmpty()
    readonly id:number;
    @IsString()
    readonly brand: string;
    @IsString()
    readonly color: string;
    @IsString()
    readonly modell: string;
}