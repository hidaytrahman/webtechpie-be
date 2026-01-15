import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(private readonly authService: AuthService) {
		const clientID =
			process.env.GITHUB_CLIENT_ID || 'github-client-id-not-configured';
		const clientSecret =
			process.env.GITHUB_CLIENT_SECRET ||
			'github-client-secret-not-configured';
		const callbackURL =
			process.env.GITHUB_CALLBACK_URL ||
			'http://localhost:8080/api/v1/auth/github/callback';

		super({
			clientID,
			clientSecret,
			callbackURL,
			scope: ['user:email'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: (error: any, user?: any) => void,
	): Promise<any> {
		const primaryEmail =
			profile.emails && profile.emails.length > 0
				? profile.emails[0].value
				: undefined;

		const avatar =
			profile.photos && profile.photos.length > 0
				? profile.photos[0].value
				: undefined;

		const user = {
			email: primaryEmail,
			firstName: profile.displayName || profile.username,
			lastName: '',
			picture: avatar,
			accessToken,
			refreshToken,
		};

		const savedUser = await this.authService.validateUser(user);
		done(null, savedUser);
	}
}
