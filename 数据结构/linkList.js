/**
 * 链表：一种书序存储数据结构，和数组不同（数组是连续存储的，按照下标访问元素，因此插入元素的时候
 * 要移动元素），链表不是连续存储，链表有指针。
 */

 //单向链表（有一个头部和元素组成，每个元素有指向下一个元素的指针），eg:火车

 function LinkList() {
     this.head = null;
     this.length;
     let Node = function(element) {
         this.element = element;
         this.next = null; //指向下一个元素的指针
     };

     this.append = function(element) {
        let node = new Node(element),
            current;
        if(head == null) {  
            head = node;
        } else {
            current = head;
            //找到最后一项,最后一项的next为null
            while(current.next) {
                //移动标记项
                current = current.next;
            }
            //标记项为最后一项，将其指针指向行新生成的node
            current.next = node;
            //更新长度
            length++;
        }
    };

    this.remove = function(position) {
        let current = head,
            previous,
            index = 0;
        if(typeof position !== 'number') return
        if(position >0 && position < length) {
            if(position === 0) {
                head = current.next;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    };

    this.insert = function(position, element) {
        if(typeof position !== 'number') return 

        let current = head,
            node = new Node(element),
            index,
            previous;
        
        if(position >=0 && position <=length) {
            if(position === 0) {
                node.next = current,
                head = node;
            } else {
                while(index++ <position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            length++;
        } else {
            return false;
        }
    };

    this.isEmpty = function() {
        return length === 0;
    };

    this.indexOf = function(element) {
        let current = head,
            index = -1;
        while(current) {
            if(current.element == element){
                return index
            }
            current = current.next;
            index++;
        }
        return -1;
    };

    this.size = function() {
        return length;
    };

    this.getHead = function() {
        return head;
    };
 }