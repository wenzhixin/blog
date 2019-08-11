---
title: "在 Bootstrap Table Formatter 中使用 Vue 组件"
date: 2019-08-10T20:32:40+08:00
categories: [BootstrapTable]
---

从 v1.15.2 开始，Bootstrap Table 增加了 Bootstrap Table Vue 组件的支持。

我们可以这样使用 `formatter` 和 `events` 这两个列属性来实现对列的自定义显示和事件监听：

```html
<template>
  <BootstrapTable
    :columns="columns"
    :data="data"
    :options="options"
  />
</template>

<script>
import BootstrapTable from 'bootstrap-table/dist/bootstrap-table-vue.esm.js'

export default {
  components: {
    BootstrapTable
  },
  data () {
    return {
      columns: [
        {
          title: 'Item ID',
          field: 'id'
        },
        {
          field: 'name',
          title: 'Item Name'
        },
        {
          field: 'price',
          title: 'Item Price'
        },
        {
          field: 'actions',
          title: 'Actions',
          formatter: () => {
            return '<button class="btn btn-secondary">Click</button>'
          },
          events: {
            'click .btn': (e, value, row) => {
              this.clickRow(row)
            }
          }
        }
      ],
      data: [
        {
          id: 1,
          name: 'Item 1',
          price: '$1'
        }
      ],
      options: {
        search: true,
        showColumns: true
      }
    }
  },
  methods: {
    clickRow (row) {
      alert(JSON.stringify(row))
    }
  }
}
</script>
```

这里有一个在线例子：https://live.bootstrap-table.com/code/wenzhixin/440

可以看到，当我们点击按钮的时候调用了 `clickRow` 方法，不过我们这里使用的是 `jQuery` 的事件绑定方法。

使用 `vue` 的话，你可能会想我是否可以使用 `vue` 的事件进行绑定呢？

如：

```js
formatter: (value, row) => {
  return '<button class="btn btn-secondary" @click="clickRow(row)">Click</button>'
}
```

答案是不行，因为这里并不会处理 `vue` 的事件。

另外我们可能会用到 `vue` 的 UI 组件，例如 [BootstrapVue
](https://bootstrap-vue.js.org/)，那么你可能会想，这里的 `formatter` 可否使用 `vue` 组件呢？

如：

```js
formatter: (value, row) => {
  return '<b-button @click="clickRow(row)">Click</b-button>'
}
```

当然，这样也是不支持的。那应该怎么办呢？

针对这两个问题，我进行了深入了研究和试验。幸运的是，找到了可行的方案。

技术原理主要是先将 `vue` 组件保存到一个自定义变量中，然后返回一个只包含 `class` 的简单 `div`，在表格渲染完成之后我们再对其进行转换渲染为对应的 `vue` 组件。

我们增加了一个方法：

```js
vueFormatter (obj) {
  const key = `_vue_formatter_${this.vueFormatters.length}`
  this.vueFormatters.push({
    el: `.${key}`,
    name: key,
    ...obj
  })
  return `<div class="${key}"/>`
}
```

可以看到我们使用 `vueFormatters` 这个变量用于保存所有列的 `vue` 组件信息。

我们知道表格渲染完成的事件为 `onPostBody`，我们对其进行监听并对保存的 `vue` 组件信息进行渲染：

```js
vueFormatterPostBody () {
  if (!this.vueFormatters.length) {
    return
  }

  for (let i = this.vueFormatters.length - 1; i >= 0; i--) {
    const formatter = this.vueFormatters[i]

    if (document.getElementsByClassName(formatter.name)) {
      new Vue(formatter)
      this.vueFormatters.splice(i, 1)
    }
  }
}
```

考虑到会经常复用到，我们创建一个 `mixins/table.js` 文件：

```js
import Vue from 'vue/dist/vue.esm.js'

export default {
  data () {
    return {
      vueFormatters: []
    }
  },

  methods: {
    vueFormatter (obj) {
      const key = `_vue_formatter_${this.vueFormatters.length}`
      this.vueFormatters.push({
        el: `.${key}`,
        name: key,
        ...obj
      })
      return `<div class="${key}"/>`
    },

    vueFormatterPostBody () {
      if (!this.vueFormatters.length) {
        return
      }

      for (let i = this.vueFormatters.length - 1; i >= 0; i--) {
        const formatter = this.vueFormatters[i]

        if (document.getElementsByClassName(formatter.name)) {
          new Vue(formatter)
          this.vueFormatters.splice(i, 1)
        }
      }
    }
  }
}
```

如何使用：

```js
formatter: (value, row) => {
  return this.vueFormatter({
    template: '<b-button @click="clickRow(row)">Click</b-button>',
    data: { row },
    methods: {
      clickRow: this.clickRow
    }
  })
}
```

```html
<BootstrapTable
  ref="table"
  :columns="columns"
  :data="data"
  :options="options"
  @onPostBody="vueFormatterPostBody"
/>
```

在线例子：https://live.bootstrap-table.com/code/wenzhixin/441

**需要注意的是：**

由于 `new Vue({ template })` 需要 `full` 版本，假如在 webpack 中使用的话，需要修改所有的 `vue` 的导入：

```js
import Vue from 'vue/dist/vue.esm.js'
```

源码：https://github.com/wenzhixin/bootstrap-table-examples/tree/develop/vue-starter

最后，希望这篇文章可以帮到你。
