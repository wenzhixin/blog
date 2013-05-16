## 制作在线聊天室

分类：JavaScript | 标签：nodejs | 发布时间：2013-04-02 20:41:00

___

### 先上效果图：

* 登录

![](/posts/2013/04/02/1.png)

* 聊天

![](/posts/2013/04/02/2.png)


### 主要接口：

* join：用户加入聊天室

* users: 发送用户列表

* message: 发送聊天信息


### server 端主要代码：

    sockets.on('connection', function(socket) {
        var that = {};
        socket.on('join', function(user) {
            that = {
                user: user,
                socket: socket
            }
            socketList.push(that);
            sendUsers();
            sendMessage('系统信息', that.user + ' 加入聊天室！');
        });
        socket.on('message', function(message) {
            sendMessage(that.user, message);
        });
        socket.on('disconnect', function () {
            var index = socketList.indexOf(that);
            if (index !== -1) {
                socketList.splice(index, 1);
                sendUsers();
                sendMessage('系统信息', that.user + ' 离开聊天室！');
            }
        });
    });
    
    function sendUsers() {
        var users = [];
        socketList.forEach(function(socket) {
            users.push(socket.user);
        });
        socketList.forEach(function(socket) {
            socket.socket.emit('users', users);
        });
    }
    
    function sendMessage(user, info) {
        socketList.forEach(function(socket) {
            socket.socket.emit('message', {
                user: user,
                info: info
            });
        });
    }

* connection 的时候，将 socket 和 user 存到变量 socketList 中

* disconnect 的时候，将 socket 从 socketList 中移除


### html 主要代码：

    <div class="container">
      <div class="login form-horizontal">
        <span>请输入你的姓名：</span>
        <input type="text" id="username" required="required" />
        <button id="startChat" class="btn">开始聊天</button>
      </div>
      <div class="main none">
        <ul id="users" class="nav nav-list span3"></ul>
        <div class="span8">
          <div id="room"></div>
          <div class="tr form-horizontal mt20">
            <input id="message" type="text" class="input-xxlarge" required="required" />
            <button id="sendMessage" class="btn btn-primary ml10">发送</button>
          </div>
        </div>
      </div>
    </div>
    
* 首先显示 login 输入用户的姓名

* 点击开始聊天后，显示聊天室界面
    

### js 主要代码：

    var socket = io.connect(location.origin);
    
    socket.on('users', function(list) {
        var html = [];
        $.each(list, function(i, user) {
            html.push('<li>' + user + '</li>');
        });
        $('#users').html(html.join(''));
    });
    socket.on('message', function (data) {
        var $room = $('#room'),
            div = '<div>' + data.user + ' : ' + data.info + '</div>';
        if ($room[0].scrollTop + $room.height() >= $room[0].scrollHeight) {
            $room.append(div);
            $room.scrollTop($room[0].scrollHeight - $room.height());
        } else {
            $room.append(div);
        }
      });
      
    function startChat() {
          var $username = $('#username'),
            username = $.trim($username.val());
          if (username === '') {
              $username.focus();
              return;
          }
          $('.login').hide();
          $('.main').show();
          socket.emit('join', username);
    }
    
    function sendMessage() {
          var $message = $('#message'),
            message = $.trim($message.val());
          if (message === '') {
              $message.focus();
              return;
          }
          $message.val('');
          socket.emit('message', message);
    }
    
___

[源码下载](https://github.com/wenzhixin/chat)