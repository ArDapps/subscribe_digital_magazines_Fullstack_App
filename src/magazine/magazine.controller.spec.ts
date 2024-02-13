import { Test, TestingModule } from '@nestjs/testing';
import { MagazineController } from './magazine.controller';
import { MagazineService } from './magazine.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';
import { Repository } from 'typeorm';

describe('MagazineController', () => {
  let controller: MagazineController;
  let magazineService: MagazineService;
  const mockCreateMagazineDto = {
    // Mock data for CreateMagazineDto
    title: 'Test Magazine',
    description: 'Test description',
    monthlyPrice: 90,
  };

  const mockJwtToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2ZTRiMzM1LTVkYzctNGMzNi1hOTgwLWIxNmQxM2E0NDkzYSIsImlhdCI6MTcwNzgwOTc1OSwiZXhwIjoxNzA3ODEzMzU5fQ.qikhBzGYTdFq3VZJ-Ti9rJND_fcSUV2HJx-KMeEOGjw';
  const mockUserId = '36e4b335-5dc7-4c36-a980-b16d13a4493a';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazineController],
      imports: [
        JwtModule.register({
          secret: 'MySecretKEY',
          signOptions: {
            expiresIn: 3600,
          },
        }),
        TypeOrmModule.forRoot({
          // Your TypeORM configuration options here
          // Make sure to specify entities as well
        }),
        TypeOrmModule.forFeature([Magazine]),
      ],
      providers: [
        {
          provide: MagazineService,
          useFactory: (magazineRepository: Repository<Magazine>) =>
            new MagazineService(magazineRepository),
          inject: [getRepositoryToken(Magazine)],
        },
      ],
    }).compile();

    controller = module.get<MagazineController>(MagazineController);
    magazineService = module.get<MagazineService>(MagazineService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createMagazine', () => {
    it('should create a new magazine', async () => {
      // Mock request object
      const mockRequest = {
        headers: {
          authorization: `Bearer ${mockJwtToken}`,
        },
      };

      // Mock jwtService's verifyAsync method
      jest
        .spyOn(controller['jwtService'], 'verifyAsync')
        .mockResolvedValue({ id: mockUserId });

      // Mock magazineService's save method
      jest.spyOn(magazineService, 'save').mockResolvedValue('mockMagazine');

      const result = await controller.createMagazine(
        mockCreateMagazineDto,
        mockRequest as any,
      );

      expect(result).toEqual('mockMagazine');
    });

    it('should throw UnauthorizedException if authorization token is missing', async () => {
      // Mock request object without authorization header
      const mockRequest = {
        headers: {},
      };

      await expect(
        controller.createMagazine(mockCreateMagazineDto, mockRequest as any),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
