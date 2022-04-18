import sql from 'mysql2';
import chalk from 'chalk';

let connection;
export let startDB = () => {
    connection = sql.createConnection({
        host: 'localhost',
        user: 'youtubefetchapi',
        database: 'youtubefetchapidb',
        password: 'yfap'
    });
};

export let run = q => connection.query(q, res => {
    if (res)
        console.log(chalk.yellow('Result: ') + res);
})