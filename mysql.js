var mysql=require('mysql');
//console.log(mysql);
//连接成功返回一个对象
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'mysqldata',//连接哪个数据库
    port: 3306
});
connection.connect();//连接数据库
var sql='SELECT  *  FROM  tutorials ';//select * from java1309

connection.query(sql,function(err,rows,fields){
    if(err){
        throw err;
    }else{
        //console.log(rows,fields);
        console.log(rows);//返回查询的结果
        for(var i=0 ; i<rows.length;i++){
            console.log(rows[i].myname);
        }
    }
});