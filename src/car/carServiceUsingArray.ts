import { HttpException, Injectable } from "@nestjs/common";
import { Cars } from "./car.mock";

@Injectable()
export class CarService {
  private cars = Cars;
  public async getCars() {
    return this.cars;
  }

  public async getCarById(id:number){
    const car = this.cars.find((car) => car.id === id)    
    if(!car){
        throw new HttpException("not found",404);
    }
    return car;
  }

  public async addCar(car){
    this.cars.push(car);  
    return "added syccessfully";
  }


  public async updateCar(id:number, propertyName:string, propertyValue:string){

    const car = this.cars.find((car) => car.id===id)    
    if(!car){
        throw new HttpException("not found",404);
    }
    car[propertyName] = propertyValue;
    this.cars[car.id] = car;
    return car;
  }


  public async deleteCar(id:number){

    const index = this.cars.findIndex((car) => car.id===id)
    if(index ===-1)
    {
        throw new HttpException("Not found",404);
    }
    this.cars.splice(index,1);
    return this.cars;
  }
}
