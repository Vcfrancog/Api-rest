const knex =  require("knex");
const db = knex({
    client: 'pg',
    connection:{
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV ==='production'? {rejectUnauthoraized: false}
        : undefined,
    },
    
});

module.exports= db;