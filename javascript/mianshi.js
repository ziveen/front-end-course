//找出字符串中出现最多的字符以及次数
var str = 'sdgsgjsgjjsgklfsfhf';
function strAndNum(str) {
    if(typeof str !== 'string') return
    var obj = {};
    var maxLength = 0;
    var maxStr = '';
    for(var i = 0;i<str.length;i++) {
        var chart = str.charAt(i);
        if(obj[chart]) {
            obj[chart]++
        } else {
            obj[chart] = 1
        }
    }
    //遍历找出使用最多的字符串及次数
    for(var prop in obj) {
        if(obj[prop] > maxLength) {
            maxLength = obj[prop]
            maxStr = prop
        }
    }
    console.log(maxStr + "---" + maxLength)
}

//多维数组转化为一纬数组 排序 去重
var arr = [4,4,[3,[1]],2];
function splitArr (array) {
    if(! Array.isArray(array)) return
    var newArr = [];
    newArr = array.join(",").split(',');
    newArr =  newArr.map(item => {
        return Number(item)
    });
    return [... new Set(newArr.sort())]
}
