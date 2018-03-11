/**
 * 优先队列，eg: 做高铁的时候，vip和普通乘客的区别
 */

 function PriorityQueue() {
     let items = [];
     function QueueElement(element, priority) {
         this.element = element;
         this.priority = priority;
     }

     this.enqueue = function(element, priority) {
         let queueElement = new QueueElement(element,priority);
         let added = false;
         //每次进队列时候，元素的优先级如果小于队列中的元素的优先级，直接插入，否则直接入列
         for(let i = 0; i<items.length; i++) {
             if(queueElement.priority < items[i].priority) {
                 items.splice(i,0,queueElement);
                 added = true;
                 break;
             }
         }
         if(!added) {
             items.push(queueElement);
         }
     };

     //其他方法与队列的方法相似
 }