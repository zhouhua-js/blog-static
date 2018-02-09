webpackJsonp([0xaa8656eca4a4],{481:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Step Over",subtitle:"有趣的灵魂终会相遇",copyright:"© All rights reserved.",author:{name:"周骅",rss:"#",email:"zhou--hua@163.com",github:"zhouhua-js"}}},markdownRemark:{id:"/work/playground/zhouhua.site/src/pages/articles/2015/opensearch.md absPath of file >>> MarkdownRemark",html:'<h2>起</h2>\n<p>有一天，我在打理博客的时候，无意看到了这样的提示：</p>\n<p><img src="http://www.zhouhua.info/wp-content/uploads/2015/05/QQ20150527145709.png" alt="QQ20150527145709"></p>\n<p>“按tab可通过zhouhua.info进行搜索”？这是什么？于是我按了tab：</p>\n<p><img src="http://www.zhouhua.info/wp-content/uploads/2015/05/QQ20150527150159.png" alt="QQ20150527150159"></p>\n<p>看起来很高级嘛！输入“正则表达式”看看：</p>\n<p><img src="http://www.zhouhua.info/wp-content/uploads/2015/05/QQ20150527150313.png" alt="QQ20150527150313"></p>\n<p>竟然真的有效果！到底发生了什么……</p>\n<p>打开chrome的搜索引擎管理：</p>\n<p><img src="http://www.zhouhua.info/wp-content/uploads/2015/05/QQ20150527150721.png" alt="QQ20150527150721"></p>\n<p>我的博客怎么就被认为是搜索引擎呢？一定要搞明白怎么回事。</p></p>\n<h2>承</h2>\n<p>要让浏览器知道自己的网站是一个搜索引擎，在技术上并不难实现。很久之前amazon就提出了<a href="http://www.opensearch.org/Specifications/OpenSearch/1.1#OpenSearch_description_document">OpenSearch标准草案</a>。浏览器们是认这个标准的，只是各自实现不太一样。而开发者大多不太了解这玩意儿。总之挺鸡肋的吧，不过挺简单的，单纯提升点逼格也不错。</p>\n<blockquote>\n<p>本文所涉及的体验针对chrome，其他浏览器未测试。据我所知，IE浏览器处理OpenSearch时，并不会主动信任一个网站为搜索引擎，而是需要网站管理者向微软提出申请，审核通过才会被IE认为是搜索引擎。</p></p>\n</blockquote>\n<p>那么就来试试吧。</p>\n<p>首先要告诉浏览器：我是搜索引擎。做法很简单，在网页的head部分加上这样一行：</p>\n<pre class="lang:xhtml decode:true">&lt;link rel="search" type="application/opensearchdescription+xml" href="http://www.zhouhua.info/opensearch.xml" title="step over"&gt;</pre>\n<p>我们看到type定义了一种从来没见过的mine类型</p>\n<pre class="lang:ini decode:1 inline:1 " >application/opensearchdescription+xml</pre>\n<p> ，不用紧张，这是openSearch标准规定的，你不用额外对服务器进行配置，只要提供一个能访问到的xml文件。在这个例子中，我的xml文件路径为</p>\n<pre class="lang:js decode:1 inline:1 " >http://www.zhouhua.info/opensearch.xml</pre>\n<p> 。关键就是要看这个xml是什么样的。标准中定义了很多，但我觉得设置几个简单的属性就够了：</p>\n<pre class="lang:xhtml decode:true">&lt;?xml version="1.0"?&gt;\n&lt;OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"&gt;\n    &lt;ShortName&gt;屠龙刀&lt;/ShortName&gt;\n    &lt;Description&gt;搜索周骅的博客&lt;/Description&gt;\n    &lt;Url type="text/html" method="get" template="http://zhouhua.info/?s={searchTerms}"/&gt;\n&lt;/OpenSearchDescription&gt;</pre>\n<p>我这里定义了三个属性，ShortName表示搜索引擎的名字，Description代表搜索引擎的描述，这都比较好理解。比较重要的是Url属性，它定义了搜索的方式。有这个例子里，规定了搜索结果是以text/html的形式返回，规定了用get方式去访问搜索action，规定了处理搜索的url为<a href="http://zhouhua.info/?s=%7BsearchTerms%7D%EF%BC%8C%E5%85%B6%E4%B8%AD%7BsearchTerms%7D%E4%BC%9A%E8%A2%AB%E7%94%A8%E6%88%B7%E8%BE%93%E5%85%A5%E7%9A%84%E5%85%B3%E9%94%AE%E5%AD%97%E6%9B%BF%E6%8D%A2%E3%80%82%E6%9C%89%E4%B8%80%E4%B8%AA%E6%AF%94%E8%BE%83%E6%9C%89%E6%84%8F%E6%80%9D%E7%9A%84%E5%8A%9F%E8%83%BD%EF%BC%8C%E6%88%91%E7%A8%8D%E5%BE%AE%E8%AF%B4%E4%B8%80%E4%B8%8B%EF%BC%8C%E5%A6%82%E6%9E%9C%E4%BD%A0%E7%9A%84%E7%AB%99%E7%82%B9%E6%9C%89%E6%90%9C%E7%B4%A2%E8%AF%8D%E5%BB%BA%E8%AE%AE%E7%9A%84%E5%8A%9F%E8%83%BD%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E5%86%8D%E5%AE%9A%E4%B9%89%E4%B8%80%E6%9D%A1Url%E5%AD%97%E6%AE%B5%EF%BC%8C%E5%B0%86template%E6%8C%87%E5%90%91%E8%AF%B7%E6%B1%82%E6%90%9C%E7%B4%A2%E5%BB%BA%E8%AE%AE%E7%9A%84ajax%E5%9C%B0%E5%9D%80%EF%BC%8C%E5%90%8C%E6%97%B6%E8%AE%BE%E7%BD%AErel%E5%B1%9E%E6%80%A7%E4%B8%BAsuggestion%E3%80%82%E7%B1%BB%E4%BC%BC%E8%BF%99%E6%A0%B7%EF%BC%9A">http://zhouhua.info/?s={searchTerms}，其中{searchTerms}会被用户输入的关键字替换。有一个比较有意思的功能，我稍微说一下，如果你的站点有搜索词建议的功能，你可以再定义一条Url字段，将template指向请求搜索建议的ajax地址，同时设置rel属性为suggestion。类似这样：</a></p>\n<pre class="lang:xhtml decode:true">&lt;Url type="application/json" rel="suggestions" template="http://my_site/suggest?q={searchTerms}" /&gt;</pre>\n<p>标准里定义了Url可以有四种rel类型，我感觉比较有价值的就两种，一种是设置获取搜索结果的url，rel为result，这种最重要，如果不设置rel属性，那么会默认这个Url字段是这个作用；第二种是设置获取搜索建议的url，它的rel属性为suggestions，如果取这个值，那么这个属性是不可以省略的。其他的两种取值就不说了。</p>\n<p>除了以上的一些字段，其实可定制的内容还有很多，有兴趣的可以<a href="http://www.opensearch.org/Specifications/OpenSearch/1.1">查看文档</a>，我就不多介绍。因为我迫不及待地想看看设置的效果怎么样。</p>\n<p><img src="http://www.zhouhua.info/wp-content/uploads/2015/06/QQ20150605222420.png" alt="QQ20150605222420"></p>\n<p>效果还是不错的嘛，设置的搜索引擎名称等都生效了，挺好玩的。</p>\n<h2>转</h2>\n<p>自定义搜索引擎无非就是通过现有的标准，网站向浏览器传达了自己是搜索引擎、传达了自己的特征和用法，而浏览器则根据这些信息把网站添加到搜索引擎列表中，并对它们启用特殊的交互体验（比如输入域名就可以按tab进入搜索功能、可以设置成默认搜索引擎等）。</p>\n<p>但我的疑问是，一开始我可是什么也没有干呀，那么chrome是怎么知道我的网站有搜索功能，并把它添加到了搜索引擎列表中的呢？</p>\n<p>在chrome的这篇文档中，我找到了答案：<a href="http://dev.chromium.org/tab-to-search">传送门</a>（英文，需梯子）。</p>\n<p>原来在使用chrome访问一个网站时，chrome会先查看有没有定义OpenSearch。如果没有的话，它会在网页中找有没有这样一个表单：</p>\n<ol>\n<li>表单以GET方式提交（POST不可以）；</li>\n<li>表单的提交url为HTTP协议的（HTTPS不可以）；</li>\n<li>表单没有附加onSubmit事件（确保提交过程不被用户代码干涉）；</li>\n<li>表单中仅包含一个input输入框，而且类型为text（其他类型的都不可以，多余的控件也都不可以）</li>\n</ol>\n<p>如果有这样一个表单，chrome会认为这是一个搜索框，并根据这个表单的信息推断出这个网站的搜索方法。在我的网站中，恰恰有这样的表单：</p>\n<pre class="lang:xhtml decode:true">&lt;form role="search" method="get" id="searchform" class="searchform" action="http://www.zhouhua.info/"&gt;\n    &lt;div&gt;\n        &lt;label class="screen-reader-text" for="s"&gt;搜索：&lt;/label&gt;\n    &lt;input type="text" value="" name="s" id="s"&gt;\n    &lt;input type="submit" id="searchsubmit" value="搜索"&gt;\n    &lt;/div&gt;\n&lt;/form&gt;</pre>\n<p>这个表单提供的信息和</p>\n<pre class="lang:xhtml decode:1 inline:1 " >&lt;Url type="text/html" method="get" template="http://zhouhua.info/?s={searchTerms}"/&gt;</pre>\n<p> 是等价的。但并不能提供更多的信息了，所以一开始，chrome直接是拿网站的域名当成是搜索引擎的名字。</p>\n<p>对于chrome的这个设计，我持保留意见，毕竟存在一定的误判率。</p>\n<p>在chrome的文档中，最后一句话提到了添加自定义引擎的第三种方法，使用AddSearchProvider这个API。虽然这个文档中只提到了一个词，但并不妨碍我们获取更多信息，MSDN和MDN上都有文档。</p>\n<p><a href="https://msdn.microsoft.com/en-us/library/aa744112.aspx">跳到MSDN</a> 、 <a href="https://developer.mozilla.org/en-US/docs/Adding_search_engines_from_web_pages">跳到MDN</a></p>\n<p>MDN的文档中有一个示例程序还是值得学习一下，它对AddSearchProvider做了兼容性的提升：</p>\n<pre class="lang:js decode:true">function installSearchEngine() {\n if (window.external &amp;&amp; ("AddSearchProvider" in window.external)) {\n   // Firefox 2 and IE 7, OpenSearch\n   window.external.AddSearchProvider("http://example.com/search-plugin.xml");\n } else if (window.sidebar &amp;&amp; ("addSearchEngine" in window.sidebar)) {\n   // Firefox &lt;= 1.5, Sherlock\n   window.sidebar.addSearchEngine("http://example.com/search-plugin.src",\n                                  "http://example.com/search-icon.png",\n                                  "Search Plugin", "");\n } else {\n   // No search engine support (IE 6, Opera, etc).\n   alert("No search engine support");\n }\n}</pre>\n<h2>合</h2>\n<p>不得不说，chrome对表单功能进行猜测，并以此提升用户体验确定给到我惊喜。但深入思考之后，我却不认为这是一个好的idea，至少对于搜索行为的猜测。</p>\n<p>回到OpenSearch上，总体而言，这个功能实现起来相当容易，除去chrome的自动探测不说，也算有两种通用的方法，开发量很小，而且对性能没什么影响。但实际上带的效果是因人而异的，至少对个人网站没什么用。我觉得并不是这个功能不好用，而是人们根本想不到用，这个使用习惯并没有建立。试想一下，如果你想在网站中搜索，以下两种搜索方式，你更习惯哪种：</p>\n<p><img src="http://www.zhouhua.info/wp-content/uploads/2015/06/QQ20150605231843.png" alt="QQ20150605231843"></p>\n<p>我想更多人习惯直接用网页上提供的搜索功能。而且很多网站都将搜索功能fixed定位在页面上，访问便携。</p>\n<p>对于OpenSearch，我的观点是，它对于小网站其实是很鸡肋的；对于资讯信息类的大网站而言，还是有一定的价值，能稍许提升用户体验。好就好在开发量很小，大家都可以尝试尝试。</p>',excerpt:"起 有一天，我在打理博客的时候，无意看到了这样的提示： “按tab可通过zhouhua.info进行搜索”？这是什么？于是我按了tab： 看起来很高级嘛！输入“正则表达式”看看： 竟然真的有效果！到底发生了什么…… 打开chrome…",fields:{tagSlugs:["/tags/chrome/","/tags/open-search/","/tags/搜索/"]},frontmatter:{title:"让你的网站成为自定义搜索引擎",tags:["chrome","OpenSearch","搜索"],date:"2015-06-05T23:27:56.000Z",description:null}}},pathContext:{slug:"/2015/opensearch/"}}}});
//# sourceMappingURL=path---2015-opensearch-0fc593fd818cf556fdd6.js.map