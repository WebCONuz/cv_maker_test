import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as basicAuth from "express-basic-auth";

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

    // cors
    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:5173",
          "http://localhost:3000",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    });

    // add auth to read swagger docs
    app.use(
      ["/api/docs"],
      basicAuth({
        users: { kottaAdmin: "12345" },
        challenge: true,
      })
    );

    // swagger
    const config = new DocumentBuilder()
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your Bearer token",
        },
        "authorization"
      )
      .setTitle("CV MAKER PROJECT")
      .setDescription("CV MAKER-REST-API")
      .setVersion("1.0")
      .addTag("NESTJS", "VALIDATION, SWAGGER, BOT, TOKENS, SENDMAIL")
      .addTag("Nest js", "GUARD")
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
