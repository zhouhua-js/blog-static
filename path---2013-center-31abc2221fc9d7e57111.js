webpackJsonp([0xb8df9f39fe9],{553:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Step Over",subtitle:"有趣的灵魂终会相遇",copyright:"© All rights reserved.",author:{name:"周骅",rss:"#",email:"zhou--hua@163.com",github:"zhouhua-js"}}},markdownRemark:{id:"/work/playground/zhouhua.site/src/pages/articles/2013/center.md absPath of file >>> MarkdownRemark",html:'<p>网页中元素居中的需求很普遍，今天就要谈谈相对比较简单，使用场合更多的水平居中。</p>\n<h2>行级元素居中</h2>\n<hr>\n<p>我们知道css中有一个text-align的属性来定义子元素的水平对齐，不过它仅对行级元素生效。一种思路就是我们将想要居中的元素规定成inline或inline-block元素。</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token selector">.parent</span><span class="token punctuation">{</span>\n    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n    <span class="token property">width</span><span class="token punctuation">:</span>100%<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token selector">.child</span><span class="token punctuation">{</span>\n    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>\n    <span class="token property">width</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>我要居中<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<div class="parent" style="text-align: center"><div class="child" style="display: inline-block;">我要居中</div></div>\n<p>注意，inline-block在低版本IE和firefox中支持不佳，为了兼容低版本IE，我们需要给所有的inline-block元素加上一段hack：</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code>  <span class="token selector">.inline-block</span><span class="token punctuation">{</span>\n    <span class="token property">display</span><span class="token punctuation">:</span> -moz-inline-stack<span class="token punctuation">;</span>\n    <span class="token property">display</span><span class="token punctuation">:</span>inline-block<span class="token punctuation">;</span>\n    *<span class="token property">zoom</span><span class="token punctuation">:</span>1<span class="token punctuation">;</span>\n    <span class="token property">_zoom</span><span class="token punctuation">:</span>1<span class="token punctuation">;</span>\n    *<span class="token property">display</span><span class="token punctuation">:</span>inline<span class="token punctuation">;</span>\n    <span class="token property">_display</span><span class="token punctuation">:</span>inline<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>margin自适应居中</h2>\n<hr>\n<p>inline-block是一把双刃剑，虽然常常可以解决一些布局的难题，但兼容性问题很大。一方面建议开发者把上面我给出的hack代码放在css一个class中，如果在页面中要用到inline-block，则给这个元素加上这个class。不过不想用inline-block的话，还是有别的方法的，比如很多前端朋友都会用到的margin自适应居中。这是我见过最简单的方法，只需要给子元素设置左右margin为auto即可。原理很简单，当一个块级元素的左右margin为auto时，浏览器根据父元素和子元素的宽度计算出一个使其居中的左右margin。</p>\n<div class="gatsby-highlight">\n      <pre class="language-css css"><code>.parent{\n    width:100%;\n}\n.child{\n    margin: 0 auto;\n    width: 100px;\n}</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-html html"><code><div class="parent">\n    <div class="child">我要居中</div>\n</div></code></pre>\n      </div>\n<div class="parent" style="width: 100%;"><div class="child" style="margin: 0 auto; width: 100px;">我要居中</div></div>\n<p>注意，这个方法虽然很简单，但由于行级元素对margin不敏感，因而此方法仅能用于块元素，即<code>inline</code>，<code>inline-block</code>，甚至<code>inline-table</code>的元素无法用此方法实现水平居中。</p>\n<h2>绝对定位</h2>\n<hr>\n<p>绝对定位也许是处理布局问题最有效的手段，但往往给人一种“暴力”的感觉。简单粗暴但高效的方法在编程时永远是最有价值的。那么绝对定位是如何做到水平居中的呢？我们知道，要对一个元素进行绝对定位，我们常常会规定它相对于relative元素的top、left、right、bottom中的一个或几个。很容易地，我们能想出，要让它能居中，我们可以设定 <span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>l</mi><mi>e</mi><mi>f</mi><mi>t</mi><mo>=</mo><mo>(</mo><mi>W</mi><mo>−</mo><mi>w</mi><mo>)</mo><mi mathvariant="normal">/</mi><mn>2</mn><mo>=</mo><mi>W</mi><mo>×</mo><mn>5</mn><mn>0</mn><mi mathvariant="normal">%</mi><mo>−</mo><mi>w</mi><mo>×</mo><mn>5</mn><mn>0</mn><mi mathvariant="normal">%</mi></mrow><annotation encoding="application/x-tex">left = (W - w) / 2 = W \\times 50\\% - w \\times 50\\%</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.75em;"></span><span class="strut bottom" style="height:1em;vertical-align:-0.25em;"></span><span class="base"><span class="mord mathit" style="margin-right:0.01968em;">l</span><span class="mord mathit">e</span><span class="mord mathit" style="margin-right:0.10764em;">f</span><span class="mord mathit">t</span><span class="mrel">=</span><span class="mopen">(</span><span class="mord mathit" style="margin-right:0.13889em;">W</span><span class="mbin">−</span><span class="mord mathit" style="margin-right:0.02691em;">w</span><span class="mclose">)</span><span class="mord mathrm">/</span><span class="mord mathrm">2</span><span class="mrel">=</span><span class="mord mathit" style="margin-right:0.13889em;">W</span><span class="mbin">×</span><span class="mord mathrm">5</span><span class="mord mathrm">0</span><span class="mord mathrm">%</span><span class="mbin">−</span><span class="mord mathit" style="margin-right:0.02691em;">w</span><span class="mbin">×</span><span class="mord mathrm">5</span><span class="mord mathrm">0</span><span class="mord mathrm">%</span></span></span></span>，其中W为relative元素（如父元素）的宽，w为居中元素的宽。不过有一个问题：css中并不能进行这样的数值计算。不过这个问题有解，我们可以借助负margin值来解决这个问题，我们可以先设定<code>left: 50%</code>，这时候元素是偏向右的，我们还需要让它左移自己宽度的一半。假设自身宽度为200px，那么我们可以规定：<code>margin-left: -100px</code>，请特别注意这里的负号！</p>\n<div class="gatsby-highlight">\n      <pre class="language-css css"><code>.parent{\n    width:100%;\n    position:relative;\n}\n.child{\n    position:absolute;\n    left:50%\n    margin-left:-50px;\n    width:100px;\n}</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-html html"><code><div class="parent">\n    <div class="child">我要居中</div>\n</div></code></pre>\n      </div>\n<div class="parent" style="height: 30px; position: relative;"><div class="child" style="width: 100px; position: absolute; left: 50%; margin-left: -50px;">我要居中</div></div>\n<p>想必大家从我之前的说明里已经能看到这个方法的一点弊端了。对！这个方法要求我们必须先知道元素的宽度。对于动态的元素，如果我们无法事先得知元素的宽度，那么纯CSS无法解决这个问题，只能借助javascript获取宽度值后再更改margin-left的属性值。</p>\n<style>\n.parent{\n    width: 100%;\n    margin: 20px;\n    background: #ccc;\n}\n.child {\n    text-align: center;\n}\n</style>',excerpt:"网页中元素居中的需求很普遍，今天就要谈谈相对比较简单，使用场合更多的水平居中。 行级元素居中 我们知道css中有一个text-align的属性来定义子元素的水平对齐，不过它仅对行级元素生效。一种思路就是我们将想要居中的元素规定成inline或inline-block…",fields:{tagSlugs:["/tags/css/","/tags/水平居中/"]},frontmatter:{title:"网页中元素实现水平居中的方法",tags:["CSS","水平居中"],date:"2013-07-01T22:12:31.000Z",description:null}}},pathContext:{slug:"/2013/center/"}}}});
//# sourceMappingURL=path---2013-center-31abc2221fc9d7e57111.js.map