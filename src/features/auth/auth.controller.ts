import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly tokenService: TokenService
	) {}

	@Get("google")
	@UseGuards(AuthGuard("google"))
	@ApiOperation({ summary: "Initiate Google OAuth flow" })
	async googleAuth(@Req() req: Request) {}

	@Get("google/callback")
	@UseGuards(AuthGuard("google"))
	@ApiOperation({ summary: "Handle Google OAuth callback" })
	@ApiOkResponse({ description: "Returns authenticated user payload" })
	async googleAuthRedirect(@Req() req: Request) {
		const user = req.user;
		const tokens = this.tokenService.generateTokens(user);
		return {
			statusCode: 200,
			data: user,
			tokens,
			message: "User successfully authenticated with Google",
		};
	}

	@Get("github")
	@UseGuards(AuthGuard("github"))
	@ApiOperation({ summary: "Initiate GitHub OAuth flow" })
	async githubAuth(@Req() req: Request) {}

	@Get("github/callback")
	@UseGuards(AuthGuard("github"))
	@ApiOperation({ summary: "Handle GitHub OAuth callback" })
	@ApiOkResponse({ description: "Returns authenticated GitHub user payload" })
	async githubAuthRedirect(@Req() req: Request) {
		const user = req.user;
		const tokens = this.tokenService.generateTokens(user);
		return {
			statusCode: 200,
			data: user,
			tokens,
			message: "User successfully authenticated with GitHub",
		};
	}

	@Get("status")
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: "Get authentication status of current session" })
	@ApiOkResponse({
		description: "Returns authentication status and user when available",
	})
	async getAuthStatus(@Req() req: Request) {
		if (req.user) {
			const user = await this.authService.findUser(req.user["email"]);
			return { isAuthenticated: true, user };
		}
		return { isAuthenticated: false };
	}
}
