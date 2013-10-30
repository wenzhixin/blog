## Nodejs 应用部署小记

分类：前端技术 | 标签：Nodejs、部署 | 发布时间：2012-11-09 00:05:00

___

### 1、日志功能

#### 1) 加入 access.log

    var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
    
    app.configure(function() {
        app.use(express.logger({stream: accessLogfile}));
    }

#### 2) 加入 error.log

首先，添加 helpers/error.js 文件：  

    var fs = require('fs');
    var errorLogfile = fs.createWriteStream('logs/error.log', {flags: 'a'});
    
    exports.handler = function(err, req, res, status) {
          console.log(err);
      
          var meta = '[' + new Date() + '] ' + req.url + ' ' + status + '\n';
          errorLogfile.write(meta + err.stack + '\n');
      
          res.status(status);
          res.end('');
    }

在 routes 中使用：

    function(req, res) {
          error.handler(err, req, res, 500);
    }

### 2、多进程启动服务器，使用 cluster 模块

    var cluster = require('cluster');
    var os = require('os');
    
    // 获取 CPU 的数量
    var numCPUs = os.cpus().length;
    
    var workers = {};
    if (cluster.isMaster) {
          // 主进程分支
          cluster.on('death', function(worker) {
            // 当一个工作进程结束时，重启工作进程
            delete workers[worker.pid];
            worker = cluster.fork();
            workers[worker.pid] = worker;
          });
          // 初始开启与 CPU 数量相同的工作进程
          for ( var i = 0; i < numCPUs; i++) {
            var worker = cluster.fork();
            workers[worker.pid] = worker;
          }
    } else {
          // 工作进程分支，启动服务器
          var app = require('./app');
          app.listen(app.get('port'), function() {
            console.log('Server listening on port %d in %s mode', app.get('port'), app.get('env'));
          });
    }
    
    // 当进程被终止时，关闭所有工作进程
    process.on('SIGTERM', function() {
          for ( var pid in workers) {
            process.kill(pid);
          }
          process.exit(0);
    });

### 3、启动脚本，可用于开机启动服务

    #! /bin/bash
    
    NODE_ENV=production
    DAEMON="node cluster.js"
    NAME=name
    PIDFILE="name.pid"
    
    case "$1" in
      start)
            echo "Starting $NAME."
            nohup $DAEMON >/dev/null 2>/dev/null &
            echo $! > $PIDFILE
            ;;
      stop)
            echo "Stopping $NAME."
            pid=`cat $PIDFILE`
            kill $pid
            rm $PIDFILE
            ;;
      status)
          ps -ef | grep nodejs
          ;;
        esac
    
        exit 0
