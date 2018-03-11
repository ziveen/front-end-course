/**
 * 栈（先进后出），eg: 餐厅的盘子，最后放上去的，下次用的时候最先用
 */
function Stack() {
    let items = [];

    this.append = function(element) {
        items.push(element);
    };

    this.pop = function() {
        return items.pop();
    };

    this.peek = function() {
        return items[items.length-1]
    };

    this.isEmpty = function() {
        return items.length === 0;
    };

    this.size = function() {
        return items.length;
    };

    this.print = function() {
        console.log(items.toString());
    };

    this.clear = function() {
        items = [];
    };
}