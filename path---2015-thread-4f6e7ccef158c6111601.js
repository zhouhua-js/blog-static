webpackJsonp([0xc0963ca8a20c],{579:function(n,t){n.exports={data:{site:{siteMetadata:{title:"Step Over",subtitle:"有趣的灵魂终会相遇",copyright:"© All rights reserved.",author:{name:"周骅",rss:"#",email:"zhou--hua@163.com",github:"zhouhua-js"}}},markdownRemark:{id:"/work/playground/zhouhua.site/src/pages/articles/2015/thread.md absPath of file >>> MarkdownRemark",html:'<p>在以前的博文<a href="http://www.zhouhua.info/2015/03/04/sleep/">别说不可能，nodejs中实现sleep</a>中，我向大家介绍了nodejs addon的用法。今天的主题还是addon，继续挖掘c/c++的能力，弥补nodejs的弱点。</p></p>\n<p>我曾多次提到过nodejs的性能问题。其实就语言本身而言，nodejs的性能还是很高的，虽然不及大多部静态语言，但差距也并不大；相对其他动态语言而言，速度优势非常明显。但为什么我们常常说nodejs不能胜任CPU密集型场景呢？因为由于其单线程特性，对于CPU密集型场景，它并不能充分利用CPU。计算机科学中有一个著名的<strong>Amdahl定律</strong>：</p>\n<p><img src="http://www.zhouhua.info/wp-content/uploads/2015/03/render.gif" alt="render"></p>\n<p>假设总工作量W，可以分解为两个部分：只能串行计算的<em>W<sub>s</sub></em>和允许并行计算的<em>W<sub>p</sub></em>。那么，在p个CPU并行计算的情况下，性能上能够带来<em>speedup</em>倍的提升。Amdahl定律描述了并行能做到的和不能做到的。它是一种理想情况，实际情况会复杂得多。比如并发很可能会引起资源的争夺，需要增加各种锁，从而常常让并行处于等待状态；并发还会额外带来操作系统对线程调度切换的时间开销，增加<em>W<sub>s</sub></em>。不过，当一项任务中，<em>W<sub>p</sub></em>比<em>W<sub>s</sub></em>大得多，并且有多个CPU核心可供使用时，并行带来的性能提升是相当可观的。</p>\n<p>好，回到nodejs上。我们设想一个计算场景：计算4000000内的质数数目。这个场景编程实现的时候，以除法运算为主，不涉及内存、对象等操作，理论上能够确保让nodejs以相对较快的速度运行，不会落后c太多，便于对比。</p>\n<p>javascript寻找质数的方法已经在<a href="http://www.zhouhua.info/2015/02/25/zhishu">这篇博客</a>中提供了，直接抄过来：</p>\n<pre class="lang:js decode:true" title="javascript验证质数">function zhishu_js(num) {\n    if (num == 1) {\n        return false;\n    }\n    if (num == 2) {\n        return true;\n    }\n    for (var i = 2; i &lt;= Math.sqrt(num); i++) {\n        if (num % i == 0) {\n            return false;\n        }\n    }\n    return true;\n}</pre>\n<p>再写一个c语言版本的：</p>\n<pre class="lang:c decode:true" title="c验证质数">#include &lt;math.h&gt;\n\nbool zhishu(int num){\n    if (num == 1) {\n        return false;\n    }\n    if (num == 2) {\n        return true;\n    }\n    for (int i = 2; i &lt;= sqrt(num); i++) {\n        if (num % i == 0) {\n            return false;\n        }\n    }\n    return true;\n};</pre>\n<p>在nodejs中，我们用一个从1到4000000的循环来检索质数；c语言中，我们设置若干个线程，定义count为4000000，每个线程做如下操作要：如果count大于0，则取出count的值，并计算是否为质数，同时将count减1。根据这个思路，javascript版本的很容易写：</p>\n<pre class="lang:js decode:true">var count = 0;\n\nfor (j = 1; j &lt; 4000000; j++) {\n    if(zhishu(j)){\n        count++;\n    }\n}</pre>\n<p>关键难点就是c语言的多线程编程。早期c/c++并没有考虑并行计算的需求，所以标准库中并没有提供多线程支持。而不同的操作系统通常实现也是有区别的。为了避免这种麻烦，我们采用pthread来处理线程。</p>\n<p><a href="https://www.sourceware.org/pthreads-win32/">下载pthread最新版本</a>。由于我对gyp不熟，link依赖lib搞了半天没搞定，最后我的方式是，直接把pthread的源代码放到了项目目录下，并在binding.gyp中把pthread.c添加到源代码列表中，在编译项目的时候把pthread也编译一次。修改后的binding.gyp是这样的：</p>\n<pre class="lang:js decode:true " title="binding.gyp">{\n  "targets": [\n    {\n      "target_name": "hello",\n      "sources": [ "hello.cc","pthreads/pthread.c" ],\n      "include_dirs": [\n        "&lt;!(node -e \\"require(\'nan\')\\")",\n        "pthreads"\n      ],\n      "libraries": ["Ws2_32.lib"]\n    }\n  ]\n}</pre>\n<p> 当然了，我这种方法很麻烦，如果你们只添加pthread中lib和include目录的引用，并且不出现依赖问题，那是最好的，就没有必要用我的方法来做。</p>\n<p>那么接下来就进入C/C++多线程的一切了，定义一个线程处理函数：</p>\n<pre class="lang:c decode:true" title="C语言线程的实现">pthread_mutex_t lock;\n\nvoid *thread_p(void *null){\n    int num, x=0;\n    do{\n        pthread_mutex_lock(&amp;lock);\n        num=count--;\n        pthread_mutex_unlock(&amp;lock);\n        if(num&gt;0){\n            if(zhishu(num))x++;\n        }else{\n            break;\n        }\n    }while(true);\n    std::cout&lt;&lt;\' \'&lt;&lt;x&lt;&lt;\' \';\n    pthread_exit(NULL);\n        return null;\n}</pre>\n<p> 在线程与线程之间，对于<em>count</em>这个变量是相互竞争的，我们需要确保同时只能有一个线程操作<em>count</em>变量。我们通过</p>\n<pre class="lang:c decode:1 inline:1 " >pthread_mutex_t lock;</pre>\n<p> 添加一个互斥锁。当执行</p>\n<pre class="lang:c decode:1 inline:1 " >pthread_mutex_lock(&amp;lock);</pre>\n<p> 时，线程检查lock锁的情况，如果已锁定，则等待、重复检查，阻塞后续代码运行；如果锁已释放，则锁定，并执行后续代码。相应的，</p>\n<pre class="lang:c decode:1 inline:1 " >pthread_mutex_unlock(&amp;lock);</pre>\n<p> 就是解除锁状态。</p>\n<p>由于编译器在编译的同时，进行编译优化，如果一个语句没有明确做什么事情，对其他语句的执行也没有影响时，会被编译器优化掉。在上面的代码中，我加入了统计质数数量的代码，如果不加的话，像这样的代码：</p>\n<pre class="lang:c decode:true  ">for (int j = 0; j &lt; 4000000; j++) {\n    zhishu(j);\n}</pre>\n<p> 是会直接被编译器跳过的，实际不会运行。</p>\n<p>添加addon的写法已经介绍过了，我们实现从javascript接收一个参数，表示线程数，然后在c中创建指定数量的线程完成质数检索。完整代码：</p>\n<pre class="lang:c++ decode:true" title="hello.cc">#include &lt;nan.h&gt;\n#include &lt;math.h&gt;\n#include &lt;iostream&gt;\n#include "pthreads\\pthread.h"\n#define MAX_THREAD 100\nusing namespace v8;\n\nint count=4000000;\npthread_t tid[MAX_THREAD];\npthread_mutex_t lock;\n\nvoid *thread_p(void *null){\n    int num, x=0;\n    do{\n        pthread_mutex_lock(&amp;lock);\n        num=count--;\n        pthread_mutex_unlock(&amp;lock);\n        if(num&gt;0){\n            if(zhishu(num))x++;\n        }else{\n            break;\n        }\n    }while(true);\n    std::cout&lt;&lt;\' \'&lt;&lt;x&lt;&lt;\' \';\n    pthread_exit(NULL);\n    return null;\n}\n\nNAN_METHOD(Zhishu){\n    NanScope();\n    pthread_mutex_init(&amp;lock,NULL);\n    double arg0=args[0]-&gt;NumberValue();\n    int c=0;\n    for (int j = 0; j &lt; arg0 &amp;&amp; j&lt;MAX_THREAD; j++) {\n        pthread_create(&amp;tid[j],NULL,thread_p,NULL);\n    }\n    for (int j = 0; j &lt; arg0 &amp;&amp; j&lt;MAX_THREAD; j++) {\n        pthread_join(tid[j],NULL);\n    }\n    NanReturnUndefined();\n}\n\nvoid Init(Handle&lt;Object&gt; exports){\n    exports-&gt;Set(NanSymbol("zhishu"), FunctionTemplate::New(Zhishu)-&gt;GetFunction());\n}\n\nNODE_MODULE(hello, Init);</pre>\n<p> phread<em>create可以创建线程，默认是joinable的，这个时候子线程受制于主线程；phread</em>join阻塞住主线程，等待子线程join，直到子线程退出。如果子线程已退出，则phread<em>join不会做任何事。所以对所有的线程都执行thread</em>join，可以保证所有的线程退出后才会例主线程继续进行。</p>\n<p>完善一下nodejs脚本：</p>\n<pre class="lang:js decode:true" title="index.js">var zhishu_c=require(\'./build/Release/hello.node\').zhishu;\nfunction zhishu(num) {\n    if (num == 1) {\n        return false;\n    }\n    if (num == 2) {\n        return true;\n    }\n    for (var i = 2; i &lt;= Math.sqrt(num); i++) {\n        if (num % i == 0) {\n            return false;\n        }\n    }\n    return true;\n}\n\nconsole.time("c");\n    zhishu_c(100);\nconsole.timeEnd("c");\n\nconsole.time("js");\nvar count=0;\nfor (j = 1; j &lt; 4000000; j++) {\n    if(zhishu(j)){\n        count++;\n    }\n}\nconsole.log(count);\nconsole.timeEnd("js");</pre>\n<p> 看一下测试结果：</p>\n<table>\n<tbody>\n<tr>\n<td>线程数</td>\n<td>1</td>\n<td>2</td>\n<td>3</td>\n<td>4</td>\n<td>8</td>\n<td>50</td>\n<td>100</td>\n</tr>\n<tr>\n<td>C/C++(ms)</td>\n<td>1935</td>\n<td>1242</td>\n<td>1041</td>\n<td>940</td>\n<td>1021</td>\n<td>1016</td>\n<td>1038</td>\n</tr>\n<tr>\n<td>Nodejs(ms)</td>\n<td>3494</td>\n<td>3132</td>\n<td>3136</td>\n<td>3232</td>\n<td>3203</td>\n<td>3469</td>\n<td>3360</td>\n</tr>\n<tr>\n<td>提速度率</td>\n<td>181%</td>\n<td>252%</td>\n<td>302%</td>\n<td>344%</td>\n<td>314%</td>\n<td>341%</td>\n<td>324%</td>\n</tr>\n</tbody>\n</table>\n<p> 单线程时，虽然C/C++的运行速度是nodejs的181%，但这个成绩我们认为在动态语言中，还是非常不错的。双线程时速度提升最明显，那是因为我的电脑是双核四线程CPU，这个时候已经可能在使用两个核心在进行处理。4线程时速度达到最大，此时应该是双核四线程能达到的极限，当线程再增加时，并不能再提升速度了。上述Amdahl定律中，<em>p</em>已达上限4。再增加线程，会增加操作系统进程调度的时间，增加锁的时间，尽管同时也能增加对CPU时间的竞争，但总体而言，<em>W<sub>s</sub></em>的增加更加明显，性能是下降的。如果在一台空闲的机器上做这个实验，数据应该会更好一点。</p>\n<p>从这个实验中，我们可以得出这样的结论，对于CPU密集型的运算，交给静态语言去做，效率会提高很多，如果计算中较多涉及内存、字符串、数组、递归等操作（以后再验证），性能提升更为惊人。同时，合理地利用多线程能有效地提高处理效率，但并不是线程越多越好，要根据机器的情况合理配置。</p>\n<p>对于nodejs本身，的确是不擅长处理CPU密集的任务，但有了本文的经验，我想，想克服这个障碍，并非什么不可能的事情。</p>',excerpt:"在以前的博文 别说不可能，nodejs中实现sleep 中，我向大家介绍了nodejs addon的用法。今天的主题还是addon，继续挖掘c/c++的能力，弥补nodejs的弱点。 我曾多次提到过nodejs的性能问题。其实就语言本身而言，nodejs…",fields:{tagSlugs:["/tags/addon/","/tags/c-c/","/tags/javascript/","/tags/nodejs/","/tags/多线程/","/tags/性能/"]},frontmatter:{title:"在nodejs中使用多线程编程",tags:["addon","c/c++","Javascript","nodejs","多线程","性能"],date:"2015-03-16T15:29:53.000Z",description:null}}},pathContext:{slug:"/2015/thread/"}}}});
//# sourceMappingURL=path---2015-thread-4f6e7ccef158c6111601.js.map