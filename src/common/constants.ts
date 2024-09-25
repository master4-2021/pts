import { ErrorMessages } from './types';

export const SKIP_JWT_GUARD_KEY = 'isSkipJwtGuard';

export const CORRELATION_ID = 'x-correlation-id';
export const TIMESTAMPS = 'timestamps';

// API
export const API_CONTEXT = 'API';

export const errMessages: ErrorMessages = {
  // failedToCreateUser: {
  //   code: 'FAILED_TO_CREATE_USER',
  //   content: 'Failed to create user',
  // },
  // failedToSignJwt: {
  //   code: 'FAILED_TO_SIGN_JWT',
  //   content: 'Failed to sign jwt',
  // },
  // noErrMessageProvided: {
  //   code: 'NO_ERR_MESSAGE_PROVIDED',
  //   content: 'No error message provided',
  // },
  // invalidFilter: {
  //   code: 'INVALID_FILTER',
  //   content: 'Invalid filter',
  // },
  // invalidCredentials: {
  //   code: 'INVALID_CREDENTIALS',
  //   content: 'Invalid credentials',
  // },
  // invalidAccessToken: {
  //   code: 'INVALID_ACCESS_TOKEN',
  //   content: 'Invalid access token',
  // },
  // accessTokenExpired: {
  //   code: 'ACCESS_TOKEN_EXPIRED',
  //   content: 'Access token expired',
  // },
  // accessTokenIsMissing: {
  //   code: 'ACCESS_TOKEN_IS_MISSING',
  //   content: 'Access token is missing',
  // },
  // userNotFound: {
  //   code: 'USER_NOT_FOUND',
  //   content: 'User not found',
  // },
  // userNamePasswordMissing: {
  //   code: 'USERNAME_PASSWORD_MISSING',
  //   content: 'Username or password is missing',
  // },
  // functionError: {
  //   code: 'FUNCTION_ERROR',
  //   content: 'Function error',
  // },
  // startDateGreaterThanEndDate: {
  //   code: 'START_DATE_GREATER_THAN_END_DATE',
  //   content: 'Start date greater than end date',
  // },
  // entityNotFound: {
  //   code: 'ENTITY_NOT_FOUND',
  //   content: 'Entity not found',
  // },
  validationError: {
    code: 'VALIDATION_ERROR',
    content: '',
  },
  businessError: {
    code: 'BUSINESS_ERROR',
    content: 'Business requirement is not met',
  },
  serviceError: {
    code: 'SERVICE_ERROR',
    content: 'Error occurs in service',
  },
};
