## 使用百度云接口

分类：前端技术 | 标签：百度云、树莓派、下载 | 发布时间：2013-10-24 00:00:00

___

树莓派 raspberry pi 已经买了好一段时间了，但是实际上却没怎么用到。
一开始买的时候就是打算重复利用宿舍网络资源的，但是却一直没有时间去做开发。
有些事情，不去开始，也许永远都不会有所成吧。
另外，即使开始了，假如不去坚持，那也是等于0。

先说说最终目标吧：因为申请了 2T 的百度云，打算重复利用资源，将数据保存到云中，
下载服务器变会自动开始同步数据到指定的目录中。

并且实时监听网络资源，没有人使用的使用便开启同步，有人使用便暂停。

其实也不知道最后会不会做出来，但是不去尝试也不会知道。
有所感悟，有所思。废话就不多说了。

#### 1. 创建百度开发者应用

1) 选择 Web 应用，创建并进入应用信息页面

![1](/posts/2013/10/24/1.png) 

2) 在应用信息页面左侧菜单栏中，找到“开放API > API管理 > API列表”，点击打开相应页面

3) 在“API服务列表”页面，点击“API服务”栏中“PCS API”项对应的“开启”键

4) 输入对应的文件目录设置项（例如我设置的是pcs_wen）并点击“确认”，即可完成PCS API权限开通

#### 2. 获取 Access Token

1) 在进行PCS API调用之前，需要先获取Access Token，在浏览器中输入下面地址：

	https://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id=apikey&redirect_uri=oob&scope=netdisk
	
注意：需要将 apikey 换为自己应用的 API Key

2) 输入后，弹出百度登录页面，登录后弹出以下授权页面，选择授权

3) 授权成功后会显示 OAuth2.0，此时我们复制 url 地址

	http://openapi.baidu.com/oauth/2.0/login_success#expires_in=2592000&access_token=3.811a254908d094012df764a38882a179.2592000.1348661720.2233553628-238347&session_secret=9deaa587f9cd177f02079506dc4391ab&session_key=94rrnl7qf2cYVnSZ0KfARwLS%2BIMuQn%2FbZKgbYBEnwDZv1O%2Bzp7fJxo8cN%2BrrhLAQsJy8FeBD2SP6Ioux%2B2TW6IgR8JFIGsU%3D&scope=basic+netdisk
	
这里的 access_token=3.811a254908d094012df764a38882a179.2592000.1348661720.2233553628-238347 就是我们想要的 Access Token 值了，保存起来。

#### 3. 开始使用 api 下载文件

1) 获取目录下的文件列表（对应百度盘中的 "我的应用数据  >  pcs_wen"）

	https://pcs.baidu.com/rest/2.0/pcs/file?method=list&access_token=access_token&path=/apps/pcs_wen/
	
注：这里的 access_token 为第2步获取的 access_token，path 为第一步设置的目录，格式为 /app/pcs_wen/

2) 下载目录下的文件

	https://d.pcs.baidu.com/rest/2.0/pcs/file?method=download&access_token=access_token&path=/apps/pcs_wen/test.jpg
	
注：这里的 path 为获取目录文件的 path


到这里，我们已经可以下载我们保存到百度盘的文件了！