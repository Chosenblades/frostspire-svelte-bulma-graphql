import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import graphqlHTTP from 'express-graphql';
import uuidv4 from 'uuid/v4';
import helmet from 'helmet';
import {schema, root, connectToDatabase} from './graphql/schema';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

connectToDatabase();

express()
	.use('/graphql', graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true
	}))
	.use((req, res, next) => {
		res.locals.nonce = uuidv4();
		next();
	})
	.use(helmet({
		contentSecurityPolicy: {
			directives: {
				scriptSrc: [
					"'self'", "'unsafe-eval'",
					(req, res) => `'nonce-${res.locals.nonce}'`
				]
			}
		}
	}))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});