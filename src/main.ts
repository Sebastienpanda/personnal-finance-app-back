import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, type NestFastifyApplication, } from '@nestjs/platform-fastify';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyHelmet from '@fastify/helmet';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: true,
        }),
    );

    app.setGlobalPrefix('/api');

    app.getHttpAdapter()
        .getInstance()
        .addHook('onRequest', (req, res, done) => {
            const start = Date.now();
            res.raw.once('finish', () => {
                const duration = Date.now() - start;
                console.log(
                    `[${req.method}] ${req.url} - ${res.statusCode} - ${duration}ms`,
                );
            });

            done();
        });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await app.register(fastifyRateLimit as any, {
        max: 5,
        timeWindow: '1 minute',
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await app.register(fastifyHelmet as any);

    app.enableCors({
        origin: 'http://localhost:4200',

        methods: ['GET', 'POST', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    await app.listen(3000);
}

void bootstrap();
