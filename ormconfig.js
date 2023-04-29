module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'nizar',
  password: '@Data20120',
  database: 'pfs',
  synchronize: true,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};
