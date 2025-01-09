import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule, 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:async (configService: ConfigService) => {
        const user = configService.get('MONGO_DB_USER');
        const password = configService.get('MONGO_DB_PASSWORD');
        const host = configService.get('MONGO_DB_HOST');
        const port = configService.get('MONGO_DB_PORT');
        const dbName = configService.get('MONGO_DB_NAME');

        return {
          uri: `mongodb://${user}:${password}@${host}:${port}/${dbName}`,
          authSource: "admin"
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
