实现一个LazyMan，可以按照以下方式调用:
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

```var taskList = []
    function subscribe(type, fn) {
        const subscriber = {
            type,
            fn,
            priority: type === 'sleepFirst' ? 1 : 2
        }

        let added = false

        for(let i = 0;i<taskList.length;i++) {
            const task = taskList[i]
            if(subscriber.priority < task.priority) {
                taskList.splice(i,0,subscriber)
                added = true
                break
            }
        }

        if(!added) {
            taskList.push(subscriber)
        }
    }

   class LazyMan {
        constructor(name) {
            subscribe("lazyMan", () => {
                lazyManLog("Hi!This is "+ name +"!");
                publish()
            })
        }

       sleep (sec) {
           subscribe('sleep', setTimeout(function(){
               lazyManLog("Wake up after "+ sec);
               publish();
           }, sec * 1000))
           return this
       }

       sleepFirst(sec) {
           subscribe('sleepFirst', setTimeout(function(){
               lazyManLog("Wake up after "+ sec);
               publish();
           }, sec * 1000))
           return this
       }

       eat(msg) {
           subscribe("eat", () => {
               lazyManLog("Eat "+ msg +"~")
               publish()
           })
           return this
       }
   }


   function publish() {
       run(taskList.shift())
   }

    function lazyManLog(str){
        console.log(str)
    }

    function run(option={}){
        const { fn } = option
        if (typeof fn === 'function') {
            fn()
        }
    }

    function aLazyMan(name) {
        setTimeout(() => publish(), 0)
        return new LazyMan(name)
    }

    aLazyMan('lee').sleepFirst(6).sleep(10).eat("banana").eat("apple")
    ```
