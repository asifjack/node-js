const Pool = require('pg').Pool
try
{
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });

module.exports={
        query:async(text,params)=>
        {
             return await pool.query(text,params)
        }
    }
}
catch(error)
{
    console.log(error);
}