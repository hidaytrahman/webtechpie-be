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
      // Update existing user with new access token
      await this.userModel.updateOne(
        { email },
        { $set: { ...details, updatedAt: new Date() } }
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