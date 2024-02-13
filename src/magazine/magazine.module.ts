import { Module } from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { MagazineController } from './magazine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'MySecretKEY',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([Magazine]),
  ],

  controllers: [MagazineController],
  providers: [MagazineService],
  exports: [MagazineService],
})
export class MagazineModule {}
