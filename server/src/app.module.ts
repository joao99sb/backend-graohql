import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

import { OngsModule } from './modules/ongs/ong.module';
import OngResolver from './modules/ongs/resolvers/ong.resolver';
import * as ormOptions from './config/orm';

const graphQLImports = [OngResolver];
const repoModules = [OngsModule];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),

    ...repoModules,

    ...graphQLImports,

    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}