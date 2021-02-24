import { HttpException, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ICar } from "./interfaces/car.interface";
import { CarDto } from "./car.dto";

@Injectable()
export class CarService {
  constructor(@InjectModel("car") private readonly carModel: Model<ICar>) {}

  public async getCars() {
    const cars = await this.carModel.find().exec();
    if (!cars || !cars[0]) {
      throw new HttpException("Not found", 404);
    }
    return cars;
  }
  public async getCarById(id: number) {
    const _car = await this.carModel.findOne({id:id}).exec();
    if (!_car) {
      throw new HttpException("Not found", 404);
    }
    return _car;
  }

  public async addCar(Car:CarDto) {
    const _car = new this.carModel(Car);
    return await _car.save();
  }

  public async updateCar(
    id: string,
    propertyName: string,
    propertyValue: string
  ) {
    const _car = await this.carModel
      .findOneAndUpdate(
        { _id:id },
        {
          [propertyName]: propertyValue,
        }
      )
      .exec();
    if (!_car) {
      throw new HttpException("Not found", 404);
    }
    return _car
  }

  public async deleteCar(id: string) {
    const _car = await this.carModel.deleteOne({ _id:id }).exec();
    if (_car.deletedCount === 0) {
      throw new HttpException("Not found", 404);
    }
    return _car;
  }
}
