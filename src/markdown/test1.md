---
title: 使用双递归实现json串层级搜索算法
date: 2017-06-01 09:58:20
tags:
---
转载需注明：**[前端唐小胖](http://tangyc.top)**
#### 前言
最近准备把博客从自己的站点迁到这里来，主要是考虑到这里能够规范自己写博客的习惯，不要太随意。其实是因为自己的站点爬虫搜索率太低了😄
#### 背景
好了，言归正传，今天我给大家介绍的是一个比较实用的东西。最近在业务场景中遇到一个问题，前端使用了一个Element的层级选项卡，大概是这个样子：

![层级选项卡](http://upload-images.jianshu.io/upload_images/5809653-cf3f37fb3024b655.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)

选中了第三层的以后会生成一个数组给后端，分别包含了123层的ID。
```javascript
let arr = [120,110,119]
```
但是实际上后端只需要获取第三位的id(这个id在我们的场景中是唯一的）你可能觉得到这里也还好，将数组最后一位取到传给后端即可。
但是问题就由此产生了。虽然我们可以传给后端119这一个字段，但是后端返回的时候依然只返回了119，而只传一个值是Element的组件不能接受的。

于是开始思考这个问题的解决方案。
  1.重写ELement组件，使其具有单值搜索并具有展示功能。
  2.对返回的单值进行数据层的搜索，重溯后返回一个前端可用的字段。
  3.对后端软磨硬泡。使其屈服，收集这个数组并返回给我数组👿

评估了上面三个方案，
1.过于定制化，即使这次能够完成单值读取的层级选项卡，但是下一次要用的时候如何保证入参出参还是如此，而且让组件变得不纯洁。
2.这个方案就非常靠谱了，由于我们采用的是vue+node+java的前后端方案，node这一层可以参与到数据的处理工作。基于三级id是唯一的这样一个原则我们可以在node这一层去做一个处理，后端返回119以后去逆推他的父级元素和其祖父元素。本质上使用方案1也需要用到这个逆推的方法且方案1耦合程度过高，不利于功能拆封。
3.这个当然是最简单的了，后端多开个字段，前端传什么后端还什么，就是它了！
全文完

![](http://upload-images.jianshu.io/upload_images/5809653-c241af147f5645fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/200)





嘻嘻，其实并没有完。
方案3的问题在于让后端记录了他们不需要的值，这样让数据库的值变得不够纯洁，且不易于维护。换言之假如这个需求的前后端都离职了，那么这个字段后面来的人可能就不知道其存在的意义。

#### 实现
好了，这个时候我们就可以专心来研究这个算法的实现了。
首先来看一下原始的json的结构
```javascript
let carlist =[
        {
            "label": "奔驰",
            "value": 1151
        },
        {
            "label": "法拉利",
            "value": 1152
        },
        {
            "label": "奥迪",
            "value": 1153
        }
        {
            "label": "宝马",
            "value": 649,
            "children": [
                {
                    "label": "1系",
                    "value": 1659
                },
                {
                    "label": "3系",
                    "value": 1660
                },
                {
                    "label": "5系",
                    "value": 1661,
                    "children": [
                                {
                                   "label": "充电版",
                                   "value": 2999
                                },
                                {
                                   "label": "汽油版",
                                   "value": 3000
                                }
                },
                {
                    "label": "7系",
                    "value": 1662
                }
            ]
        }
]

```
需要解决的难题有这些：
1.我们不知道所处id的位于json的层级
2.需要知道其父元素和祖父元素的id
3.需要自适应层级的深度，无论多少层，都要遍历出所有元素，算法需要灵活。

由此形成一个大体的思路，首先需要找到ID所处的位置。考虑到深度遍历json树是必须的。通过遍历，设置条件，可以找到id所处json树的层级。
其次，要找到id的父级元素可能需要多次遍历，直至最后一次找到子集id的时候记录父级id，需要有一个变量能够反复刷写，每次遍历的时候进行一次刷写以保证父id的进度和遍历进度一致。
于是打算采用递归的方式来做，好处在于代码优雅，坏处是性能不够好，需要控制跳出条件。
 此处参考了阿里落雨大神的[Json树递归Js查询Json父子节点](http://www.cnblogs.com/ae6623/p/5264128.html)的部分实现。他利用递归反复记录父节点的做法让我佩服不已。而这个方法也是查找父节点的关键步骤。

以下是代码的解释
![父节点查询算法](http://upload-images.jianshu.io/upload_images/5809653-4cca6bd5aa549830.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/750)

其思想抽象用语言表述出来便是找东西的例子：
> 1.我们先在最大的几个房间里找我们要的钥匙，如果在外面找到了，则结束我们的搜索

> 2.如果最大的房间没找到，我们就去这几个大房间内的小房间里面找，找之前我们先把大房间的房号写在黑板上，每进一个小房间便把之前写的大房间号擦去掉并填上我们最新小房间所属的大房间号填上，这样当我们找到的时候总能确保大房间的号码是你属于小房间的。

>3.如果小房间里面还有小房间，则依此类推即可。小房间便成了大房间。

至此我们完成了父级和子集的查询功能👏
接下来我们进入最后的部分，即将子id的祖父级id也找到。

此处的设想依然是使用递归，好处在于可以自适应json树的深度，无论数据的深度，只要结构不变，我们只需要设置递归条件即可。
如下：

![祖父存储](http://upload-images.jianshu.io/upload_images/5809653-339e747ee0a2444a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/750)

当没有父元素的时候，说明我们已经到了节点的头部，不再需要递归，跳出。


到这里，我们就完成了这个层级搜索算法的全部开发。
此时可以看看结果：

![四层结构](http://upload-images.jianshu.io/upload_images/5809653-d552d36b21636e3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/750)

![一层结构](http://upload-images.jianshu.io/upload_images/5809653-2314ca9242f6e627.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/750)

#### 后记
代码至此便结束了，也许能够解决你的问题，也许能够给你提供一些思路。这个代码还是有很多可以优化的地方，比如递归次数过多，性能不是很理想，开发的时候对于递归的跳出的条件考虑不周，多次造成了栈溢出的问题，也暴露出我们使用递归的时候需要主要的问题。
最后我想说的是其实我们前端开发也可以运用各种算法技术来实现我们想要的功能，不要总是依赖后端来做数据处理，在前端拥有了nodejs这些controller层的新技术后，前端可以更多的参与到数据处理这个逻辑层。像一些简单的排序，归并，搜索的功能，都可以交由前端来做。
而我们前端也可以更有底气的说出“我们并不是切图仔”这句话😄


感谢观看