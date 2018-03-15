function HashTable () {
    var table = [];
    var loseloseHashCode = function(key) {
        var hash = 0;
        for(var i=0;i<key.length;i++ ) {
            hash+=key.charCodeAt(i);
        }
        return hash % 37
    };

    /** 
     * 有冲突
    this.put = function(key,value) {
        var position = loseloseHashCode(key);
        table[position] = value;
    };

    this.get = function(key) {
        return table[loseloseHashCode(key)]
    };

    this.remove = function(key) {
        delete table[loseloseHashCode(key)]
        // table[loseloseHashCode(key)] = undefined;
    };
    */

    /**
     * 分离链接
     */

     var ValuePair = function(key,value) {
         this.key = key;
         this.value = value;
     };

     this.put = function() {
         var position = loseloseHashCode(key);
         if(table[position] == undefined){
            table[position] = new LinkedList();
         }
         table[position].append(new ValuePair(key,value));
     };

     this.get = function(key) {
         var position = loseloseHashCode(key);
         if(table[position]){
            var current = table[position].getHead();
            while(current) {
                if(current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }

            if(current.element.key === key) {
                return current.element.value;
            }
         }
         return undefined;
     };

     this.remove = function(key) {
         var position = loseloseHashCode(key);
         if(table[position]){
             var current = table[position].getHead();
             while(current.next) {
                 if(current.element.key === key) {
                     table[position].remove(current.element);
                     if(table[position].isEmpty()){
                        table[position] = undefined;
                    }
                 }
                 current = current.next;
             }
             if(current.element.key === key) {
                table[position].remove(current.element);
                if(table[position].isEmpty()){
                    table[position] = undefined;
                }
             }
             return true;
         }
         return false;
     };

     /**
      * 线性探查
      */
    this.put = function(key) {
        var position = loseloseHashCode(key);

        if(table[position] == undefined){
            table[position] = new ValuePair(key,value);
        } else {
            var index = ++position;
            while(table[index] !== undefined) {
                index++;
            }
            table[index] = new ValuePair(key,value); 
        }
    };

    this.get = function (key) {
        var position = loseloseHashCode(key);
        if(table[position]){
            if(table[position].key === key){
                return table[position].value;
            } else {
                var index = ++position;
                while(table[index].key !== key) {
                    index++;
                }
                if(table[index].key === key){
                    return table[index].value;
                }
            }

        }
        return undefined
    };

    this.remove = function(key) {
        var position = loseloseHashCode(key);
        if(table[position]) {
            if(table[position].key === key){
                table[position] = undefined;
                return true;
            } else {
                var index = ++position;
                while(table[index].key !== key) {
                    index++;
                }
                if(table[index].key === key){
                    table[index] = undefined;
                    return true;
                }
            }
        }
        return false;
    };
}