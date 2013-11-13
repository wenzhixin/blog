## PhoneGap Plugin 之 Hello World

分类：移动开发 | 标签：PhoneGap、WebApp | 发布时间：2012-08-01 00:00:00

___

#### 1、编写Java类并继承Plugin：

	public class MyPlugin extends Plugin {
	
		@SuppressWarnings("deprecation")
		@Override
		public PluginResult execute(String action, JSONArray args, String callbackId) {
	        PluginResult result = new PluginResult(Status.INVALID_ACTION);
	
	        if (action.equals("hello")) {
	                try {
	                        Toast.makeText(cordova.getContext(), "Hello World!", Toast.LENGTH_SHORT).show();
	                        result = new PluginResult(Status.OK, "Hello World!");
	                }
	                catch (NameNotFoundException nnfe) {
	                        result = new PluginResult(Status.ERROR, nnfe.getMessage());
	                }
	        }
	        return result;
		}
	
	}


#### 2、配置 res/xml/config.xml 文件：

	<plugin name="MyPlugin" value="com.wenyi.hello.MyPlugin"/>


#### 3、新建 plugin.js 文件：

	window.myplugin = {
        hello: function(callback) {        
                cordova.exec(callback, function(err) {        
                        callback(err);
                }, "MyPlugin", "hello", []);
        }
	};

API: cordova.exec(success, error, service, action, args);

#### 4、使用：

	myplugin.hello(function(data) {
        console.log(data); //Hello World!
	});


 
                                            