import Pool from 'pg-pool';
import url from 'url'


const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const params = url.parse(connectionString);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl:{ rejectUnauthorized: false}
};


const pool = new Pool(config)


/*{
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: config,
}
*/





// const pool = new Pool(
//     {
//         user: process.env.USER_NAME,
//         host: process.env.HOST_NAME,
//         database: process.env.DATABASE_NAME,
//         password: process.env.PASSWORD,
//         port: 5432,
//     }
// );


export default pool;