var mysql = require('mysql');

var client = {};

if(process.env.NODE_ENV == 'development'){
   //Use dev
   client = mysql.createClient({
       host : 'localhost',
       port : 3306,
       user : 'root',
       password : '',
       database : 'JurisOpus'
    });
}
else if(process.env.NODE_ENV == 'production'){
    client = mysql.createClient({   
       host : 'localhost',
       port : 3306,
       user : 'root',
       password : '',
       database : 'JurisOpus'
    });
}
else {
    client = mysql.createClient({   
       host : 'localhost',
       port : 3306,
       user : 'root',
       password : '',
       database : 'JurisOpus'
    });
}

module.exports = client;