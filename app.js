/*
 一。安装
 安装express
 指定安装的文件目录     安装命令
 D:\site\node>       npm install express
 安装ejs模板引擎
 D:\site\node>       npm install ejs
 */
var express = require('express');
var app = express();

//使用默认jade模板
/*
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');
 */

/*
 //使用ejs模板
 app.set('views', path.join(__dirname, 'views'));//设置模板引擎
 app.set('view engine', 'ejs');//设置模板存放路径
 */

//渲染html模
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);
//参数1：指定模板的后缀。参数2.调用什么方法渲染模板。参数3.使用express这个框架
*/


/*
 * 二.学习路由
 *   1).路由方法***********************************************************************
 */
//创建get请求的路由
// 对网站首页的访问返回 "Hello World!" 字样
/*app.get('/', function (req, res) {
 res.send('Hello World!');
 });*/

// 网站首页接受 POST 请求
/*app.post('/', function (req, res) {
 res.send('Got a POST request');
 });*/

// /user 节点接受 PUT 请求
/*app.put('/user', function (req, res) {
 res.send('Got a PUT request at /user');
 });*/

// /user 节点接受 DELETE 请求
/*app.delete('/user', function (req, res) {
 res.send('Got a DELETE request at /user');
 });*/
//app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。
//在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。
/*app.all('/secret', function (req, res, next) {
 //res.writeHead(200, {"Content-Type": "text/html","charset":"UTF-8"});
 //res.write("不管使用Hello World");//向客户端输出
 //res.end();
 res.send('不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。');
 console.log('Accessing the secret section ...');
 next(); // pass control to the next handler
 });*/
//2).路由路径*****************************************************************************
//路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。
//2.1]使用字符串的路由路径示例：
// 匹配根路径的请求
/*app.get('/', function (req, res) {
 res.send('root');
 });*/

// 匹配 /about 路径的请求
/*app.get('/about', function (req, res) {
 res.send('about');
 });*/

// 匹配 /random.text 路径的请求
/*app.get('/random.text', function (req, res) {
 res.send('random.text');
 });*/
//2.2]使用字符串模式的路由路径示例：
// 匹配 acd 和 abcd。http://localhost:3000/acd 或 http://localhost:3000/abcd
/*app.get('/ab?cd', function(req, res) {
 res.send('ab?cd');
 });*/

// 匹配 abcd、abbcd、abbbcd等http://localhost:3000/abcd  http://localhost:3000/abbcd
// http://localhost:3000/abbbcd
/*app.get('/ab+cd', function(req, res) {
 res.send('ab+cd');
 });*/

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等 http://localhost:3000/abcd  http://localhost:3000/abxcd
//http://localhost:3000/abRABDOMcd   http://localhost:3000/ab123cd
/*app.get('/ab*cd', function(req, res) {
 res.send('ab*cd');
 });*/

// 匹配 /abe 和 /abcde  http://localhost:3000/abe   http://localhost:3000/abcde
/*app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
 });*/
//ps: 字符 ?、+、* 和 () 是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。
//2.3]使用正则表达式的路由路径示例：
// 匹配任何路径中含有 a 的路径：http://localhost:3000/abcde
/*app.get(/a/, function(req, res) {
 res.send('/a/');
 });*/

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
//匹配以fly结束的路径
//http://localhost:3000/butterfly   http://localhost:3000/dragonfly
/*app.get(/.*fly$/, function(req, res) {
 res.send('/.*fly$/');
 });*/
//3.路由句柄************************************************************************************
//可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。
//3.1路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示.
//http://localhost:3000/example/a
/*app.get('/example/a', function (req, res) {
 res.send('Hello from A!');
 });*/
//3.2使用多个回调函数处理路由（记得指定 next 对象）：
//http://localhost:3000/example/b
/*
app.get('/example/b', function (req, res, next) {
 console.log('response will be sent by the next function ...');
 next();
 }, function (req, res) {
 res.send('Hello from B!');
});
 */
