## 彻底研究 CSS——文字与图像

分类：前端技术 | 标签：CSS、文字与图像 | 发布时间：2012-05-05 00:00:00

___

1、CSS 文字样式

 \*
font-family：用于设置字体。同时声明多种字体时，字体之间用逗号分隔开，字体名称有空格需要用双引号引起来。


 \* font-size：用于设置文字大小。常见单位：px，表示 1
个像素的大小；em，表示其父元素中字母 m 的标准宽度；ex，表示字母 x
的标准高度；%，使用百分比作为单位。


 \*
line-height：用于设置各行文字的高度。不加单位，表示行高与字体大小的比值。


 \* color：用于设置文字的颜色。


 \* background-color：用于设置背景的颜色。


 \* font-weight：用于设置文字是否为粗体。有 normal（正常） 和 bold（粗体）
两种样式。


 \* font-style：用来控制字体倾斜。有 normal（正常）、 oblique（意大利体）和
italic（倾斜）三种样式。

 

 \* text-transform：用于转换英文字母的大小写。有
capitalize（首字母大写）、uppercase（全部大写）和
lowercase（全部小写）三种样式。


 \* text-decoration：设置文字装饰效果。有
underline（下划线）、overline（顶划线）、line-through（删除线） 和
blink（闪烁）四种样式。可以同时设置多个效果，用空格分开。


 \* text-align：控制段落的水平对齐方式。有
left（局左）、center（居中）、right（局右）和 justify（两端对齐）四种样式。


 \* text-indent：设置段首缩进。多用于对中文段落，缩进两个空格：p
{text-indent: 2em;}。


ps：

 \* 可以将三个字体属性组合到一条 CSS 中，语法为：font:
font-size/line-height font-family;


 \* 颜色用 RGB 格式，包括：英文名称、\#rrggbb（\#rgb）、rgb(rr, gg, bb) 和
rgb(rr%, gg%, bb%)


2、CSS 图像样式

 \* background-image：给元素设置背景颜色。语法为：background-image:
url(image.png);


 \* background-repeat：设置背景图片平铺方式。有
repeat（水平和垂直方向平铺）、no-repeat（不平铺）、repeat-x（水平方向平铺）和
repeat-y（垂直方向平铺）四种样式，默认为 repeat。


 \*
background-position：设置图片位置，并作为起点。取值包括：left、right、top、bottom
和 center。该属性多用于 Sprite 技术。


ps：

 \*
同时设置背景图像和背景颜色时，背景图像覆盖的地方显示图像，没有覆盖的地方显示背景颜色。可以根据这个特点制作出非常自然的渐变色背景：将背景颜色设置为背景图像中最下面一排像素的颜色。


 \* 背景样式简写：可以将 background-image、background-repeat 和
background-color 简写为一行样式，即 background: color image repeat;
中间用空格分开。
