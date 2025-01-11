import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dog } from './entities/dog.entity';
import { Model } from 'mongoose';

@Injectable()
export class DogService {
  @InjectModel(Dog.name)
  private readonly dogModel: Model<Dog>;

  async create(createDogDto: CreateDogDto) {
    const dog = new this.dogModel(createDogDto);
    return await dog.save();
  }

  findAll(): Promise<Dog[]> {
    return this.dogModel.find().exec();
  }

  findOne(id: string) {
    return this.dogModel.findById(id);
  }

  update(id: string, updateDogDto: UpdateDogDto) {
    return this.dogModel.findByIdAndUpdate(id, updateDogDto);
  }

  remove(id: string) {
    return this.dogModel.findByIdAndDelete(id);
  }
}
