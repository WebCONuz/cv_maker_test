import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function start() {
  try {
    // port
    const PORT = process.env.PORT || 3030;

    // app
    const app = await NestFactory.create(AppModule);

    // cookie-parser
    app.use(cookieParser());

    // global validation
    app.useGlobalPipes(new ValidationPipe());

    // global prefix
    app.setGlobalPrefix("api");

    // swagger
    const config = new DocumentBuilder()
      .setTitle("CV MAKER PROJECT")
      .setDescription("CV MAKER-REST-API")
      .setVersion("1.0")
      .addTag("NESTJS", "VALIDATION, SWAGGER, BOT, TOKENS, SENDMAIL")
      .addTag("Nest js", "GUARD")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    // listen app
    await app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
