---
title: wordpress 插件开发
date: 2013-01-15
categories: [后台技术]
tags: [wordpress,插件]
---

#### 1. 创建插件

在目录 wp-content/plugins 下创建自己的插件

新建目录 plugin-demo

新建文件 plugin-demo.php

    <?php
    /*
    Plugin Name: Plugin Demo
    Description: 此插件用于插件演示
    Version: 1.0
    Author: zhixin wen
    Author URI: http://wenzhixin.net.cn
    */
    ?>

#### 2. 添加实现类和添加菜单

    class PluginDemo {

        //现实版本号
        function version() {
            return 1.0;
        }

        //添加菜单
        function addMenu() {
            add_submenu_page('edit.php', '插件演示', '演插件演示', 8, __FILE__, array('PluginDemo', 'settings'));
        }

        function settings() {
            echo file_get_contents(plugins_url('', __FILE__) . '/index.tpl');
        }
    }

    add_action('admin_menu', array('PluginDemo', 'addMenu'));

#### 3. 新建文件 index.tpl 用于显示插件界面

    <h2>插件演示</div>
    <div>演示内容</div>

#### 4. 添加 javascript 文件

    class PluginDemo {

        ...

        function addScripts() {
            self::addScript('jquery.js');
            self::addScript('index.js');
        }

        function addScript($script) {
            $file = plugins_url('', __FILE__) . '/js/' . $script;
            wp_register_script($script, $file);
            wp_enqueue_script($script);
        }
       }

    add_action('admin_print_scripts', array('PluginDemo', 'addScripts'));

#### 5. 使用 ajax 请求

新建 index.js

    $(function() {
        ...

        $.get(URI, function(data) {

        });

        $.post(URI, params, function(data) {

        });
    });

#### 6. 添加接口文件

新建 api.php

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            echo 'get data';
            break;
        case 'POST':
            $input = file_get_contents("php://input");
            break;
    }

#### 7. 启用插件

到插件管理界面，点击启用，搞定！
