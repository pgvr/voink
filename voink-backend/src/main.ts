import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as proxy from "http-proxy-middleware"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.use(
        "/proxy",
        proxy.createProxyMiddleware({
            pathRewrite: {
                "^/proxy/": "/",
            },
            target: "https://vod-metro.twitch.tv",
            secure: false,
            changeOrigin: true,
        }),
    )
    const port = process.env.PORT || 3000
    await app.listen(port)
}
bootstrap()
