---
title: "在 Bootstrap v4 中使用 Bootstrap Table 的 editable 插件"
date: 2019-10-06T07:43:40+08:00
categories: [BootstrapTable]
---

由于 x-editable 很久没有更新，所以[不支持 Bootstrap v4](https://github.com/wenzhixin/bootstrap-table/issues/3705)，但是很多人问要怎么在 Bootstrap Table 的 v4 中使用 editable 这个插件，这里对其进行尝试。

可以看到已经有人提交了 PR，增加了对 Bootstrap v4 的支持，这里我们直接使用 [https://github.com/Talv/x-editable/tree/develop](https://github.com/Talv/x-editable/tree/develop) 这个库。因为没有发布到 npm 上，所以我们只能直接使用 GitHub 上的链接，这里使用了 [jsdelivr](https://www.jsdelivr.com) 这个工具，我们需要的文件在这个目录 [bootstrap4-editable](https://cdn.jsdelivr.net/gh/Talv/x-editable@develop/dist/bootstrap4-editable/) 下。

需要引入的文件包括：

* bootstrap4-editable/css/bootstrap-editable.css
* bootstrap4-editable/js/bootstrap-editable.min.js
* extensions/editable/bootstrap-table-editable.min.js

```html
<link href="https://cdn.jsdelivr.net/gh/Talv/x-editable@develop/dist/bootstrap4-editable/css/bootstrap-editable.css" rel="stylesheet">
<link href="https://unpkg.com/bootstrap-table@1.15.4/dist/bootstrap-table.min.css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/gh/Talv/x-editable@develop/dist/bootstrap4-editable/js/bootstrap-editable.min.js"></script>
<script src="https://unpkg.com/bootstrap-table@1.15.4/dist/bootstrap-table.min.js"></script>
<script src="https://unpkg.com/bootstrap-table@1.15.4/dist/extensions/editable/bootstrap-table-editable.min.js"></script>

<table id="table"
  data-pagination="true"
  data-show-export="true"
  data-url="json/data1.json">
  <thead>
    <tr>
      <th data-field="id">ID</th>
      <th data-field="name" data-editable="true">Item Name</th>
      <th data-field="price" data-editable="true">Item Price</th>
    </tr>
  </thead>
</table>

<script>
  $(function() {
    $('#table').bootstrapTable()
  })
</script>
```

在线例子：https://live.bootstrap-table.com/code/wenzhixin/854

可以看到已经可以正常工作了。
