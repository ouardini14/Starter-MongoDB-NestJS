import { Lang } from "../enums/lang-enum";

export const SuccessMessageByLang = {
    CONNECTED_SUCCESS: {
        [Lang.ENGLISH]: 'Successfully connected!',
        [Lang.FRENCH]: 'Connecté avec succès!',
        [Lang.ARABIC]: 'تم الاتصال بنجاح!',
    },
    RESET_LINK_SENT: {
        [Lang.ENGLISH]: 'Reset link sent',
        [Lang.FRENCH]: 'Lien de réinitialisation envoyé',
        [Lang.ARABIC]: 'تم إرسال رابط إعادة التعيين',
    },
    PASSWORD_UPDATED: {
        [Lang.ENGLISH]: 'Password updated successfully!',
        [Lang.FRENCH]: 'Mot de passe mis à jour avec succès!',
        [Lang.ARABIC]: 'تم تحديث كلمة المرور بنجاح!',
    },
    VERIFICATION_EMAIL_SENT: {
        [Lang.ENGLISH]: 'Verification email sent!',
        [Lang.FRENCH]: 'Email de vérification envoyé!',
        [Lang.ARABIC]: 'تم إرسال البريد الإلكتروني للتحقق!',
    },
};
