import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(details: any) {
    const { email } = details;
    const user = await this.userModel.findOne({ email: email });
    
    if (user) {
      const updatedDetails = {
        ...details,
        isAdmin: user.isAdmin,
        updatedAt: new Date(),
      };
      await this.userModel.updateOne(
        { email },
        { $set: updatedDetails }
      );
      return user;
    }

    // Create new user if not exists
    const newUser = new this.userModel(details);
    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email });
  }
}
