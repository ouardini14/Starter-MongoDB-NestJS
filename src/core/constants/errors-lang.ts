import { Lang } from "../enums/lang-enum";

export const ErrorMessageByLang = {
    DEFAULT_ERROR: {
        [Lang.ENGLISH]: 'An error occurred',
        [Lang.FRENCH]: 'Une erreur est survenue',
        [Lang.ARABIC]: 'حدث خطأ',
    },
    EXISTING_EMAIL: {
        [Lang.ENGLISH]: 'A user with this email address already exists',
        [Lang.FRENCH]: 'Utilisateur avec cette adresse e-mail existe déjà',
        [Lang.ARABIC]: 'يوجد مستخدم بالفعل بعنوان البريد الإلكتروني هذا',
    },
    USER_NOT_FOUND: {
        [Lang.ENGLISH]: 'User does not exist',
        [Lang.FRENCH]: "Utilisateur n'existe pas",
        [Lang.ARABIC]: 'المستخدم غير موجود',
    },
    EMAIL_NOT_FOUND: {
        [Lang.ENGLISH]: 'Email does not exist',
        [Lang.FRENCH]: "Email n'existe pas",
        [Lang.ARABIC]: 'البريد الإلكتروني غير موجود',
    },
    PASSWORD_INCORRECT: {
        [Lang.ENGLISH]: 'The password is incorrect',
        [Lang.FRENCH]: 'Le mot de passe est incorrect',
        [Lang.ARABIC]: 'كلمة المرور غير صحيحة',
    },

    ACCOUNT_IS_ALREADY_VERIFIED: {
        [Lang.ENGLISH]: 'The account is already verified',
        [Lang.FRENCH]: "Le compte est déjà vérifié",
        [Lang.ARABIC]: 'الحساب مفعل بالفعل',
    },
    ACCOUNT_SUSPENDED: {
        [Lang.ENGLISH]: 'The account is suspended',
        [Lang.FRENCH]: 'Le compte est suspendu',
        [Lang.ARABIC]: 'تم تعليق الحساب',
    },
};
