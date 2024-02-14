import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { Subscribe } from './entities/subscribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';
import { Magazine } from 'src/magazine/entities/magazine.entity';
import { MagazineService } from 'src/magazine/magazine.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'MySecretKEY',
      signOptions: {
        expiresIn: 45633600,
      },
    }),
    TypeOrmModule.forFeature([Subscribe, User, Magazine]),
    UserModule,
  ],
  controllers: [SubscribeController],
  providers: [SubscribeService, MagazineService],
  exports: [SubscribeService],
})
export class SubscribeModule {}
