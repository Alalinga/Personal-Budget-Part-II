import Pool from 'pg-pool';


const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  //ssl: isProduction,
})

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