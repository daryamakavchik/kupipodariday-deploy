import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ErrorCode } from './exceptions/error-constants';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ServerException } from './exceptions/exception-constructor';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new ServerException(ErrorCode.ValidationError),
    }),
  );

  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: '*',
    // [
    //   'http://kupipodariday.student.nomoredomains.monster',
    //   'https://kupipodariday.student.nomoredomains.monster',
    //   'http://localhost:8081',
    // ],
  });
  app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authortization',
    );
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(limiter);
  app.use(helmet());

  await app.listen(3000);
}

bootstrap();
