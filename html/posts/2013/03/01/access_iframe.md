## jQuery 如何获取 iframe 的内容

分类：前端技术 | 标签：iframe | 发布时间：2013-03-01 09:38:00

___

现有 iframe，内容如下：
    
    <iframe id="iframeID" ...>
        <div id="someID">Hello world!</div>
    </iframe>


使用 jQuery 获取 div 的内容：
    
    $('#iframeID').contents().find('#someID').html();