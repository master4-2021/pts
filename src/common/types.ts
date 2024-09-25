export enum EnvironmentEnum {
  DEV = 'dev',
  PROD = 'prod',
}

export enum ErrorMessageEnum {
  // invalidFilter = 'invalidFilter',
  // invalidCredentials = 'invalidCredentials',
  // invalidAccessToken = 'invalidAccessToken',
  // accessTokenIsMissing = 'accessTokenIsMissing',
  // accessTokenExpired = 'accessTokenExpired',
  // userNotFound = 'userNotFound',
  // userNamePasswordMissing = 'userNamePasswordMissing',
  // functionError = 'functionError',
  // startDateGreaterThanEndDate = 'startDateGreaterThanEndDate',
  // entityNotFound = 'entityNotFound',
  // noErrMessageProvided = 'noErrMessageProvided',
  validationError = 'validationError',
  // failedToSignJwt = 'failedToSignJwt',
  // failedToCreateUser = 'failedToCreateUser',
  serviceError = 'serviceError',
  businessError = 'businessError',
}

export type Message = {
  code: string;
  content: string | Record<string, string[]>;
};

export type ErrorMessages = Record<ErrorMessageEnum, Message>;

export type DeepHideOrOmit<T, K extends keyof any, D extends boolean> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ? Array<DeepHideOrOmit<U, K, D>>
    : T[P] extends Date
      ? P extends K
        ? D extends true
          ? never
          : '*****'
        : T[P]
      : T[P] extends Record<string, any>
        ? DeepHideOrOmit<T[P], K, D>
        : P extends K
          ? D extends true
            ? never
            : '*****'
          : T[P];
};

export type ResponseBody = {
  statusCode: number;
  message: string;
  url: string;
  success: boolean;
  timestamp: string;
  correlationId?: string;
  data?: any;
  took: string;
};
