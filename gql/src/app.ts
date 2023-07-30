import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers, typeDefs } from './api';
import cors from 'cors';
import express from 'express';

import sequelize from './db';

import IngesterItem from './db/IngesterItem';
import IntegrationItem from './db/IntegrationItem';

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;

app.get('/test', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('connection established');
    res.send('connection established');
  } catch (e) {
    console.log(e);
    res.send('connection failed:' + e);
  }
});

const server = new ApolloServer({ typeDefs, resolvers });
async function run() {
  await server.start();
  app.use('/graphql', cors(), express.json(), expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(`🚀  Server ready at: ${PORT}`);
  });

  try {
    await sequelize.authenticate();
    console.log('connection established');

        await IntegrationItem.sync({
            alter: true,
            // force: true
        });
        await IngesterItem.sync({
            alter: true,
            // force: true
        });
        console.log('tables synced');
    } catch (e) {
        console.log(e);
    }
}
run();
