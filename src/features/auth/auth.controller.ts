import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SignupLocalDto } from './dto/signup-local.dto';
import { LoginLocalDto } from './dto/login-local.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly tokenService: TokenService,
	) {}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	@ApiOperation({ summary: 'Initiate Google OAuth flow' })
	async googleAuth(@Req() req: Request) {}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	@ApiOperation({ summary: 'Handle Google OAuth callback' })
	@ApiOkResponse({
		description:
			'Redirects to frontend callback with accessToken and refreshToken',
	})
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		const code = (req.query && (req.query['code'] as string)) || undefined;
		if (code) {
			// Google OAuth code already exchanged by the AuthGuard/strategy.
			// Kept here for observability or future logging if needed.
		}

		const user = req.user;
		const tokens = this.tokenService.generateTokens(user);

		const frontendCallback =
			process.env.FRONTEND_AUTH_CALLBACK_URL ||
			'http://localhost:3000/auth/callback';

		const redirectUrl = `${frontendCallback}?accessToken=${encodeURIComponent(
			tokens.accessToken,
		)}&refreshToken=${encodeURIComponent(tokens.refreshToken)}`;

		res.redirect(302, redirectUrl);
	}

	@Get('github')
	@UseGuards(AuthGuard('github'))
	@ApiOperation({ summary: 'Initiate GitHub OAuth flow' })
	async githubAuth(@Req() req: Request) {}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	@ApiOperation({ summary: 'Handle GitHub OAuth callback' })
	@ApiOkResponse({ description: 'Returns authenticated GitHub user payload' })
	async githubAuthRedirect(@Req() req: Request) {
		const user = req.user;
		const tokens = this.tokenService.generateTokens(user);
		return {
			statusCode: 200,
			data: user,
			tokens,
			message: 'User successfully authenticated with GitHub',
		};
	}

	@Post('signup')
	@ApiOperation({ summary: 'Sign up with email and password' })
	@ApiBody({
		type: SignupLocalDto,
		examples: {
			default: {
				summary: 'Basic signup example',
				value: {
					email: 'user@example.com',
					password: 'strongpassword',
					firstName: 'John',
					lastName: 'Doe',
				},
			},
		},
	})
	@ApiOkResponse({
		description: 'Returns created or updated user with tokens',
	})
	async signupLocal(@Body() payload: SignupLocalDto) {
		const user = await this.authService.signupLocal(payload);
		const tokens = this.tokenService.generateTokens(user);
		return {
			statusCode: 201,
			data: user,
			tokens,
			message: 'User successfully signed up',
		};
	}

	@Post('login')
	@ApiOperation({ summary: 'Log in with email and password' })
	@ApiBody({
		type: LoginLocalDto,
		examples: {
			default: {
				summary: 'Basic login example',
				value: {
					email: 'user@example.com',
					password: 'strongpassword',
				},
			},
		},
	})
	@ApiOkResponse({ description: 'Returns authenticated user with tokens' })
	async loginLocal(@Body() payload: LoginLocalDto) {
		const user = await this.authService.loginLocal(payload);
		const tokens = this.tokenService.generateTokens(user);
		return {
			statusCode: 200,
			data: user,
			tokens,
			message: 'User successfully logged in',
		};
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get profile of current authenticated user' })
	@ApiOkResponse({ description: 'Returns the current user profile' })
	async getMe(@Req() req: Request) {
		const email = req.user && req.user['email'];
		if (!email) {
			return null;
		}
		const user = await this.authService.findUser(email);
		return user;
	}

	@Patch('me')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update profile of current authenticated user' })
	@ApiBody({
		type: UpdateProfileDto,
		examples: {
			default: {
				summary: 'Update basic profile fields',
				value: {
					firstName: 'UpdatedFirstName',
					lastName: 'UpdatedLastName',
					picture: 'https://example.com/avatar.png',
				},
			},
		},
	})
	@ApiOkResponse({ description: 'Returns the updated user profile' })
	async updateMe(@Req() req: Request, @Body() payload: UpdateProfileDto) {
		const email = req.user && req.user['email'];
		const user = await this.authService.updateProfile(email, payload);
		return user;
	}

	@Get('status')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get authentication status of current session' })
	@ApiOkResponse({
		description: 'Returns authentication status and user when available',
	})
	async getAuthStatus(@Req() req: Request) {
		if (req.user) {
			const user = await this.authService.findUser(req.user['email']);
			return { isAuthenticated: true, user };
		}
		return { isAuthenticated: false };
	}

	@Post('admin/ping')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Admin-only private test endpoint' })
	@ApiOkResponse({ description: 'Returns success when caller is admin user' })
	async adminPing(@Req() req: Request) {
		return {
			statusCode: 200,
			message: 'Admin access granted',
			user: req.user,
		};
	}
}
