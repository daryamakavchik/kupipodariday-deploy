// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: __dirname + `/.env.deploy` });

const { POSTGRES_USERNAME, POSTGRES_HOST, POSTGRES_PGDATA } = process.env;

module.exports = {
  apps: [
    {
      name: 'app',
      script: '/dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: POSTGRES_USERNAME,
      host: POSTGRES_HOST,
      'pre-deploy-local': `scp ./.env ${POSTGRES_USERNAME}@${POSTGRES_HOST}:${POSTGRES_PGDATA}`,
      'post-deploy': 'cd backend && npm install && npm run build',
    },
  },
};
