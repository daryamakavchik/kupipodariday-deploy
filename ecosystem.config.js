require('dotenv').config({ path: __dirname + `/.env.deploy` });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } =
  process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'post-deploy': 'sudo git clone daryamakavchik/web-plus-docker-and-compose.git && docker-compose up -d',
    },
  },
};