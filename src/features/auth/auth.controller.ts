import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
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
  async getAuthStatus(@Req() req: Request) {
    if (req.user) {
      const user = await this.authService.findUser(req.user['email']);
      return { isAuthenticated: true, user };
    }
    return { isAuthenticated: false };
  }
}