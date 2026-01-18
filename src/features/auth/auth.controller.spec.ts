import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { TokenService } from "./token.service";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUser = {
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    picture: "https://example.com/photo.jpg",
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
  };

  const mockAuthService = {
    findUser: jest.fn(),
    validateUser: jest.fn(),
  };

  const mockTokenService = {
    generateTokens: jest.fn().mockReturnValue({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
      ],
    })
      .overrideGuard(AuthGuard("google"))
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthGuard("github"))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("googleAuth", () => {
    it("should initiate Google OAuth flow", async () => {
      const result = await controller.googleAuth({} as any);
      expect(result).toBeUndefined();
    });
  });

  describe("googleAuthRedirect", () => {
    it("should redirect to frontend callback with tokens", async () => {
      const req = {
        user: mockUser,
        query: { code: "mock-code" },
      };

      const redirect = jest.fn();
      const res: any = { redirect };

      await controller.googleAuthRedirect(req as any, res);

      expect(mockTokenService.generateTokens).toHaveBeenCalledWith(mockUser);

      const expectedBase =
        process.env.FRONTEND_AUTH_CALLBACK_URL ||
        "http://localhost:3000/auth/callback";

      expect(redirect).toHaveBeenCalledTimes(1);
      const [status, url] = redirect.mock.calls[0];
      expect(status).toBe(302);
      expect(url.startsWith(expectedBase)).toBe(true);
      expect(url).toContain("accessToken=");
      expect(url).toContain("refreshToken=");
    });
  });

  describe("githubAuth", () => {
    it("should initiate GitHub OAuth flow", async () => {
      const result = await controller.githubAuth({} as any);
      expect(result).toBeUndefined();
    });
  });

  describe("githubAuthRedirect", () => {
    it("should handle GitHub OAuth callback", async () => {
      const req = { user: mockUser };
      const result = await controller.githubAuthRedirect(req as any);
      expect(result).toEqual({
        statusCode: 200,
        data: mockUser,
        tokens: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
        },
        message: "User successfully authenticated with GitHub",
      });
    });
  });

  describe("getAuthStatus", () => {
    it("should return authenticated status with user when user exists", async () => {
      const req = { user: { email: mockUser.email } };
      mockAuthService.findUser.mockResolvedValueOnce(mockUser);

      const result = await controller.getAuthStatus(req as any);

      expect(result).toEqual({
        isAuthenticated: true,
        user: mockUser,
      });
      expect(mockAuthService.findUser).toHaveBeenCalledWith(mockUser.email);
    });

    it("should return non-authenticated status when user does not exist", async () => {
      const req = {};
      mockAuthService.findUser.mockClear();
      const result = await controller.getAuthStatus(req as any);

      expect(result).toEqual({
        isAuthenticated: false,
      });
      expect(mockAuthService.findUser).not.toHaveBeenCalled();
    });
  });
});
