webpackJsonp([0xb9637e42ee5c],{557:function(e,n){e.exports={data:{site:{siteMetadata:{title:"Step Over",subtitle:"有趣的灵魂终会相遇",copyright:"© All rights reserved.",author:{name:"周骅",rss:"#",email:"zhou--hua@163.com",github:"zhouhua-js"}}},markdownRemark:{id:"/work/playground/zhouhua.site/src/pages/articles/2014/canvassize.md absPath of file >>> MarkdownRemark",html:'<p>设置一个元素的尺寸，推荐的做法是通过css设置其 <code>width</code> 和 <code>height</code>。不过今天我们说说一个特例：<strong><code>canvas</code></strong>。本文内容比较简单，我不做示例。</p>\n<p>常见的设置</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>元素尺寸有两种方法。</p>\n<ol>\n<li>\n<p>给<pre class="inline:true decode:1 " >canvas</pre>元素设置属性，例如：</p>\n<pre class="lang:xhtml decode:true "><canvas width="400" height="400">\n</canvas></pre>\n</li>\n<li>\n<p>2. 给<pre class="inline:true decode:1 " >canvas</pre>对象设置属性，例如：</p>\n<pre class="lang:js decode:true">var canvas = document.getElementById(\'canvas\');\ncanvas.width = 400;\ncanvas.height = 400;</pre>\n</li>\n</ol>\n<p>不过如果你采用css来控制：</p>\n<pre class="lang:css decode:true">canvas{\n    width:400px;\n    height:400px;\n}</pre>\n<p>则会发现</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>画出的图形变形了。为什么会这样？原来不同于其他元素，你只能通过前两种方式设置</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>的尺寸，因为</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>是基于像素点渲染的，它的渲染可以说完全依赖于</p>\n<pre class="inline:true decode:1 " >imageData</pre>\n<p>，如果不通过</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>而直接改变</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>尺寸，那么</p>\n<pre class="inline:true decode:1 " >imageData</pre>\n<p>里的数据将完全无效。那么为什么用css设置宽高会发生变形呢？首先我们需要知道，通常一个未设置尺寸的</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>元素是有一个默认宽高的，为</p>\n<pre class="inline:true decode:1 " >300px &times;&nbsp;150px</pre>\n<p>，如果css中没有将宽高设置成</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>元素的宽高，那么这个它会在原有尺寸的基础上，拉伸到css中设置的尺寸。从这点上看，跟图片的宽高处理是一样的（只不过图片通过属性或css设置尺寸基本上效果是一样的）。</p>\n<p>当然，通过css设置</p>\n<pre class="inline:true decode:1 " >canvas</pre>\n<p>的尺寸也并不一定是无用的，有害的。比如在画椭圆的时候，是不是又多了一种简单的途径？</p>',excerpt:"设置一个元素的尺寸，推荐的做法是通过css设置其  width  和  height 。不过今天我们说说一个特例： canvas 。本文内容比较简单，我不做示例。 常见的设置 元素尺寸有两种方法。 给 canvas 元素设置属性，例如： 2 .  给 canvas…",fields:{tagSlugs:["/tags/canvas/","/tags/css/","/tags/html-5/","/tags/javascript/","/tags/椭圆/"]},frontmatter:{title:"canvas元素的宽高",tags:["canvas","CSS","html5","Javascript","椭圆"],date:"2014-12-23T22:56:06.000Z",description:null}}},pathContext:{slug:"/2014/canvassize/"}}}});
//# sourceMappingURL=path---2014-canvassize-6e1d03b75fb89dd5d2c4.js.map