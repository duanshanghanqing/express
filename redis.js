/*
var client = require('redis').createClient(6379,'127.0.0.1');

//监听错误
client.on('error', function (err) {
    console.log('Error ' + err);
});

//切换库
client.select(1,function(){//一下的操作都在1库里
    //设置键值
    client.set('name', 'zhangsan', function(err,result){
        console.log(arguments);

        //设置成功后，根据键读取值
        client.get('name', function(err,result){
            console.log(arguments);
            client.destroy();//用完销毁
        });
    });
});
*/

/*
连接池
*/
var pool   = require('generic-pool');//导入连接池
//console.log(pool);

var p      = pool.Pool({
    name:'redisPool',
    create:function(callback){
        var client = require('redis').createClient(6379,'127.0.0.1'); //这里是创建redis连接实例的代码
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
    client.select(1,function(){//一下的操作都在1库里
        //设置键值
        client.set('name', 'zhangsan', function(err,result){
            //console.log(arguments);

            //设置成功后，根据键读取值
            client.get('name', function(err,result){
                console.log(arguments);
            });
        });
    });
});
