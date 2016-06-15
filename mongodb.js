/*
 var db = require('mongoskin').db('localhost:27017/mydb');

 db.collection('mamals').find().toArray(function(err, result) {
 if (err) throw err;
 console.log(result);
 });*/
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/mydb",function(err,db){//db指的就是当前连接的数据库
    //person在这张表上插入数据。数据库没有这张表，会自动创建这张表
    /*db.collection("person").save({name:'zhangshan',age:18},function(err,result){
     console.log(result.name);
     db.close();
     });*/
    //查询数据库中
    db.collection("person").findOne({},function(err,result){
        console.log(result);
    });
});