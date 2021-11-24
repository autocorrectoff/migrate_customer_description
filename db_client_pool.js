const { Pool } = require('pg');

module.exports = {
    pool: (connectionParams) => {
        if(!connectionParams.host || !connectionParams.user || !connectionParams.password || !connectionParams.dbName) {
            throw Error('host, user, password and dbName are required');
        }
        return new Pool({
            host: connectionParams.host,
            user: connectionParams.user,
            password: connectionParams.password,
            database: connectionParams.dbName,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
          });
    }
};