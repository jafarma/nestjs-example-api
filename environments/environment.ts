
export const environment = {
  production: false,

  LOG_LEVEL: 'debug',

  server: {
    host: '0.0.0.0',
    domainUrl: 'http://localhost:3000',
    port: 3000,
  },

  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'testdb',
    username: 'userdb',
    password: 'password',
    keepConnectionAlive: true,
    logging: true,
    synchronize: true,
  },

};