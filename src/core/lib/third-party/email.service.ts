import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Lang } from 'src/core/enums/lang-enum';
import { getFormattedDate } from 'src/core/utils/utils';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendWelcomeEmail(userEmail: string, lang: any | Lang): Promise<any> {
        lang = this.getLang(lang)
        console.log("----------SENDING WELCOME MAIL----------- " + userEmail)
        return await this.mailerService.sendMail({
            to: userEmail,
            subject: this.getSubject(lang, 'welcome'),
            template: this.getTemplatePath(lang, "welcome"),
            context: {
                frontEndUrl: process.env.FRONTEND_URL,
                date: getFormattedDate(lang).toString()
            },
        });
    }

    async sendVerificationEmail(userEmail: string, lang: any | Lang,url:string): Promise<any> {
        lang = this.getLang(lang)
        console.log("----------SENDING VERIFICATION MAIL----------- " + userEmail)
        return await this.mailerService.sendMail({
            to: userEmail,
            subject: this.getSubject(lang, 'account-verification'),
            template: this.getTemplatePath(lang, "account-verification"),
            context: {
                verificationUrl: url,
                date: getFormattedDate(lang).toString()
            },
        });
    }


    async sendPasswordRestEmail(userEmail: string, lang: any | Lang, url: string): Promise<any> {
        lang = this.getLang(lang)
        console.log("----------SENDING PASSWORD RESET MAIL----------- " + userEmail)
        return await this.mailerService.sendMail({
            to: userEmail,
            subject: this.getSubject(lang, 'password-recovery'),
            template: this.getTemplatePath(lang, "password-recovery"),
            context: {
                resetPasswordUrl: url,
                date: getFormattedDate(lang).toString()
            },
        });
    }

    async sendPasswordHasChangedEmail(userEmail: string, lang: any | Lang): Promise<any> {
        lang = this.getLang(lang)
        console.log("----------SENDING PASSWORD CHAGED MAIL----------- " + userEmail)
        return await this.mailerService.sendMail({
            to: userEmail,
            subject: this.getSubject(lang, 'password-changed'),
            template: this.getTemplatePath(lang, "password-changed"),
            context: {
                date: getFormattedDate(lang).toString()
            },
        });
    }

    private getLang(lang: any) {
        return [...Object.values(Lang)].includes(lang) ? lang : Lang.ENGLISH;
    }

    private getTemplatePath(lang: Lang, template: string): string {
        return lang + '/' + template
    }

    private getSubject(lang: Lang, template: string): string {
        const subjects: Record<string, Record<Lang, string>> = {
            'welcome': {
                [Lang.FRENCH]: 'Bienvenue',
                [Lang.ARABIC]: 'مرحبًا بك',
                [Lang.ENGLISH]: 'Welcome ',
            },
            'account-verification': {
                [Lang.FRENCH]: 'Vérifiez votre compte !',
                [Lang.ARABIC]: 'قم بالتحقق من حسابك ',
                [Lang.ENGLISH]: 'Verify Your  Account ',
            },
            'password-recovery': {
                [Lang.FRENCH]: 'Réinitialisez votre mot de passe ',
                [Lang.ARABIC]: 'إعادة تعيين كلمة المرور الخاصة بك ',
                [Lang.ENGLISH]: 'Reset Your Password ',
            },
            'password-changed': {
                [Lang.FRENCH]: 'Votre mot de passe a été modifié avec succès ',
                [Lang.ARABIC]: 'تم تغيير كلمة المرور الخاصة بك بنجاح ',
                [Lang.ENGLISH]: 'Your password has been successfully ',
            }
        };

        return subjects[template]?.[lang] || subjects[template]?.[Lang.ENGLISH];
    }

}
