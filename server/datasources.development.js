const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
  db: {
    name: 'db',
    connector: 'memory'
  },
  psql: {
    host: DB_HOST,
    port: 5432,
    database: DB_DATABASE,
    username: DB_USER,
    password: DB_PASSWORD,
    name: 'psql',
    connector: 'postgresql',
    debug: true
  },
  storage: {
    name: 'storage',
    connector: 'loopback-component-storage',
    provider: 'filesystem',
    root: './server',
    maxFileSize: '52428800'
  },
  emailDs: {
    name: 'emailDs',
    connector: 'mail',
    transports: [{
      type: 'smtp',
      host: 'smtp.mailgun.org',
      secure: true,
      port: 465,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD
      }
    }]
  }
};
