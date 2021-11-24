const crsDbParams = {
    host: 'localhost',      // replace with CRS DB host
    user: 'postgres',       // replace with CRS DB user
    password: '1234',       // replace with CRS DB password
    dbName: 'caller_sys'    // replace with CRS DB name
};

const scoringDbParams = {
    host: 'localhost',      // replace with Scoring DB host
    user: 'postgres',       // replace with Scoring DB user
    password: '1234',       // replace with Scoring DB password
    dbName: 'scoring'    // replace with Scoring DB name
};

const crsClient = require('./db_client_pool').pool(crsDbParams);
const scoringClient = require('./db_client_pool').pool(scoringDbParams);

const run = async () => {
    const { rows } = await crsClient.query('SELECT id, description FROM customers');
    console.log(`fetched ${rows.length} row/s from the DB`);
    for(let row of rows) {
        console.log(`updating description for customer ${row.id}`);
        const { rowCount } = await scoringClient.query('UPDATE scoring_customer SET description = $1 WHERE crs_id = $2', [row.description, row.id]);
       
        if(rowCount > 0) {
            console.log(`updated customer id ${row.id}, description value - ${row.description}`);
        }
    };
    return Promise.resolve('migration done');
};

run().then(resp => {
        console.log(resp);
        process.exit(0);
    })
    .catch(err => console.error(err));