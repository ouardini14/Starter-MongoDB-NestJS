import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from "@nestjs/config";
const path = require('path');

export const NodeMailerConfig = MailerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        transport: {
            host: process.env.MAIL_HOST,
            port: 465,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        },
        defaults: {
            from: 'support@gmail.com',
        },
        preview: false,
        template: {
            dir: path.resolve(__dirname, '../mail-templates/'),
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    }),
})