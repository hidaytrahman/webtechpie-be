import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AdminGuard } from './guards/admin.guard';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'google' }),
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'dev-secret-change-me',
			signOptions: { expiresIn: '15m' },
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		GoogleStrategy,
		GithubStrategy,
		JwtStrategy,
		TokenService,
		AdminGuard,
	],
	exports: [AuthService],
})
export class AuthModule {}
