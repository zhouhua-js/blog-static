webpackJsonp([0xea301460993c],{479:function(e,n){e.exports={data:{site:{siteMetadata:{title:"Step Over",subtitle:"有趣的灵魂终会相遇",copyright:"© All rights reserved.",author:{name:"周骅",rss:"#",email:"zhou--hua@163.com",github:"zhouhua-js"}}},markdownRemark:{id:"/work/playground/zhouhua.site/src/pages/articles/2015/kindle.md absPath of file >>> MarkdownRemark",html:'<h2>前言</h2>\n<p>kindle看书挺舒服的，网页上看到大段文字就想搬到kindle里去。以前会用一些转寄的服务，网页上随手点个send to kindle，倒也方便。嗯……还是不要自欺欺人了，read it later === read it never。</p></p>\n<p>后来固定用多看了，多看的推送和amazon的是一样的，只是没有转寄服务了，也就懒得推送网页了。其实不喜欢推送网页的最主要的原因还是体验差，阅读本来就应该是一页一页地读下去，而不是看个几分钟，退出，删除，选下一本。但……如果内容多一点的话，比如天涯上的长帖、小说，嗯，它们本来就应该在kindle上看。联上wifi用浏览器看？不适合我……原因：移动性弱，浏览器弱，支持wifi加密方式少，没买3G的，耗电惨。那怎么办？把帖子扒下来慢慢看！</p>\n<hr>\n<p> </p>\n<h2>准备</h2>\n<p>如今的码农动不动就写个爬虫，爬这个爬那个。那我们……不行，前端从业者应该用一些“前端特色”的方式来解决这个问题。</p>\n<h3>武器一：phantomjs</h3>\n<p>无头浏览器，功能强大，绝对让你以最熟悉的方式分析网页。想知道怎么用，移步到<a href="http://www.zhouhua.info/2014/03/19/phantomjs" title="phantomjs使用说明">phantomjs使用说明</a></p>\n<h3>武器二：kindlegen</h3>\n<p>amazon出品的电子书制作、转换工具，它能把HTML、XML、XHTML、ePub等格式的文档转换成mobi格式，功能强悍、使用简单。amazon不知何故禁止中国地区用户下载，不过通过下面这个链接还是可以下载到的：<a href="https://kdp.amazon.com/help?topicId=A3IWA2TQYMZ5J6">https://kdp.amazon.com/help?topicId=A3IWA2TQYMZ5J6</a> 。</p>\n<hr>\n<p> </p>\n<h2>动手</h2>\n<p>思路其实不复杂，就是把一个帖子分析一下，从第一页到最后一页，把每一页楼主发表的内容都抓出来，存放到一个html文件中。最后使用kindlegen把这个html转成mobi，大功告成。</p>\n<p>建立一个mobi.js文件，开始这次的phantomjs脚本之旅。</p>\n<h3>解析url</h3>\n<p> </p>\n<p>[caption id=“attachment_244” align=“aligncenter” width=“879”]<img src="http://www.zhouhua.info/wp-content/uploads/2015/02/QQ%E6%88%AA%E5%9B%BE20150227142735.png" alt="天涯帖子url示意"> 天涯帖子url示意[/caption]</p>\n<p>一个普通的天涯帖子url长这个样式。标红的数字表示当前页码，如果样跳转到这个帖子的第5页，只需要把这个数字换成5就可以了。</p>\n<p>脚本开始之前，先要获取要采集的网址。假设我们执行：</p>\n<pre class="lang:batch decode:true">phantomjs mobi.js [url]</pre>\n<p> 那么如何在脚本中得到这个</p>\n<pre class="inline:true decode:1 " >url</pre>\n<p>呢？</p>\n<pre class="lang:js decode:true" title="获取参数">var system = require(\'system\');\nvar args = system.args;\n\nif (args.length === 1) {\n    console.log(\'请输入要采集的网址！\');\n    phantom.exit(-1);\n}\nvar url = args[1];</pre>\n<p> 对于这个url，我们关注的焦点应该在页码处。关于这一点，我们很容易把url的后面一部分抽象成</p>\n<pre class="lang:default decode:1 inline:1 " >-{Number}.shtml</pre>\n<p> ，写成正则表达式：</p>\n<pre class="lang:js decode:1 inline:1 " >/^(.+)-([0-9]+)\\.shtml$/</pre>\n<p> 。好了，验证url的代码可以像这样：</p>\n<pre class="lang:js decode:true">var scope = {\n    content: \'\', // 提取内容\n    page: 1, // 当前页码\n    counts: 0 // 总页码\n};\n\nvar r = /^(.+)-([0-9]+)\\.shtml$/;\nvar matches = url.match(r);\nif (matches.length === 3) {\n    spider(scope); // 后面讲\n}\nelse {\n    console.log(\'无法解析url\');\n    phantom.exit(-1);\n}</pre>\n<p> 多说一句，这个正则有两个子模式，前一个会匹配出这个帖子特有的url信息，那么我们想跳转到第n页的话，可以这样拼出url：</p>\n<pre class="lang:js decode:true" title="拼出特定页码的url">var url = matches[1] + \'-\' + n + \'.shtml\';</pre>\n<h3>页面分析</h3>\n<p>上面的代码已经看到</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >spider()</pre>\n<p> 方法，这是个递归方法，从第一页递归到最后一页，每一层递归间通过</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >scope</pre>\n<p> 这个全局变量传递参数。下面看看到底怎么实现的。</p>\n<pre class="lang:js decode:true" title="递归处理每页帖子">var webPage = require(\'webpage\');\nvar page = webPage.create();\n\nfunction spider(scope) {\n    var url = matches[1] + \'-\' + scope.page + \'.shtml\';\n\n    page.open(url, function (status) {\n        if (status === \'success\') {\n            page.injectJs(\'jq.js\');\n            scope = page.evaluate(function (scope) {\n                // 提取文章内容\n                return scope;\n            }, scope);\n\n            if (scope.page === scope.counts) {\n                writer(scope);\n            }\n            else {\n                scope.page++;\n                spider(scope);\n            }\n        }\n        else {\n            console.log(\'无法打开\' + url);\n            phantom.exit(-1);\n        }\n    });\n}</pre>\n<p> 上面这段代码流程是根据当前页码，生成要采集的url（上文已经解释过）。用phantomjs打开这个url。如果打开成功，则提取文章内容（具体做法下文再阐述）。提取完成后，如果现在已经是最后一页，则抓取工作结束，把提取的内容输出出来，否则当前页数加上1，重新执行</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >spider</pre>\n<p> 方法重复上述流程。</p>\n<p>这段代码逻辑并不复杂，但是用到phantomjs webPage模块的一些api，如果不熟悉，可以参考<a href="http://www.zhouhua.info/2014/03/19/phantomjs" title="phantomjs使用说明">phantomjs使用</a>。下面来说说具体如何提取需要的内容。</p>\n<pre class="lang:js decode:true " title="提取帖子内容">scope = page.evaluate(function (scope) {\n    var $ = jQuery;\n    if (!scope.counts) {\n        scope.counts = bbsGlobal.pageCount;\n        scope.hostName = bbsGlobal.dashang.getName;\n        scope.title=$(\'title\').text();\n    }\n\n    var posts = $(\'[_host="\' + scope.hostName + \'"]\');\n    posts.each(function () {\n        var $this = $(this);\n        scope.content += \'&lt;div class="post-content"&gt;\' + $this.find(\'.bbs-content\').html() +\n            \'&lt;/div&gt;&lt;br/&gt;&lt;hr/&gt;\';\n    });\n    return scope;\n}, scope);</pre>\n<p> 使用phantomjs的</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >evaluate</pre>\n<p> 方法来给打开的网页插入一段我们自定义的javascript脚本，之前我们已经用js注入的方法把jquery引入了，当然，你需求的一切类库都可以自由引入。所以现在天涯的网页就像我们自己开发的网页一样，可以自由使用javascript来操作。这里呢，我继续把</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >scope</pre>\n<p> 这个变量作为page对象内注入脚本和外部phantomjs环境间通信的信使。注意，这个</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >scope</pre>\n<p> 一定要是一个可以序列化成JSON字符串的对象。</p>\n<p>OK，至此现在该分析网页本身的结构了。首先我在代码中发现一个全局变量</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >bbsGlobal</pre>\n<p> ，可以从中得到总页数和作者ID<img src="http://www.zhouhua.info/wp-content/uploads/2015/02/QQ%E6%88%AA%E5%9B%BE201502271427351.png"></p>\n<p>于是，嗯，我就直接拿来用了。再看帖子结构，如下：<img src="http://www.zhouhua.info/wp-content/uploads/2015/02/QQ%E6%88%AA%E5%9B%BE201502271427352.png" alt="QQ截图20150227142735"></p>\n<p>我们可以直接用</p>\n<pre class="lang:js decode:1 inline:1 " >$(\'[_host="\' + scope.hostName + \'"] .bbs-content\')</pre>\n<p> 把正文节点都找出来，然后拼合在一起，完成！</p>\n<h3>输出HTML</h3>\n<p>上面在</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >spider</pre>\n<p> 方法内可以看到我调用了一个</p>\n<pre class="lang:js highlight:0 decode:1 inline:1 " >writer</pre>\n<p> 方法，现在就看看这个方法是怎么实现的吧：</p>\n<pre class="lang:js decode:true">var fs = require(\'fs\');\nvar outputPath = \'output\';\n\nfunction writer(scope) {\n    var html=\'&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head lang="en"&gt;&lt;title&gt;\'+\n        scope.title+\n        \'&lt;/title&gt;&lt;/head&gt;&lt;body&gt;\'+\n        scope.content.replace(/&lt;br\\/&gt;$/, \'\')+\n        \'&lt;/body&gt;&lt;/html&gt;\';\n    var path=outputPath+\'/\'+scope.title.replace(/[ \\\\\\/:,，\\?？\\-\\.\\+]/g,\'\')+\'.html\';\n    fs.write(path,html,{\n        charset:\'gb18030\'\n    });\n    // HTML转modi下文讲 \n}</pre>\n<p> 用一个很简单的html把提取出来的内容包好，写到一个html文件中。两个注意点：一是这里是允许加入排版的，css是支持的，这部分我略过，有兴趣的可以自己摸索；另一点是如果出现乱码，请在保存html文件时就指定好文件编码，在html文件中指定</p>\n<pre class="lang:xhtml decode:1 inline:1 " >&lt;mate charset /&gt;</pre>\n<p> 被验证是无效的，转换时不起作用。文件写入完成后，就进入转换格式的流程了。</p>\n<h3>转换mobi</h3>\n<pre class="lang:js decode:true ">var process = require("child_process");\nvar child = process.spawn("./kindlegen.exe", [path]);\n\nchild.stderr.on("data", function (data) {\n    console.log("spawnSTDERR:", JSON.stringify(data))\n});\n\nchild.on("exit", function (code) {\n    console.log(\'finish!\');\n    phantom.exit(-1);\n});</pre>\n<p> 使用phantomjs的child_process模块调用kindlegen来转换，并捕获产生的错误信息。完成后，phantomjs脚本也完成。</p>\n<p>至此，大功告成。把生成的mobi文档拷到kindle里，enjoy吧。</p>\n<h2>补充</h2>\n<p>主要内容都说完了，还有一些不主要的。首先是样式和编码，这两个特别实用，是允许自定义的，前文已经有所提及，我不展开了。</p>\n<p>下面要说一点没提及的东西了。你如果真的按我前面说的去做，你会被这抓取速度逼疯——实在太慢了！于是你需要掌握新技能：只下载需要的，中断一切无关的请求。什么是无关请求呢？css、js、图片、广告、站长统计等等。怎么解？so easy:</p>\n<pre class="lang:js decode:true">page.onResourceRequested = function(requestData, request) {\n    if ((/http:\\/\\/.+?\\.css/gi).test(requestData[\'url\'])) {\n        request.abort();\n    }\n    if ((/http:\\/\\/.*baidu/gi).test(requestData[\'url\'])) {\n        request.abort();\n    }\n    if ((/http:\\/\\/.*jd/gi).test(requestData[\'url\'])) {\n        request.abort();\n    }\n    if ((/http:\\/\\/.+?\\.jpg/gi).test(requestData[\'url\'])) {\n        request.abort();\n    }\n    if ((/http:\\/\\/.+?\\.png/gi).test(requestData[\'url\'])) {\n        request.abort();\n    }\n    if ((/http:\\/\\/.+?\\.js/gi).test(requestData[\'url\'])) {\n        request.abort();\n    }\n};</pre>\n<p> 把无关请求的特征找出来，直接在请求发起时，中断好了。</p>\n<p>等等……好像漏了什么。对，图片呢？mobi格式是访问不了天涯的图片的，我们不仅没有把图片下载下来，还把下载图片的请求给中止了。这……这只能留给感兴趣的同学自己完成了，我只能提示你注意天涯图片使用了懒加载，另外调用open方法时可能使得之前所有的request全部中断，不想每一页都等到图片下载完成才能处理下一页的话，建议另开线程处理图片下载。当然我是没兴趣研究这个，因为……不会。不过考虑抓取速度和kindle图片显示效果，这图片就算了。</p>\n<p>最后，放上<a href="http://www.zhouhua.info/wp-content/uploads/2015/02/mobi.zip">下载链接</a>。</p>',excerpt:"前言 kindle看书挺舒服的，网页上看到大段文字就想搬到kindle里去。以前会用一些转寄的服务，网页上随手点个send to kindle，倒也方便。嗯……还是不要自欺欺人了，read it later === read it never…",fields:{tagSlugs:["/tags/javascript/","/tags/kindle/","/tags/phantom/","/tags/phantomjs/","/tags/多线程/","/tags/爬虫/"]},frontmatter:{title:"phantomjs配合kindlegen，kindle看天涯不费力",tags:["Javascript","kindle","phantom","phantomjs","多线程","爬虫"],date:"2015-02-27T22:59:13.000Z",description:null}}},pathContext:{slug:"/2015/kindle/"}}}});
//# sourceMappingURL=path---2015-kindle-173ded7c8fdbdf96de25.js.map