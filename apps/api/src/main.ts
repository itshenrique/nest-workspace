require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerInterceptor } from '@app/shared/common/interceptors';
import { get } from 'lodash';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

declare const module: any;

function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Nest Workspace')
    .setDescription('Core API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cookieParser());

  app.useGlobalInterceptors(new LoggerInterceptor());
  app.enableCors();
  app.setGlobalPrefix('api');
  configureSwagger(app);

  await app.listen(get(process, 'env.API_PORT', 3000));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
