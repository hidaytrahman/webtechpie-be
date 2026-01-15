import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface TokenPair {
	accessToken: string;
	refreshToken: string;
}

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	generateTokens(user: any): TokenPair {
		const payload = {
			sub: user._id ? user._id.toString() : user.id,
			email: user.email,
		};

		const accessToken = this.jwtService.sign(payload);
		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: '7d',
		});

		return { accessToken, refreshToken };
	}
}
