console.log('Verifying enviornmental variables');

if (!process.env.SERVER_URL) {
    console.log('Missing environmental variable: "SERVER_URL"!');
    process.exit(1);
} else if (!process.env.SERVER_PORT) {
    console.log('Missing environmental variable: "SERVER_PORT"!');
    process.exit(1);
} else if (!process.env.DB_CONNECTION_STRING) {
    console.log('Missing environmental variable: "DB_CONNECTION_STRING"!');
    process.exit(1);
}