import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
 
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth flow' })
  async googleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  @ApiOkResponse({ description: 'Returns authenticated user payload' })
  async googleAuthRedirect(@Req() req: Request) {
    const user = req.user;
    const validatedUser = await this.authService.validateUser(user);
    return {
      statusCode: 200,
      data: validatedUser,
      message: 'User successfully authenticated'
    };
  }

  @Get('status')
  @ApiOperation({ summary: 'Get authentication status of current session' })
  @ApiOkResponse({ description: 'Returns authentication status and user when available' })
  async getAuthStatus(@Req() req: Request) {
    if (req.user) {
      const user = await this.authService.findUser(req.user['email']);
      return { isAuthenticated: true, user };
    }
    return { isAuthenticated: false };
  }
}
