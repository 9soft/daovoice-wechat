var Koa = require('koa');
var serve = require('koa-static');
var views = require('koa-views');
var proxy = require('koa-proxy');
var app = new Koa();

// app.use(proxy({
//   host: 'https://open.weixin.qq.com',
//   match: /^\/weichat-open\//        // ...just the /static folder
//   // map: function(path) { return 'weichat-open/' + path; },
// }));

app.use(proxy({
  host: 'https://api.weixin.qq.com',
  match: /^\/weichat-api\//        // ...just the /static folder
}));

app.use(serve('./static'));
app.use(views(__dirname + '/views', {
  map: {
    html: 'underscore',
  },
}));

app.use(function (ctx) {
  return ctx.render('index');
})

app.listen(3000);
