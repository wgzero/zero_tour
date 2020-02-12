var express = require('express');


var app = express();

// 中间件
app.use(express.static('./public'));

app.get('/', function (req,res){
    res.end('Express Get');
});
/******Router方式路由********/
var Router = express.Router();

Router.get('/add', function (req, res) {
    res.end('Router /add');
});

Router.get('/list', function (req, res) {
    res.end('Router /list');
});
// post为基础路径
// 适用于同一个路由下的多个子路由
app.use('/post', Router);

// 适合定义RESTful API
app.route('/article')
    .get(function (req, res) {
        res.end('route /articl get\n');
    })
    .post(function (req, res) {
        res.end('route /articl post');
    });

// http:127.0.0.1:18000/news/123
// 路由参数
/**
 * next:函数下一步要执行的参数
 * newsId：路由参数
 * */
app.param('newsId', function (req, res, next, newsId) {
    console.log('param newsid:'+newsId);
    req.newsId = newsId;
    next();
});

app.get('/news/:newsId', function (req, res) {
    console.log('/news/:newsId:');
    res.end('newsId:'+req.newsId+'\n');
});

app.listen(3001, '0.0.0.0', function afterListen() {
    console.log('Http runing ong http://127.0.0.1:3001');
});