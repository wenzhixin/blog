---
title: react-memory：基于 nodejs + bower + react 的文字记忆游戏
date: 2015-06-07 13:30:00
categories: [前端技术]
tags: [React]
---

### 前言

现在最热门的前端框架，毫无疑问是 [React](https://facebook.github.io/react/)，React 是由 Facebook 出品的 JavaScript 框架，由于该框架比较新，比较少中文的资料。这几天看了很多篇关于 react 的英文文章，不得不说 React 是创建大型、快速的 Web 应用的最好方式。在本文中，我们将通过一步一步的创建一个简单的文字记忆游戏，来体验 React 的思想和强大之处。

**PS：** 由于对 React 的学习也是皮毛，但是在这里，我希望这个小游戏能够成为学习 React 的最佳开发结构，并且随着自己的不断学习，将会继续改进和完善这里的代码。假如您有任何的建议和反馈，请给我留言，谢谢！

在开始之前我们先来看看我们的 [demo](http://demos.wenzhixin.net.cn/react-memory)，游戏非常简单，输入想要记忆的文字，然后点击开始记忆即可。试玩了我们的游戏之后，那么现在就开始吧。

先来看看我们的目录结构，你可以在 GitHub 上找到相对应的[源码](https://github.com/wenzhixin/react-memory)：

```
├── bower_components
│   ├── bootstrap
│   └── jquery
├── node_modules
│   ├── browserify
│   ├── lodash
│   ├── react
│   ├── reactify
│   └── watchify
├── docs
│   ├── component.dot
│   └── component.png
├── build
│   └── app.js
├── css
│   └── style.css
├── index.html
├── js
│   ├── app.js
│   ├── board.js
│   ├── game.js
│   ├── status.js
│   ├── tile.js
│   └── word-form.js
├── bower.json
├── package.json
└── README.md
```

* bower_components 和 bower.json 是安装 bower 组件的目录和配置信息。
* node_modules 和 package.json 是安装 npm 模块的目录和配置信息。
* docs 用于存放我们的文档信息。
* css 和 js 用于存放样式和 JavaScript 源码。
* build 用于存放最后编译的 css 和 js 文件。
* index.html 是我们游戏的主页面，也就是 React 的入口。

### 初始化

* 首先，创建 npm 模块的配置文件 package.json

```sh
{
    "name": "react-memory",
    "version": "1.0.0",
    "description": "基于 nodejs + bower + react 的文字记忆游戏。",
    "browserify": {
        "transform": [
            ["reactify"]
        ]
    },
    "author": "wenzhixin <wenzhixin2010@gmail.com> (http://wenzhixin.net.cn/)",
    "license": "MIT"
}
```

* 接着，创建 bower 组件的配置文件 bower.json

```sh
{
    "name": "react-memory",
    "version": "1.0.0",
    "authors": [
        "zhixin <wenzhixin2010@gmail.com>"
    ],
    "license": "MIT",
    "ignore": [
        "**/.*",
        "node_modules",
        "bower_components",
        "test",
        "tests"
    ]
}
```

* 安装所需要的依赖包

```sh
# 运行游戏时需要的依赖包
npm install --save react lodash
bower install --save bootstrap

# 编译游戏时需要的依赖包
npm install --save-dev browserify watchify reactify

# 全局命令行工具
npm install -g browserify watchify http-server
```

可以看到，我们安装了运行游戏时所需要的依赖包：react，[lodash](https://github.com/lodash/lodash/) 模块，以及 [bootstrap](https://github.com/twbs/bootstrap) 组件，lodash 是一个非常实用的工具库，游戏中我们使用到了好多它所提供的操作 array 的简单方法，react 和 bootstrap 的话就不用说了。

### React 组件依赖层次

![](https://github.com/wenzhixin/react-memory/raw/master/docs/component.png)

React 中都是以组件的方式来体现的，从上往下，我们切割成非常小、功能单一的组件，分别是：
* Game：游戏组件
* WordForm：文字输入组价
* Board：游戏面板组件
* Status：游戏状态组价
* Tile：单个卡片组件

### 组件模板

由于我们使用了 nodejs 的开发方式以及 React 独有的 JSX 语法，我们组件的模板为：

```js
var React = require('react'), // 加载 react 模块
    _ = require('lodash'), // 加载 lodash 模块
    OtherComponent = require('./other-component'); // 加载其他自定义 React 模块

var Component = React.createClass({
    // 定义组件所需要的 properties 属性
    propTypes: {
        prop1: React.PropTypes.string.isRequired,
        func1: React.PropTypes.func.isRequired
    },
    // 初始化组件的状态，并非所有组件都需要 state
    getInitialState: function () {
        return {};
    },
    // 渲染我们的界面
    render: function () {
        return (
            <OtherComponent prop1={this.props.prop1} func1={{this.props.func1}} />
        );
    }
});

module.exports = Component;
```

对于各行代码的意思，已加了详细的注释说明，在下面的 js 代码中，也是一样在代码中做了详细注释，由于我们只关注组件的核心部分，与模板相同的地方，我们就不做解释了。

### Game

创建文件：`js/game.js`

```js
var React = require('react'),
    _ = require('lodash'),
    Board = require('./board'),
    WordForm = require('./word-form');

var Game = React.createClass({
    // 初始化 state，这里我们使用了 words 数组，用于保存输入的文字
    getInitialState: function () {
        return {words: undefined};
    },
    // 开始游戏
    startGame: function (words) {
        this.setState({
            // 组合并打乱输入的文字
            words: _.shuffle(words.concat(words))
        });
    },
    // 结束游戏，设置 words 为 undefined
    endGame: function () {
        this.setState({words: undefined});
    },
    // 根据 words 来显示我们自定义的组件
    render: function () {
        return (
            this.state.words ?
                <Board onEndGame={this.endGame} words={this.state.words}/> :
                <WordForm onWordsEntered={this.startGame} />
        );
    }
});

module.exports = Game;
```

### WordForm

* 新建文件：`js/word-form.js`

```js
var React = require('react'),
    _ = require('lodash');

var WordForm = React.createClass({
    // 需要提供 onWordsEntered 方法，用于触发提交方法，在 Game 中我们使用了 startGame
    propTypes: {
        onWordsEntered: React.PropTypes.func.isRequired
    },
    // 初始化 error 状态
    getInitialState: function () {
        return {error: undefined};
    },
    // 显示错误信息，2s 后自动消失
    setError: function (msg) {
        this.setState({error: msg});
        setTimeout(function () {
            this.setState({error: ''});
        }.bind(this), 2000);
    },
    // 提交文字信息，判断是否符合条件
    submitWords: function (e) {
        e.preventDefault();

        var node = this.refs.words.getDOMNode(),
            // unique 用于生成唯一的字符
            words = _.unique((node.value || '').trim().split(''));

        if (words.length < 3) {
            this.setError('请至少输入三个不同的字符！');
        } else {
            this.props.onWordsEntered(words);
            node.value = '';
        }
    },
    render: function () {
        return (
            <form className='form-inline' onSubmit={this.submitWords}>
                <span>请输入你想记忆的字符：</span>
                <input className='form-control' type='text' ref='words' maxLength='10'
                    defaultValue='文字记忆游戏' />
                <button className='btn btn-default' type='submit'>开始记忆</button>
                <p className='error'>{this.state.error}</p>
            </form>
        );
    }
});

module.exports = WordForm;
```

* 由于用用到了 bootstrap 的样式和自定义了 error 样式，需要创建 `css/style.css` 文件

```css
@import "../bower_components/bootstrap/dist/css/bootstrap.min.css";

.error {
    color: red;
}
```

### Boar
新建文件：`js/board.js`

```js
var React = require('react'),
    _ = require('lodash'),
    Tile = require('./tile'),
    Status = require('./status');

var Board = React.createClass({
    // 需要提供 words 属性，以及 onEndGame 方法，分别对应 Game 的属性和方法
    propTypes: {
        words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        onEndGame: React.PropTypes.func.isRequired
    },
    // 在组件还未 mount 之前用于计算总共有多少对文字卡片
    componentWillMount: function () {
        this.max = this.props.words.length / 2;
    },
    // State 状态
    // found：表示找到了多少对文字卡片
    // message：显示当前的状态
    // tileStates
    getInitialState: function () {
        return {
            found: 0,
            message: 'chooseTile',
            tileStates: new Array(this.props.words.length + 1).join('unturned ').trim().split(' ')
        };
    },
    // 游戏逻辑的处理方法
    clickedTile: function (index) {
        // 当卡片的状态为 unturned（未翻转）时，才进行处理
        if (this.state.tileStates[index] === 'unturned') {
            // flippedTile 用于保存上个点击的卡片的 index
            if (this.flippedTile === undefined) {
                this.flippedTile = index;
                // 设置状态为 findMate
                this.setState({
                    message: 'findMate',
                    // 使用 lodash 方法，将对应的下标置为 revealed（翻转）状态
                    tileStates: _.extend(this.state.tileStates, _.object([index], ['revealed']))
                });
            } else {
                var otherIndex = this.flippedTile,
                    matched = this.props.words[index] === this.props.words[this.flippedTile];

                if (matched) {
                    // 找到相对应的卡片，found + 1，并将状态置为 foundMate
                    this.setState({
                        found: this.state.found + 1,
                        message: 'foundMate',
                        // 使用 lodash 方法，将对应的下标置为 correct（正确）状态
                        tileStates: _.extend(this.state.tileStates,
                            _.object([index, otherIndex], ['correct', 'correct']))
                    });
                } else {
                    // 没有找到相对应的卡片，将状态置为 wrong
                    this.setState({
                        message: 'wrong',
                        // 使用 lodash 方法，将对应的下标置为 wrong（错误）状态
                        tileStates: _.extend(this.state.tileStates,
                            _.object([index, otherIndex], ['wrong', 'wrong']))
                    });
                }
                // 删除保存的信息
                delete this.flippedTile;

                // 1.5s 后我们将卡片翻转回来
                setTimeout(function () {
                    // 需要判断组件是否 mounted
                    if (this.isMounted()) {
                        // 假如所有都选中了，将状态置为 foundAll
                        this.setState({
                            message: this.state.message === 'findMate' ? 'findMate' :
                                this.max === this.state.found ? 'foundAll' : 'chooseTile',
                            tileStates: matched ? this.state.tileStates : _.extend(this.state.tileStates,
                                _.object([index, otherIndex], ['unturned', 'unturned']))
                        });
                    }
                }.bind(this), 1500);
            }
        }
    },
    render: function () {
        // 使用 map 方式，将所有的卡片显示出来
        var tiles = this.props.words.map(function (word, i) {
            return (
                <div key={i} onClick={_.partial(this.clickedTile, i)}>
                    <Tile word={word} status={this.state.tileStates[i]} />
                </div>
            );
        }.bind(this));
        return (
            <div>
                <button className='btn btn-default' onClick={this.props.onEndGame}>结束记忆</button>
                <Status found={this.state.found} max={this.max} message={this.state.message} />
                {tiles}
            </div>
        );
    }
});

module.exports = Board;
```

### Status

新建文件`status.js`

```js
var React = require('react');

var Status = React.createClass({
    propTypes: {
        found: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        message: React.PropTypes.oneOf([
            'chooseTile', 'findMate', 'wrong', 'foundMate', 'foundAll'
        ]).isRequired
    },
    render: function () {
        var found = this.props.found,
            max = this.props.max,
            texts = {
                chooseTile: '选择一张卡片！',
                findMate: '现在我们来查找相对应的卡片！',
                wrong: '很遗憾，这两张卡片不匹配！',
                foundMate: '不错，他们是一对的！',
                foundAll: '恭喜过关，你已经找到所有' + max + '对卡片了！'
            };
        return (
            <p>({found}/{max})&nbsp;&nbsp;{texts[this.props.message]}</p>
        );
    }
});

module.exports = Status;
```

### Tile

* 新建文件`tile.js`

```js
var React = require('react');

var Tile = React.createClass({
    propTypes: {
        status: React.PropTypes.string.isRequired,
        word: React.PropTypes.string.isRequired
    },
    render: function () {
        return (
            <div className={'brick ' + this.props.status}>
                <div className='front'><i className='glyphicon glyphicon-question-sign'></i></div>
                <div className='back'>{this.props.word}</div>
            </div>
        );
    }
});

module.exports = Tile;
```

* 修改文件`css/style.css`，增加卡片需要的样式

```css
@-webkit-keyframes wronganim {
    to {
        background-color: red;
    }
}

@-moz-keyframes wronganim {
    to {
        background-color: red;
    }
}

@keyframes wronganim {
    to {
        background-color: red;
    }
}

@-webkit-keyframes correctanim {
    to {
        background-color: green;
        color: white;
    }
}

@-moz-keyframes correctanim {
    to {
        background-color: green;
        color: white;
    }
}

@keyframes correctanim {
    to {
        background-color: green;
        color: white;
    }
}

.brick > div {
    width: 80px;
    height: 80px;
    border: 1px solid black;
    text-align: center;
    line-height: 80px;
    font-size: 24px;
    -webkit-backface-visibility: hidden;
    -webkit-transition: -webkit-transform 0.3s linear;
    -moz-transition: -moz-transform 0.3s linear;
    transition: transform 0.3s linear;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    position: absolute;
    overflow: hidden;
    border-radius: 5px;
    backface-visibility: hidden;
}

.brick > .front {
    background-color: #AAA;
}

.brick, .brick div {
    user-select: none;
    cursor: pointer;
}

.brick {
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 80px;
    height: 80px;
}

.brick > .back {
    -webkit-animation-duration: 0.5s;
    -webkit-animation-timing-function: ease;
    -webkit-animation-delay: 0.3s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-duration: 0.5s;
    -moz-animation-timing-function: ease;
    -moz-animation-delay: 0.3s;
    -moz-animation-iteration-count: 1;
    -moz-animation-fill-mode: forwards;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-delay: 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

.brick.wrong > .back {
    -webkit-animation-name: wronganim;
    -moz-animation-name: wronganim;
    animation-name: wronganim;
}

.brick.correct > .back {
    -webkit-animation-name: correctanim;
    -moz-animation-name: correctanim;
    animation-name: correctanim;
}

.brick > .back {
    -webkit-transform: perspective(80px) rotateY(180deg) translate3d(0px, 0px, 2px);
    -moz-transform: perspective(80px) rotateY(180deg) translate3d(0px, 0px, 2px);
    transform: perspective(80px) rotateY(180deg) translate3d(0px, 0px, 2px);
}

.brick.correct > .front, .brick.wrong > .front, .brick.revealed > .front {
    -webkit-transform: perspective(80px) rotateY(-180deg) translate3d(0px, 0px, 2px);
    -moz-transform: perspective(80px) rotateY(-180deg) translate3d(0px, 0px, 2px);
    transform: perspective(80px) rotateY(-180deg) translate3d(0px, 0px, 2px);
}

.brick.correct > .back, .brick.wrong > .back, .brick.revealed > .back {
    -webkit-transform: perspective(80px) rotateY(0deg) translate3d(0px, 0px, 1px);
    -moz-transform: perspective(80px) rotateY(0deg) translate3d(0px, 0px, 1px);
    transform: perspective(80px) rotateY(0deg) translate3d(0px, 0px, 1px);
}

.front {
    font-size: 2em;
}
```

### app.js

创建好了我们所有的组件之后，我们需要将组件组合起来，创建文件`app.js`

```js
var React = require('react'),
    Game = require('./game');

React.render(
    <Game />,
    document.getElementById('app')
);
```

### index.html

新建文件：`index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>记忆游戏</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <span class="navbar-brand">记忆游戏</span>
        </div>
    </div>
</nav>
<div id="app" class="container">正在努力加载中……</div>
<script src="build/app.js"></script>
</body>
</html>
```

### 查看结果

* 开始编译监听 jsx 文件为 js

```sh
watchify -v -o build/app.js js/app.js
```

* 启用 http server

```sh
http-server -p 8888
```

* 查看界面 http://localhost:8888/

* 大功告成，开始开心的游戏吧！
