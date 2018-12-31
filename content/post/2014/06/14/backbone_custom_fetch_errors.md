---
title: 在 Backbone.js 中自定义 fetch 错误处理
date: 2014-06-14 23:55:00
categories: [前端技术]
tags: [Backbone,fetch,错误]
---

Backbone 作为 JavaScript MVC 框架的一个优势是它可以通过监听事件来处理事情。但是根据 Collection 的相关[文档](http://backbonejs.org/#Collection)，可以看到：当你使用```fetch```方法来进行 Ajax 请求的时候，假如发生了错误，并没有触发任何事件。虽然，可以通过```collection.fetch({error: handleError});```的方法来处理错误，但是假如我们的 Collection 一多，那就不太好办了，很难做到统一处理错误，并且每个地方都要加上对错误的处理。

查看 fetch 的源码：
```
fetch: function(options) {
  options = options ? _.clone(options) : {};
  if (options.parse === void 0) options.parse = true;
  var success = options.success;
  var collection = this;
  options.success = function(resp) {
    var method = options.reset ? 'reset' : 'set';
    collection[method](resp, options);
    if (success) success(collection, resp, options);
    collection.trigger('sync', collection, resp, options);
  };
  wrapError(this, options);
  return this.sync('read', this, options);
}
```

我们可以通过修改这一方法，从而达到自定义错误处理的效果，代码如下：

```
var appView = new AppView(),
    fetch = Backbone.Collection.prototype.fetch;

Backbone.Collection.prototype.fetch = function(options) {
    var self = this,
        opts = {
            error: function(collection, res) {
                self.trigger('fetch.error');　// trigger custom event
                if (options && options.error) {
                    options.error(arguments);
                    return;
                }
                if (res.status === 401) {
                    appView.showLogin();
                } else {
                    appView.showError(res.status);
                }
            }
        };

    // Combine options and custom handlers, apply to fetch prototype.
    (_.bind(fetch, this, _.extend({}, options, opts)))();
};
```

可以看到我们重写了```Backbone.Collection.prototype.fetch```方法，并自定义了```fetch.error```事件，方便进行监听处理。最重要的是我们不用修改之前的任何代码，在这里对错误进行了统一的处理，当```status code```为 401 时，我们跳转到登录页面，其他则显示错误信息。