//3.3使用回调函数数组处理路由：
//http://localhost:3000/example/c
/*var cb0 = function (req, res, next) {
 console.log('CB0');
 next();
 }

 var cb1 = function (req, res, next) {
 console.log('CB1');
 next();
 }

 var cb2 = function (req, res) {
 console.log('CB2');
 res.send('Hello from C!');
 }
 app.get('/example/c', [cb0, cb1, cb2]);*/

//3.4混合使用函数和函数数组处理路由：
//http://localhost:3000/example/d
//就是把  多个回调函数处理  和 回调函数数组处理和在一起使用
/*
 var cb0 = function (req, res, next) {
 console.log('CB0');
 next();
 }

 var cb1 = function (req, res, next) {
 console.log('CB1');
 next();
 }

 app.get('/example/d', [cb0, cb1], function (req, res, next) {
 console.log('response will be sent by the next function ...');
 next();
 }, function (req, res) {
 res.send('Hello from D!');
 });*/

//4.响应方法***********************************************************************************
//app.get('/', function(req, res) {
//4.1下表中响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。
//res.download('node.rar');
//res.download('/node.rar', 'node.rar');
/*res.download('/node.rar', 'node.rar', function(err){
 if (err) {
 // Handle error, but keep in mind the response may be partially-sent
 // so check res.headersSent
 } else {
 // decrement a download credit, etc.
 }
 });*/
//res.send('download');

//4.2结束响应
//res.end("结束响应");
//res.status(404).end();//"返回404状态,并结束响应"

//4.3发送一个 JSON 格式的响应。
//res.json(null)//字符串null
//res.json({ user: 'tobi' })//{ user: 'tobi' }
//res.status(500).json({ error: 'message' })//状态500和{"error":"message"}json对象

//4.4发送一个支持 JSONP 的 JSON 格式的响应。
//res.jsonp(null)
//res.jsonp({ user: 'tobi' })
//res.status(500).jsonp({ error: 'message' })//{ "error": "message" }

//4.5从定性请求
//res.redirect('/example/a');//跳转另外一个路由
//res.redirect('http://www.hao123.com/');//在服务器上跨域跳转页面
//res.redirect(301, 'http://www.hao123.com/');//返回状态码。在服务器上跨域跳转页面
//res.redirect('../login');

//4.5渲染视图模板。
//安装npm install ejs
// 向客户发送渲染视图，接收两个参数。
//res.render('index',{name:'zhangshan'});
// 向客户发送渲染视图，接收三个参数。
//res.render('index',{name:'zhangshan'}, function(err, html) {
//console.log(html);
//res.send(html);
//});

//4.5发送各种类型的响应
//身体参数可以是缓冲对象、字符串、对象或数组。例如：
//res.send(new Buffer('whoop'));//向客户端传一个二进制文件。客户端会自动下载下来
//res.send({ some: 'json' });//向客户端传json字符串
//res.send([1,2,3]);//向客户端传数组
//res.send('<p>some html</p>');//向客户端传html
//res.status(404).send('Sorry, we cannot find that!');//传不同状态
//res.status(500).send({ error: 'something blew up' });

//把html字符串转换成二进制缓冲对象，传送到前台。设置返回的类型为html文本
//res.set('Content-Type', 'text/html');
//res.send(new Buffer('<p>some html</p>'));

//4.7设置响应状态代码，并将其以字符串形式作为响应体的一部分发送
//res.sendStatus(200); // equivalent to res.status(200).send('OK')
//res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
//res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
//res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
//res.sendStatus(2000); // equivalent to res.status(2000).send('2000')

//res.set('Content-Type', 'text/html');
//res.send('<p>some html</p>');

/*res.set({
 'Content-Type': 'text/plain',
 'Content-Length': '123',
 'ETag': '12345'
 })*/

