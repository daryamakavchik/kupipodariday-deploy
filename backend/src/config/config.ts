// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: __dirname + `../.env` });

import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    type: 'postgres',
    url: process.env.POSTGRES_HOST || 'database',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    database: process.env.POSTGRES_DB || 'kupipodariday',
    entities: [User, Wish, Wishlist, Offer],
    synchronize: true,
  },
  jwtSecret: process.env.JWT_SECRET || 'some-super-secret-key',
});
