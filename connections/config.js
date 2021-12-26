import Pool from 'pg-pool';

const pool = new Pool(
    {
        user: 'alalinga',
        host: 'localhost',
        database: 'alalingada',
        password: 'muba$17912',
        port: 5432,
    }
)


export default pool;