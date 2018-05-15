/**
 * 对象的浅复制,Object.assign()
 */

 function shadowCopy(obj) {
     if(typeof obj !== 'object') return
     var newObj
     if(obj.constructor === Array) {
         newObj = [];
     } else  {
        newObj = {}
        newObj.constructor = obj.constructor;
     }
     for(var prop in obj) {
         newObj[prop] = obj[prop]
     }
     return newObj
 }

 /**
  * 对象的深复制
  * 对象的浅复制方法只能复制只能进行一层复制，若对象多层嵌套，则需要进行深复制
  */

  function deepCopy(obj) {
      if(typeof obj !== 'object') return
      var newObj = typeof obj === 'Array' ? [] : {};
      newObj.constructor = obj.constructor;
      /**
       * 如果支持JSON方法（缺点：对undefined值过滤）
       */
      if(window.JSON) {
        newObj = JSON.parse(JSON.stringify(obj));
      } else {
          for(var prop in obj) {
              if(obj[prop].constructor === 'object') {
                  if(obj[prop] === 'RegExp' || obj[prop].constructor === 'Date') {
                     newObj[prop] = obj[prop]
                  } else {
                    newObj[prop] = deepCopy(obj[prop])
                  }
              } else {
                  newObj[prop] = obj[prop]
              }
          }
      }
  }