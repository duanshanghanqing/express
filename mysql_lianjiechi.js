/*
 连接池
 */
var pool   = require('generic-pool');//导入连接池
//console.log(pool);

var p      = pool.Pool({
    name:'redisPool',
    create:function(callback){
        var client = require('mysql').createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'mysqldata'//连接哪个数据库
        }); //这里是创建mysql连接实例的代码
        callback(null,client);//创建完了以后，要把client传给callback，这里第一个参数看了源码得知是err，我们不必理会
    },
    destroy:function(client){
        client.quit();
    },
    min      : 1 ,              //最小连接
    max      : 10,              //最大连接数
    idleTimeoutMillis : 30000,  //超时时间
    log : false                  //日志
});
p.acquire(function(err,client){

    /*
    //查询
    var sql='SELECT  *  FROM  jdbc ';//select * from java1309
    client.query(sql,function(err,rows,fields){
        if(err){
            throw err;
        }else{
            //console.log(rows,fields);
            console.log(rows);//返回查询的结果
        }
    });
    */


    //插入
    var sql="INSERT INTO  jdbc(name,emall,birth) VALUES (?,?,?);";
    var data=["黄三","999999999@163.com","1999-09-09"];
    client.query(sql,data,function(err,rows,fields){
        if(err){
            throw err;
        }else{
            console.log(rows);//返回查询的结果
        }
    });

});
