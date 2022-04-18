import * as db from './db/db.mjs';
import * as proc from './process.mjs';
import chalk from 'chalk';
import 'dotenv/config';

console.log(chalk.blue('Initiating database services...'));
try {
    db.startDB();
    console.log(chalk.blue('Database services successfully started.'));
}
catch (err) {
    console.log(chalk.red('Error encountered: ' + err));
    console.log(chalk.yellow('Exiting!'));
    process.exit();
}
console.log(chalk.blue('Initiating background jobs...'));
try {
    process.stdin.on('data', data => {
        proc.startProcess(data);
        console.log(chalk.blue('Background jobs successfully started.'));
    });
    console.log('✅');
}
catch (err) {
    console.log(chalk.red('Error encountered: ' + err));
    console.log(chalk.yellow('Exiting!'));
    process.exit();
}