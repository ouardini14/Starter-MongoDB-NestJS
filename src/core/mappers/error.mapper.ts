import { ErrorMessage } from "../enums/errors.enums";
import { UserStatus } from "../enums/user.statuses.enum";

type ErrorCondition = (value: any) => boolean;

interface ErrorMapping {
  key: string;
  condition: ErrorCondition;
  response: ErrorMessage;
}

export const ERROR_MAPPINGS: ErrorMapping[] = [
  {
    key: "existingUser",
    condition: (value) => value !== null,
    response: ErrorMessage.EXISTING_EMAIL
  },
  {
    key: "accountIsSuspended",
    condition: (value) => value && value.status == UserStatus.SUSPENDED,
    response: ErrorMessage.ACCOUNT_SUSPENDED
  },

  {
    key: "accountIsVerified",
    condition: (value) => value && value.isVerified,
    response: ErrorMessage.ACCOUNT_IS_ALREADY_VERIFIED
  },
  {
    key: "userNotFound",
    condition: (value) => !value,
    response: ErrorMessage.USER_NOT_FOUND
  },
  {
    key: "emailNotFound",
    condition: (value) => value === null,
    response: ErrorMessage.EMAIL_NOT_FOUND
  }
];
