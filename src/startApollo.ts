import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { AppDataSource } from '../src/dataSource/data-source';
import { CountryResolver } from './resolvers/CountryResolver';

const port = 4000;

// -------------------------- DATASOURCE

async function startServerApollo() {
  await AppDataSource.initialize()
    .then(() => console.log('Database initialized successfully'))
    .catch(error => {
      console.error('Error during Data Source initialization:', error);
      process.exit(1);
    });

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🚀🚀 Server ready at ${url}`);
}

startServerApollo();
