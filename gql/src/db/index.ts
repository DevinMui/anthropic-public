import { Sequelize } from 'sequelize-typescript';
import IngesterItem from './IngesterItem';
import IntegrationItem from './IntegrationItem';

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

const sequelize = new Sequelize({
  database: '<db>',
  username: '<username>',
  password: '<pass>',
  host: '<host>',
  port: 25060,
  dialect: 'postgres',
  dialectOptions: { ...dialectOptions },
});

sequelize.addModels([IntegrationItem, IngesterItem]);

export default sequelize;
