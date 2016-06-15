/*
 * 学习路由
 * */
//导入express
var express = require('express');
//创建路由对象
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('11111');
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由  http://localhost:3000
router.get('/', function(req, res) {
    console.log('22222');
    res.send('Birds home page');
});
// 定义 about 页面的路由  http://localhost:3000/about
router.get('/about', function(req, res) {
    res.send('About birds');
});
//导出路由
module.exports = router;