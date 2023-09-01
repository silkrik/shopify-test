import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { TenantsModule } from './core/tenants/tenants.module';
import { UsersModule } from './core/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ShopifyModule } from './core/shopify/shopify.module';

@Module({
  imports: [PrismaModule, UsersModule, TenantsModule, ConfigModule.forRoot({ isGlobal: true }), ShopifyModule],
  controllers: [AppController],
  providers: [JwtService, AppService, AuthService],
})
export class AppModule {}
