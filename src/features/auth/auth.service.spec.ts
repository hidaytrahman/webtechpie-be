import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let model: Model<UserDocument>;

  const mockUser = {
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    picture: 'https://example.com/photo.jpg',
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token'
  };

  const mockUserModel = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    save: jest.fn(),
    prototype: {
      save: jest.fn().mockResolvedValue(mockUser)
    }
  };

  function MockUserModel(details) {
    this.save = mockUserModel.prototype.save;
    Object.assign(this, details);
    return this;
  }
  Object.assign(MockUserModel, mockUserModel);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should update existing user', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(mockUser);
      mockUserModel.updateOne.mockResolvedValueOnce({ modifiedCount: 1 });

      const result = await service.validateUser(mockUser);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(mockUserModel.updateOne).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('should create new user if not exists', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);
      mockUserModel.save.mockResolvedValueOnce(mockUser);

      const result = await service.validateUser(mockUser);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findUser', () => {
    it('should find user by email', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(mockUser);

      const result = await service.findUser(mockUser.email);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);

      const result = await service.findUser('nonexistent@example.com');

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
      expect(result).toBeNull();
    });
  });
});