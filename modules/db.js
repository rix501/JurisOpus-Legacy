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
       host : 'us-mm-auto-dca-01.cleardb.com',
       port : 3306,
       user : 'd1d1f8f3072dfd',
       password : '6aec7576',
       database : 'heroku_a0876ff6e29cdf1'
    });
}

module.exports = client;