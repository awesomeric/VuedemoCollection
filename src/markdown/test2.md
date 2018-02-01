---
layout:     post
title: JS流程控制
date: 2017-01-18 17:25:39
tags:
comment:    true


---

最近认识的朋友发来一个题目来搞事情，说是微信前端面试的一道题，刚说了没几天，这题就上了掘金首页。这题目其实很有意思，而且对于逻辑也是一个很好的锻炼。

---
## 题目
```
实现一个LazyMan（流程控制器），可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~
LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
```
## 具体实现

思路的核心其实就是构造一个`任务队列`，
将每个任务推入队列然后按照`先进先出`（FIFO）的原则去执行任务，
通过`.next()`方法实现任务执行。对于高优先级任务直接推入队伍首部
然后一些技术细节已经写到注释里面，请看代码

```javascript
function _LazyMan(userinput) {
    this.tasks = [];//构造任务队列
    var fn =(()=>{
        return ()=>{
            console.log("Hi! This is " + userinput + "!");
            this.next();
        }
    })();
    this.tasks.push(fn);//进入任务队列
    setTimeout(()=>{
        this.next();
    }, 0); // 在下一个事件循环启动任务
}

/* 事件调度函数 */
_LazyMan.prototype.next = function() {
    var fn = this.tasks.shift();//移除任务队列
    fn && fn(); //如果fn有返回任务则执行fn函数
}
_LazyMan.prototype.eat = function(name) {
    var fn =((name)=>{
        return ()=>{
            console.log("Eat " + name + "~");
            this.next()
        }
    })(name);
    this.tasks.push(fn);
    return this; // 实现链式调用
}
_LazyMan.prototype.sleep = function(time) {
    var fn = ((time)=>{
        return ()=> {
            setTimeout(()=>{
                console.log("Wake up after " + time + "s!");
                this.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.push(fn);
   return this;
}
// 优先级任务
_LazyMan.prototype.sleepFirst = function(time) {
    var fn = ((time)=> {
        return ()=> {
            setTimeout(()=> {
                console.log("Wake up after " + time + "s!");
                this.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.unshift(fn);
    return this;
}
function LazyMan(name){
    return new _LazyMan(name);
}

LazyMan('eric').eat("apple").sleep(3);
LazyMan("eric").eat('pear').sleep(1);
LazyMan('tyc');
```
