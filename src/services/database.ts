import mysql from "mysql"

// export const connection = require('knex')({
//     client: 'mysql',
//     connection: {
//       host : '103.30.244.158',
//       user : 'cod37784_admin',
//       password : 'XAMthone1234',
//       database : 'cod37784_project_wabot'
//     },
//     pool: { min: 0, max: 7 }
//   });

export const connection = mysql.createPool({
    connectionLimit: 10,
    host: '103.30.244.158',
    user: 'cod37784_admin',
    password: 'XAMthone1234',
    database: 'cod37784_project_wabot'
})


// connection.connect(function (err: any) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + connection.threadId);
// });


export const getClientData = function () {
    return new Promise(function (resolve, reject) {
        connection.query(
            "SELECT * FROM clients",
            function (err: any, rows: any) {
                if (rows === undefined) {
                    reject(new Error("Error rows is undefined"));
                } else {
                    resolve(rows);
                }
            }
        )
    }
    )
}

export const getClientActive = function (client_id: any, api_key: any) {
    return new Promise(function (resolve, reject) {
        connection.query(
            "SELECT * FROM clients WHERE is_active = 1 and clientID = " + client_id + " and api_key = " + api_key,
            function (err: any, rows: any) {
                if (rows != undefined) {
                    return true
                }
                return false
            }
        )
    }
    )
}

export const allowedClientIDSending = function (client_id: any, api_key: any) {
    return new Promise(function (resolve, reject) {
        return connection.query(
            "SELECT * FROM clients WHERE is_active = 1 and clientID = " + client_id + " and api_key = '" + api_key + "'",
            function (err: any, rows: any) {
                if(err){
                    resolve(false)
                }
                if (rows != undefined && rows.length > 0) {
                    resolve(true)
                }
                resolve(false)
            }
        )
    })
}
