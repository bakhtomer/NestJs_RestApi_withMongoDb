import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
  UseFilters,
} from "@nestjs/common";
import { query } from "express";
import { CarDto } from "./car.dto";
import { CarService } from "./car.service";
import { AllExceptionsFilter } from "../filterExceptions";
@Controller("car")
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars() {
    return this.carService.getCars();
  }

  @Get(":id")
  async getCarById(@Param("id") id: number) {
    return this.carService.getCarById(id);
  }

  @Post()
  @UseFilters(new AllExceptionsFilter())
  async addCar(@Body(new ValidationPipe()) car: CarDto) {
    return this.carService.addCar(car);
  }

  @Put(":id")
  async updateCar(@Param("id") id: string, @Query() query) {
    const { propertyName, propertyValue } = query;
    return this.carService.updateCar(id, propertyName, propertyValue);
  }

  @Delete(":id")
  async deleteCar(@Param("id") id: string) {
    return this.carService.deleteCar(id);
  }
}
