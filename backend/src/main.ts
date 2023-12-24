import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // config cors
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi giá trị được nhận từ client (ví dụ: ép kiểu chuỗi ngày thành đối tượng ngày)
      whitelist: true, // Loại bỏ các thuộc tính không mong muốn từ DTO
      forbidNonWhitelisted: true, // Ngăn chặn bất kỳ thuộc tính nào không nằm trong DTO được xác định
    }),
  );

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });
  await app.listen(port);
  console.log(`http://localhost:${port}`);
}
bootstrap();
