module.exports = {
  type: 'mysql',
  host: 'db4free.net',
  port: 3306,
  username: 'reda123',
  password: 'Reda12345',
  database: 'myredatestdb',
  synchronize: true,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};


