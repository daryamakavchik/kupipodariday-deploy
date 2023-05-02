// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: __dirname + `/.env.deploy` });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH } = process.env;

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
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm install && npm run build',
    },
  },
};
