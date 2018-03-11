/**
 * 双向链表(有一个指向上一个元素的指针prev和先一个元素的指针next)
 */

function DoublyLinkList() {
    let head = null,
        tail = null,
        length = 0;

    let Node= function(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    };

    this.append = function(element) {
        let node = new Node(element),
            previous,
            current = head,
            index = 0;
        
        if(!head){
            head = node;
            tail = node;
        } else {
            current = tail;
            current.next = node;
            node.prev = current;
        }
        length++;
    };

    this.insert = function(position, element) {
        let node = new Node(element),
            current = head,
            index = 0,
            previous;
        if(typeof position !== 'number') return
        if(position >=0 && position <= length){
            if(position === 0) {
                if(!head){
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            } else if(position === length) {
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
                node.prev = previous;
                current.prev = node;
            }
            length++;
        } else {
            return false;
        }
    };

    this.removeAt = function(position) {
        if(typeof position !== 'number') return

        let current = head,
            index = 0,
            previous;

        if(position > -1 && position < length) {
            if(position === 0) {
                head = current.next;
                if(position === 1) {
                    tail = null;
                } else {
                    head.prev = null;
                }
            } else if(position === length-1) {
                current = tail;
                tail = current.prev;
                tail.next = null;
            } else {
                while(index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    };

    this.size = function() {
        return length;
    };

    this.isEmpty = function() {
        return length === 0;
    };

    this.indexOf = function(position) {
        let current = head,
            index = -1;

        if(current) {
            if(current.element === element){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };
        
}