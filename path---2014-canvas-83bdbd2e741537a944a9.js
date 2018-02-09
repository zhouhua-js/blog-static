webpackJsonp([31763209260050],{369:function(t,n){t.exports={data:{site:{siteMetadata:{title:"Step Over",subtitle:"有趣的灵魂终会相遇",copyright:"© All rights reserved.",author:{name:"周骅",rss:"#",email:"zhou--hua@163.com",github:"zhouhua-js"}}},markdownRemark:{id:"/work/playground/www.zhouhua.site/src/pages/articles/2014/canvas.md absPath of file >>> MarkdownRemark",html:'<p><canvas id="canvas"></canvas></p>\n<script>\n    alert(1);\n</script>\n<script>\n    var canvas=document.getElementById(\'canvas\');\n    console.log(canvas);\n    canvas.width=500;\n    canvas.height=500;\n    var context=canvas.getContext(\'2d\');\n    context.save();\n    context.fillStyle = "rgba(255,255,255,0)"\n    context.fillRect(0, 0, canvas.width, canvas.height);\n    context.restore();\n    var text="周 骅";\n    context.font="100px \\"Microsoft YaHei\\" bold";\n    context.textAlign = "center";\n    context.textBaseline = "middle";\n    context.save();\n    context.fillStyle = "rgba("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+" , 1)";\n    context.fillText(text , canvas.width/2 , canvas.height/2);\n    var RAF=window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;\n    var dots=getDots(2);\n    context.restore();\n    animate(dots,4000,6000);\n\n    function getDots(r){\n        r=Math.max(+r,2);\n        var data=context.getImageData(0,0,canvas.width,canvas.height);\n        var dots=[];\n        for(var x=0;x<data.width-r;x+=r+r+1) {\n            for(var y=0;y<data.height-r;y+=r+r+1) {\n                var i1 = ((y+r)*data.width +x)*4;\n                if(data.data[i1+3+r*4]> 128){\n                    dots.push({\n                        x:x,\n                        y:y,\n                        r:r,\n                        color:[data.data[i1+r*4],data.data[i1+r*4+1],data.data[i1+r*4+2]],\n                        ex:Math.random()*canvas.width,\n                        ey:Math.random()*canvas.height,\n                        er:Math.random()*Math.random()*50+r\n                    });\n                }\n            }\n        }\n        return dots;\n    }\n    function animate(dots,duration,stopTime){\n        context.clearRect(0,0,canvas.width , canvas.height);\n        var direction=true;\n        var animation=true;\n        var startTime=+new Date;\n        function step(){\n            var gap=+new Date-startTime;\n            if(animation){\n                if(gap>duration){\n                    gap=duration\n                }\n                var rate=Math.pow(gap/duration,2);\n                context.save();\n                context.fillStyle = "rgba(255,255,255,0.3)";\n                context.fillRect(0, 0, canvas.width, canvas.height);\n                context.restore();\n                for(var i in dots){\n                    render(dots[i],rate,direction)\n                }\n                if(gap==duration){\n                    direction=!direction;\n                    animation=false;\n                    startTime=+new Date;\n                }\n            }else{\n                if(gap>duration){\n                    //context.clearRect(0,0,canvas.width , canvas.height);\n                    animation=true;\n                    startTime=+new Date;\n                }else{\n                    context.save();\n                    context.fillStyle = "rgba(255,255,255,0.3)";\n                    context.fillRect(0, 0, canvas.width, canvas.height);\n                    context.restore();\n                    for(var i in dots){\n                        render(dots[i],0,direction)\n                    }\n                }\n            }\n            RAF(step);\n        }\n        RAF(step);\n    }\n    function render(dot,rate,direction) {\n        context.save();\n        context.beginPath();\n        var r=direction?(dot.er-dot.r)*rate+dot.r:(dot.r-dot.er)*rate+dot.er;\n        if(r<dot.r){\n            r=dot.r;\n        }\n        var x=direction?(dot.ex-dot.x)*rate+dot.x:(dot.x-dot.ex)*rate+dot.ex;\n        var y=direction?(dot.ey-dot.y)*rate+dot.y:(dot.y-dot.ey)*rate+dot.ey;\n\n        var opacity=dot.r/r;\n        context.arc(x , y, r , 0 , 2*Math.PI,true);\n        context.fillStyle = "rgba("+dot.color.join(\',\')+","+ opacity +")";\n        context.fill();\n        context.restore();\n    }\n</script>',excerpt:"",fields:{tagSlugs:["/tags/实验/"]},frontmatter:{title:"canvas实现文字粒子化",tags:["实验"],date:"2014-12-19T13:55:08.000Z",description:null}}},pathContext:{slug:"/2014/canvas/"}}}});
//# sourceMappingURL=path---2014-canvas-83bdbd2e741537a944a9.js.map