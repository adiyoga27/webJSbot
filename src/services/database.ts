import mysql from "mysql"

export const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'cod37784_project_wabot'
})


connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


export const getClientData = function(){
    return new Promise(function(resolve, reject){
      connection.query(
          "SELECT * FROM client", 
          function(err, rows){                                                
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                  resolve(rows);
              }
          }
      )}
  )}