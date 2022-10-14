module.exports = {
    app_port: 3001,
    cors_policy: 3000,
    db: {
        database: 'miniiimal',
        user: 'root',
        password: 'Ye7+ly2UOBIXK/PdE4UP3doPxUdp1diaLplsWo1dBMs=',
        options: {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3002,
        }
    },
    authentication: {
        jwtSecret: 'secret'
    }
}

// module.exports = {
//     app_port: process.env.APP_PORT,
//     cors_policy: process.env.CORS_POLICY,
//     db: {
//         database: process.env.MYSQL_DB,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         options: {
//             dialect: process.env.DIALECT,
//             host: process.env.DB_HOST,
//             port: process.env.DB_PORT,
//         }
//     },
//     authentication: {
//         jwtSecret: process.env.SECRET_KEY
//     }
// }
