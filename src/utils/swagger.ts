import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Note Service API',
      version: '1.0.0',
      description: 'API documentation for the Note Service',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    sequrity: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocs(app: Express) {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (_, res) => {
    res.json(swaggerSpec);
  });
}
