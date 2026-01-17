import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { SignupLocalDto } from './dto/signup-local.dto';
import { LoginLocalDto } from './dto/login-local.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'hidaytrahman@gmail.com';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async validateUser(details: any) {
		const { email } = details;
		const user = await this.userModel.findOne({ email: email });

		if (user) {
			const isAdmin = user.isAdmin || email === ADMIN_EMAIL;
			user.isAdmin = isAdmin;
			const updatedDetails = {
				...details,
				isAdmin,
				password: user.password,
				updatedAt: new Date(),
			};
			await this.userModel.updateOne({ email }, { $set: updatedDetails });
			return user;
		}

		const newUser = new this.userModel(details);
		if (email === ADMIN_EMAIL) {
			newUser.isAdmin = true;
		}
		return newUser.save();
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email });
	}

	async signupLocal(payload: SignupLocalDto) {
		const existing = await this.userModel.findOne({ email: payload.email });

		if (existing && existing.password) {
			throw new ConflictException('User already exists');
		}

		const passwordHash = await bcrypt.hash(payload.password, 10);

		if (existing) {
			existing.password = passwordHash;
			if (payload.firstName && !existing.firstName) {
				existing.firstName = payload.firstName;
			}
			if (payload.lastName && !existing.lastName) {
				existing.lastName = payload.lastName;
			}
			if (payload.email === ADMIN_EMAIL) {
				existing.isAdmin = true;
			}
			existing.updatedAt = new Date();
			return existing.save();
		}

		const user = new this.userModel({
			email: payload.email,
			password: passwordHash,
			firstName: payload.firstName,
			lastName: payload.lastName,
			isAdmin: payload.email === ADMIN_EMAIL,
		});

		return user.save();
	}

	async loginLocal(payload: LoginLocalDto) {
		const user = await this.userModel.findOne({ email: payload.email });

		if (!user || !user.password) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const valid = await bcrypt.compare(payload.password, user.password);

		if (!valid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return user;
	}

	async updateProfile(email: string, payload: UpdateProfileDto) {
		const user = await this.userModel.findOne({ email });

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (payload.firstName !== undefined) {
			user.firstName = payload.firstName;
		}

		if (payload.lastName !== undefined) {
			user.lastName = payload.lastName;
		}

		if (payload.picture !== undefined) {
			user.picture = payload.picture;
		}

		user.updatedAt = new Date();

		return user.save();
	}
}
