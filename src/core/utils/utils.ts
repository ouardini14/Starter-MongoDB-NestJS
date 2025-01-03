import { ErrorServiceResponse, SuccefulServiceResponse } from "http-response-utils";
import { ErrorMessage } from "../enums/errors.enums";
import { ERROR_MAPPINGS } from "../mappers/error.mapper";
import { Lang } from "../enums/lang-enum";
import { ErrorMessageByLang } from "../constants/errors-lang";
import { SuccessMessage } from "../enums/success.enums";
import { SuccessMessageByLang } from "../constants/success-lang";

export function checkErrors(params: { [key: string]: any }): string | null {
    for (const paramKey of Object.keys(params)) {
        const paramValue = params[paramKey];
        const mapping = ERROR_MAPPINGS.find(m => m.key === paramKey && m.condition(paramValue));
        if (mapping) {
            return mapping.response;
        }
    }
    return ""; 
}

export const getFormattedDate = (lang: Lang): string => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
        month: "short", 
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: true 
    };

    const locale = lang === Lang.FRENCH ? 'fr-FR' : lang === Lang.ARABIC ? 'ar-SA' : 'en-US';  
    const formattedDate = today.toLocaleString(locale, options);

    if (lang === Lang.ARABIC) {
        return formattedDate.replace(/[٠١٢٣٤٥٦٧٨٩]/g, match => String.fromCharCode(match.charCodeAt(0) - 1632)); // Convert to Western Arabic numerals
    }

    return formattedDate;
};


    
export function logErrorResponse(error: any, lang?: string | Lang){
        console.log("------- ERROR ------- ")
        console.log(error)
    return ErrorServiceResponseByLang(ErrorMessage.DEFAULT_ERROR, lang)
    }


export function ErrorServiceResponseByLang(message: string | ErrorMessage, lang?: string | Lang) {
    const isValidMessage = Object.values(ErrorMessage).includes(message as ErrorMessage);

    const isValidLang = Object.values(Lang).includes(lang as Lang);

    const errorKey = isValidMessage ? (message as ErrorMessage) : ErrorMessage.DEFAULT_ERROR;

    const language = isValidLang ? (lang as Lang) : Lang.ENGLISH;

    return ErrorServiceResponse(ErrorMessageByLang[errorKey]?.[language] || ErrorMessageByLang[ErrorMessage.DEFAULT_ERROR][Lang.ENGLISH])
}

export function SuccessfulServiceResponseByLang(message: string | SuccessMessage, lang?: string | Lang) {
    const isValidMessage = Object.values(SuccessMessage).includes(message as SuccessMessage);

    const isValidLang = Object.values(Lang).includes(lang as Lang);

    const language = isValidLang ? (lang as Lang) : Lang.ENGLISH;

    const msg = isValidMessage ? SuccessMessageByLang[message]?.[language]  : ""

    return SuccefulServiceResponse(msg)
}