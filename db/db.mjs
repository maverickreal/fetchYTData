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

export let run = q => {
    console.log('\n\nRunning: ' + q + '\n\n');
    connection.query(q, res => console.log(chalk.yellow('Result: ') + res));
};
