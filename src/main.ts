import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("API HoopPost User")
    .setDescription("The HoopPost API for the User")
    .setVersion("0.9")
    .addTag("user")
    .addTag("follow")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.enableCors();
  await app.listen(3000);
}

bootstrap();
