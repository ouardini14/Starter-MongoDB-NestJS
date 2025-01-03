import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async create(user: Partial<User>): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async find(user: any | Partial<User>, fieldsToSelect?: string): Promise<User | null> {
        return !fieldsToSelect ? this.userModel.findOne(user).exec() : this.userModel.findOne(user).select(fieldsToSelect).exec()
    }


    async update(user:Partial<User>): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(user._id,user)
    }
}
