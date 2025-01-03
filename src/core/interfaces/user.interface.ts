export interface IUser {
    _id: string;
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    phone: string,
    functionRole: string,
    city: string,
    country: string,
    codePostal: string,
    address: string,
    status: string,
    closingDate: Date,
    activationDate: Date,
    securityQuestion: {
        question: string,
        answer: string
    }
    createdAt: Date
    updatedAt: Date
}
