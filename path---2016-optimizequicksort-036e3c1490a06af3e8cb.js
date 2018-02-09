webpackJsonp([95816278548868],{489:function(t,i){t.exports={data:{site:{siteMetadata:{title:"Step Over",subtitle:"有趣的灵魂终会相遇",copyright:"© All rights reserved.",author:{name:"周骅",rss:"#",email:"zhou--hua@163.com",github:"zhouhua-js"}}},markdownRemark:{id:"/work/playground/zhouhua.site/src/pages/articles/2016/optimizequicksort.md absPath of file >>> MarkdownRemark",html:'<p>前两天在<a href="https://www.zhihu.com/question/39214230">知乎</a>上看到了一个关于快速排序算法性能的问题，我简单总结了一个优化思路，现在在自己的博客里也贴一下吧，版权都是我的。</p>\n<p>其实里面的大部分内容在我的另一篇博客里有讲过：<a href="http://www.zhouhua.info/2015/06/18/quicksort/">深入了解javascript的sort方法</a></p>\n<p>原回答：<a href="https://www.zhihu.com/question/39214230/answer/80380554?group_id=668445013272694784">https://www.zhihu.com/question/39214230/answer/80380554?group_id=668445013272694784</a></p>\n<p>快速排序水很深啊。我不贴代码，主要讲讲优化思路和手段吧。</p></p>\n<h2>1. 合理选择pivot</h2>\n<p>你就直接选择分区的第一个或最后一个元素做pivot肯定是不合适的。对于已经排好序，或者接近排好序的情况，会进入最差情况，时间复杂度衰退到<img src="https://zhihu.com/equation?tex=O%28N%5E%7B2%7D+%29" alt="O(N^{2} )">。\npivot选取的理想情况是：让分区中比pivot小的元素数量和比pivot大的元素数量差不多。较常用的做法是三数取中（midian of three），即从第一项、最后一项、中间一项中取中位数作为pivot。当然这并不能完全避免最差情况的发生。所以很多时候会采取更小心、更严谨的pivot选择方案（对于大数组特别重要）。比如先把大数组平均切分成左中右三个部分，每个部分用三数取中得到一个中位数，再从得到的三个中位数中找出中位数。\n我在javascript v8引擎中看到了另外一种选择pivot的方式：认为超过1000项的数组是大数组，每隔200左右（不固定）选出一个元素，从这些元素中找出中位数，再加入首尾两个元素，从这个三个元素中找出中位数作为pivot。\nBy the way，现实环境中，你要对一个预先有一定顺序的数组做排序的需求太太太普遍了，这个优化必须要有。</p>\n<h2>2. 更快地分区</h2>\n<p>我看到题主的做法是从左向右依次与pivot比较，做交换，这样做其实效率并不高。举个简单的例子，一个数组[2, 1, 3, 1, 3, 1, 3]，选第一个元素作为pivot，如果按题主的方式，每次发现比2小的数会引起一次交换，一共三次。然而，直观来说，其实只要将第一个3和最后一个1交换就可以达到这三次交换的效果。所以更理想的分区方式是从两边向中间遍历的双向分区方式。实现的话你可以参考楼上 <a href="https://www.zhihu.com/people/499f2ef7427c6eae7d20d0b7ff99d0e0">@林面包</a>的实现。</p>\n<h2>3. 处理重复元素的问题</h2>\n<p>假如一个数组里的元素全部一样大（或者存在大量相同元素），会怎么样？这是一个边界case，但是会令快速排序进入最差情况，因为不管怎么选pivot，都会使分区结果一边很大一边很小。那怎么解决这个问题呢？还是修改分区过程，思路跟上面说的双向分区类似，但是会更复杂，我们需要小于pivot、等于pivot、大于pivot三个分区。既然说了不贴代码，那就点到为止吧，有兴趣可以自己找别人实现看看。</p>\n<h2>4. 优化小数组效率</h2>\n<p>这一点很多人都提到了。为什么要优化小数组？因为对于规模很小的情况，快速排序的优势并不明显（可能没有优势），而递归型的算法还会带来额外的开销。于是对于这类情况可以选择非递归型的算法来替代。好，那就有两个问题：多小的数组算小数组？替换的算法是什么？\n通常这个阈值设定为16（v8中设定的是10），替换的算法一般是选择排序。据说阈值的设定是要考虑更好地利用cpu缓存，这个问题我就不是很清楚了，不深入。同样，对于分区得到的小数组是要立刻进行选择排序，还是等分区全部结束了之后，再统一进行选择排序，这个问题也会存在一定的缓存命中的区别，我也不懂，不深入。</p>\n<h2>5. 监控递归过程</h2>\n<p>这里我要说的是内省排序。想想看，我们已经做了一些努力来避免快速排序算法进入最坏的情况。但事实上可能并不如我们想象地那么理想。理想情况下，快速排序算法的递归尝试会到多深呢？这个很好回答：<img src="https://zhihu.com/equation?tex=log+N" alt="log N">。好，如果现在递归深度已经到了<img src="https://zhihu.com/equation?tex=log+N" alt="log N">，我会觉得很正常，毕竟不太可能每次都是最好情况嘛；那如果此时递归深度达到<img src="https://zhihu.com/equation?tex=2%5Ctimes+log+N" alt="2\\times log N">呢？我想你应该慌了，比理想情况递归深了一倍还没有结束。而此时，我觉得可以认为可能已经进入最差情况了，继续使用快速排序只会更遭，可以考虑对这个分区采用其他排序算法来处理。通常我们会使用堆排序。为啥要用堆排序？因为它的平均和最差时间复杂度都是<img src="https://zhihu.com/equation?tex=O%28NlogN%29" alt="O(NlogN)">。这就是内省排序的思想。</p>\n<h2>6. 优化递归</h2>\n<p>我想先说明一点：内省排序虽然会避免递归过深，但它的目的并不是为了优化递归。\n在分区过程中，我们其实是把一个大的问题分解成两个小一点的问题分别处理。这时我们需要考虑一下，这两个小问题哪个更小。先处理更小规模的问题，再处理更大规模的问题，这样可以减小递归深度，节约栈开销。\n楼上也有人提到了尾递归。对于支持尾递归的语言，自然是极好的，小规模的问题先递归，减少递归深度，大规模的问题直接通过尾递归优化掉，不进入递归栈。\n然而并不是所有的语言都支持尾递归⊙︿⊙，比如python（据说）和javascript。在javascript的v8引擎中，我看到它是用一个循环变相手动实现了一个与尾递归效果一样的优化，棒棒哒。</p>\n<h2>7. 并行</h2>\n<p>既然快速排序算法是典型的分治算法，那么对于分解下来的小问题是可以在不同的线程中并行处理的。当然对于javascript还是不适用，嗯，我是做前端的。</p>',excerpt:"前两天在 知乎 上看到了一个关于快速排序算法性能的问题，我简单总结了一个优化思路，现在在自己的博客里也贴一下吧，版权都是我的。 其实里面的大部分内容在我的另一篇博客里有讲过： 深入了解javascript的sort方法 原回答： https://www.zhihu.com…",fields:{tagSlugs:["/tags/快速排序/","/tags/快速排序算法/","/tags/性能优化/","/tags/递归/"]},frontmatter:{title:"快速排序算法的优化思路总结",tags:["快速排序","快速排序算法","性能优化","递归"],date:"2016-01-11T10:51:24.000Z",description:""}}},pathContext:{slug:"/2016/optimizequicksort/"}}}});
//# sourceMappingURL=path---2016-optimizequicksort-036e3c1490a06af3e8cb.js.map