//res.status(403).end();
//res.status(400).send('Bad Request');//返回文本
//res.status(404).sendFile(__dirname+'/public/still03.jpg');//返回图片 http://localhost:3000/
//返回文本的数据类型
/*
 res.type('.html');              // => 'text/html'
 res.type('html');               // => 'text/html'
 res.type('json');               // => 'application/json'
 res.type('application/json');   // => 'application/json'
 res.type('png');                // => image/png:
 */

//});
//4.6访问服务器端存放的文件   http://localhost:3000/file/8760353118360064.mp3
/*
app.get('/file/:name', function (req, res, next) {
    var fileName = req.params.name;//获取路径传来的文件名
    console.log(fileName);
    //res.send(fileName);
    var options = {
        root: __dirname + '/public/',//设置要读取的地址
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    //向客户端传送文件
    res.sendFile(fileName, options, function (err) {
        if (err) {//出错
            console.log(err);
            res.status(err.status).end();
        }
        else {//成功
            console.log('Sent:', fileName);
        }
    });
})
*/

//5.app.route()链式路由。一个路由3种请求
/*
 app.route('/book')
 .get(function(req, res) {
 res.send('Get a random book');
 })
 .post(function(req, res) {
 res.send('Add a book');
 })
 .put(function(req, res) {
 res.send('Update the book');
 });
 */


//6.express.Router可使用 express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。
//下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。
//在 app 目录下创建名为 birds.js 的文件，内容如下：
/*
var birds = require('./birds');//在主文件导入封装的路由
app.use('/', birds);//使用路由以当前域名为根路径   http://localhost:3000
*/

/*
 三.访问静态文件
 */
//1）静态文件。把静态的文件放在public文件中。使用中间件将静态文件映射出去http://localhost:3000/app.html
//app.use(express.static('public'));
//2）如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：
/*
 app.use(express.static('public'));
 app.use(express.static('files'));
 */
//3）给静态文件虚拟一个路径出来，访问时要加上static。http://localhost:3000/static/app.html
//app.use('/static', express.static('public'));

/*
四。使用cookie
*/
/*
//使用cookie
var cookieParser = require('cookie-parser');
var app = express();
//使用cookie需要放在中间件中
app.use(cookieParser());
app.get('/', function (req, res) {
    if (req.cookies.isVisit) {// 如果请求中的 cookie 存在 isVisit, 则输出 cookie
        console.log(req.cookies);
        res.send("再次欢迎访问");
    } else { // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
        res.cookie('isVisit', 1, {maxAge: 60 * 1000});
        res.send("欢迎第一次访问");
    }
});
*/

/*
 四。使用session
 跟cookie一样都需要单独的安装和引用模块， 安装模块：npm install express-session 主要的方法就是 session(options)，其中 options 中包含可选参数，主要有：
 name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
 store: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
 secret: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
 cookie: 设置存放 session id 的 cookie 的相关选项，默认为 (default: { path: '/', httpOnly: true, secure: false, maxAge: null })
 genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
 rolling: 每个请求都重新设置一个 cookie，默认为 false。
 resave: 即使 session 没有被修改，也保存 session 值，默认为 true。
 */
var session = require('express-session');
app.use(session({
    secret: 'hubwiz app', //secret的值建议使用随机字符串.通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));
app.get('/', function (req, res) {
    console.log(req.session.sign);//在session域里存储一个属性sign，用来记录回话状态。初始值为undefined
    if (req.session.sign) {//undefined = false
        console.log(req.session);//打印session的值
        res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');//读取保存的相关相关信息
    } else {
        //修改状态
        req.session.sign = true;
        req.session.name = '汇智网';//保存相关信息
        res.send('欢迎登陆！');
    }
});

//指定端口号
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
//对象键值对的设置
/*
 app.set('title', 'My Site');//设置键
 console.log(app.get('title'));//读取键
 */
//布尔值的设置
/*
 app.enable('trust proxy');//设置为true 的变量
 console.log(app.get('trust proxy'));//读取变量
 app.disable('trust proxy');//设置为false的变量
 console.log(app.get('trust proxy'));//读取false
 */
