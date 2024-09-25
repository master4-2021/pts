import { EnvironmentEnum } from 'src/common/types';

export default () => ({
  env: process.env.NODE_ENV || EnvironmentEnum.DEV,
  port: parseInt(process.env.PORT, 10) || 4000,
  host: process.env.HOST,
  database: {
    mssql: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      databaseName: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNC,
      dropSchema: process.env.DB_DROP_SCHEMA,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10),
  },
  encrypt: {
    secret: process.env.ENCRYPT_SECRET,
  },
  ldap: {
    host: process.env.LDAP_HOST,
    dn: process.env.LDAP_DN,
  },
});
