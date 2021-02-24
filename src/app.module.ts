import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import {MongooseModule} from '@nestjs/mongoose'
@Module({
  imports: [
    CarModule,                  //remove the <> brackets when inserting DbName and pass
    MongooseModule.forRoot('mongodb+srv://nestJs:<Monogpassword>@cluster0.bfd0h.mongodb.net/<YourDatabaseName>?retryWrites=true&w=majority',{ useFindAndModify: false })
  ],
})
export class AppModule {}
