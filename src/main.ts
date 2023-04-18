import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { callback } from 'telegraf/typings/button';

// async function start() {
//   const app = await NestFactory.create(AppModule)
//   app.use(cookieParser())
//   app.useGlobalPipes(new ValidationPipe())
//   app.use(args: (req, res, next) => {
//     const startTime = Date.now()
//     res.on('finish', () => {
//       const endTime = Date.now()
//       const responseTime = endTime - startTime
//       console.log(
//         `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`
//       );
//     })
//     next()
//   })
//   await app.listen(port, callback: () => {
//     console.log(`Server has been running at ${port}`);
//   })
// }

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;

    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('NestJS Avtozapchast')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, Postgres, sequalize')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.listen(PORT, () => {
      console.log(`Port: ${PORT}. Server is running...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();