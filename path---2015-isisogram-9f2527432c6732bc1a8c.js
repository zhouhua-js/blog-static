webpackJsonp([0xc24ac6babf6f],{477:function(t,e){t.exports={data:{site:{siteMetadata:{title:"Step Over",subtitle:"有趣的灵魂终会相遇",copyright:"© All rights reserved.",author:{name:"周骅",rss:"#",email:"zhou--hua@163.com",github:"zhouhua-js"}}},markdownRemark:{id:"/work/playground/zhouhua.site/src/pages/articles/2015/isisogram.md absPath of file >>> MarkdownRemark",html:'<p>今天上午刷到一道题，大体是写一个方法判断一个单词中是否有重复的字母（或者说一个字符串中是否有重复的字符）。我的思路是一个字符一个字符地遍历，如果发现有重复的停止：</p></p>\n<pre class="lang:js decode:true">function isIsogram(str) {\n  str = str.toLowerCase();\n\n  for (var i = 0; i &lt; str.length; i++) {\n    if (str.indexOf(str.charAt(i), i + 1) &gt;= 0) {\n      return false;\n    }\n  }\n\n  return true;\n}</pre>\n<p>这种简单的场景下谈性能没什么意义，两次循环速度并不慢（</p>\n<pre class="lang:js decode:1 inline:1 " >str.indexOf()</pre>\n<p> 也认为是一次循环，但由于是native的行为，速度很快）。</p>\n<p>后来我看到了别的用正则的实现，虽然很简单，但一开始我确实没住这方面想：</p>\n<pre class="lang:js decode:true ">function isIsogram2(str) {\n  return !/(.).*\\1/i.test(str);\n}</pre>\n<p> 或者：</p>\n<pre class="lang:js decode:true ">function isIsogram2(str) {\n  return !/^.*(.).*\\1/i.test(str);\n}</pre>\n<p> 这两个其实没什么区别，前者优先查找字符串尾端，后者优先查找字符串前端。这个正则比较好理解，不多解释，比较让我惊讶的这个匹配的性能。因为判断一个字符串是否有重复字符这样的任务太简单，正因为太简单，所以代表目标字符串的规律性太小。如果用正则必然带来大量尝试和回溯，其实主观上会让人觉得性能很不好。不过好不好不是随便想一想就行的，还是要验证一下。决定性能到底是好是坏，当然看最坏情况下，两个算法的执行时间。构造这样一个单词：<em>qwertyuiopas</em>，没有字母重复，意味着两种算法都要跑完整的循环。</p>\n<pre class="lang:js decode:true">console.time("loop");\nfor(var i=0; i&lt;400000; i++){\n    isIsogram("qwertyuiopas");\n}\nconsole.timeEnd("loop");\n\nconsole.time("regexp");\nfor(var i=0; i&lt;400000; i++){\n    isIsogram2("qwertyuiopas");\n}\nconsole.timeEnd("regexp");</pre>\n<p> 看看运行结果：</p>\n<p><a href="http://www.zhouhua.info/wp-content/uploads/2015/04/QQ20150407160509.png"><img src="http://www.zhouhua.info/wp-content/uploads/2015/04/QQ20150407160509.png" alt="QQ20150407160509"></a></p>\n<p>amazing! 这个实验证实了一个问题：javascript对正则确实有优化，使用正则的效率非常高。当然这句话也可以反过来理解，javascript中的字符串操作、循环太慢了。那么，对于正则还等什么呢，赶快用起来吧。</p>',excerpt:"今天上午刷到一道题，大体是写一个方法判断一个单词中是否有重复的字母（或者说一个字符串中是否有重复的字符）。我的思路是一个字符一个字符地遍历，如果发现有重复的停止： 这种简单的场景下谈性能没什么意义，两次循环速度并不慢（  也认为是一次循环，但由于是native…",fields:{tagSlugs:["/tags/javascript/","/tags/正则表达式/"]},frontmatter:{title:"巧妙判断一个单词是否有重复字母",tags:["Javascript","正则表达式"],date:"2015-04-07T15:10:10.000Z",description:null}}},pathContext:{slug:"/2015/isisogram/"}}}});
//# sourceMappingURL=path---2015-isisogram-9f2527432c6732bc1a8c.js.map