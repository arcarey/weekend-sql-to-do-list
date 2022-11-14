const pg = require('pg');
let pool;

if (process.env.DATABASE_URL){
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
});
}
else {
;
    pool = new pg.Pool({
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimoutMillis: 30000
    });
}





pool.on('connect', () => {
    console.log('Connected to database');
});

pool.on('error', (err) => {
    console.log('Error connecting to database:', err);
});

module.exports = pool;
