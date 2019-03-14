/**
 * @param {Object}  actual 当前对象
 * @param {Object} target 比较对象
 * @returns {boolean} 返回比较结果
 * @description 比较两个对象的值是否相等，eg: {name: 1}与{name:1}比较返回true
 */

 function looseEqual(actual,target) {
    if(actual === target) {
        return true
    }
    
     if(actual === null || typeof actual !== 'object'){
         if(actual === null || typeof target !== 'object') {
             return actual === target
         }
         return false
     }

     var var1Tag = Object.prototype.toString.call(actual);
     var val2Tag = Object.prototype.toString.call(target);
     
     // 判断数据类型
     if(var1Tag !== val2Tag) {
         return false
     }

     if(var1Tag === '[object Object]') {
         return keyCheck(actual,target)
     } else if(actual instanceof(Date)) {
        return actual.getTime() === target.getTime()
     } else if(Array.isArray(actual)) {
        return actual.length&&target.length&&actual.every((k,i) => {
            return looseEqual(actual[i],target[i])
        })
     } else if(var1Tag === '[object RegExp]'){
        if(actual.source === target.source && actual.flag === target.flag){
            return true
        }
     } else {
         return false
     }
 }

 /**
  * @description 比较两个对象的key值
  */

 function keyCheck(val1,val2) {
     const aKeys = Object.keys(val1);
     const bKeys = Object.keys(val2);

     if(aKeys.length !== bKeys.length) {
         return false
     }

     for(let i =0;i<aKeys.length;i++){
         var key = aKeys[i];
         if(!val2.hasOwnProperty(key)) {
             return false
         }
     }

     // symbol值是唯一的，应该排除
     const symbolKeys2 = Object.getOwnPropertySymbols(val2);
     if(symbolKeys2.length !=0 && getEnumerables(val2,symbolKeys2).length != 0) {
         return false
     }

     if(aKeys.length === 0 ){
         return true
     }

     return aKeys.every(key =>{
        return looseEqual(val1[key],val2[key])
     })
 }

 function getEnumerables(val,keys) {
    return keys.filter(key => Object.prototype.propertyIsEnumerable(val,key))
 }
