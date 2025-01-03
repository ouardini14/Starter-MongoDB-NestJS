export enum ActionLogs {
    // Authentication
    USER_SIGNED_IN = 'User signed in',
    USER_SIGNED_OUT = 'User signed out',
    USER_REGISTERED = 'User registered',
    PASSWORD_CHANGED = 'Password changed',
    PASSWORD_RESET_REQUESTED = 'Password reset requested',
    PASSWORD_RESET_COMPLETED = 'Password reset completed',

    // User Management
    USER_PROFILE_UPDATED = 'User profile updated',
    USER_DELETED = 'User deleted',
    ROLE_UPDATED = 'Role updated',
    PERMISSIONS_UPDATED = 'Permissions updated',

    // Transactions
    TRANSACTION_CREATED = 'Transaction created',
    TRANSACTION_COMPLETED = 'Transaction completed',
    TRANSACTION_FAILED = 'Transaction failed',
    TRANSACTION_REFUNDED = 'Transaction refunded',

    DATA_EXPORTED = 'Data exported',
    SETTINGS_UPDATED = 'Settings updated',
}
