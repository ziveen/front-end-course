## Nodejs学习笔记

### 文件操作模块

<h3 style="color:red;font-weight:bold">读文件</h3>

```javascript
fs.readFile(filename,[options],callback)
var data = fs.readFileSync(filename,[options])
```
> options参数:
- flag属性:
    - r:读取文件
    - r+:读取并写入文件
    - rs:以同步方式读取文件并通知操作系统忽略本地文件系统缓存,如果文件不存在则抛出异常
    - w:写入文件.如果不存在则新建文件,如果存在则清空文件内容
    - wx:写入文件,以排他的方式写入文件
    - w+:读取并写入文件
    - wx+:与wx功能类似,但是以排他的方式打开文件
    - a:追加文件,如果文件不存在则新建文件
    - ax:与a相似,但是以排他的方式写入文件
    - a+:读取并追加写入文件,如果文件不存在则新建文件
    - ax+:与a+功能类似,但是以排他的方式打开文件
- 编码格式
    - utf8
    - ascii
    - base64s
> 回调参数
```function (err,data) {}```

<h3 style="color:red;font-weight:bold">写入文件</h3>

```javascript
fs.writeFile(filename,data,[options],callback)
fs.writeFileSync(filename,data,[options])
```
> options属性:
- flag属性:
- mode属性
    - 1:执行权限
    - 2:写权限
    - 4:读权限
- encoding属性
> 回调函数
```function(err) {}```

<h3 style="color:red;font-weight:bold">追加文件</h3>

```javascript
fs.appendFile(filename,data,[options],callback)
fs.appendFileSync(filename,data,[options])
```

<h3 style="color:red;font-weight:bold">从指定位置开始读写文件</h3>

```javascript
//打开文件
fs.open(filename,flags,[mode],callback)
```

> 打开文件(fs.open)的回调函数
```function(err,fd){}```

```javascript
//从指定位置读取文件
fs.read(fd,buffer,offset,length,position,callback)
fs.readSync(fd,buffer,offset,length,position)
```
- buffer:Buffer对象,指定文件读取到那个缓存区
- offset:指定向缓存区写入文件的开始位置
- length:读取的长度
- position:读取文件的开始长度
- callback: ```function(err,bytes,buffer){}```

eg:
 ```javascript
var fs = require('fs')
fs.open('./message.txt','r',(err,fd) => {
    var buf = new Buffer(255);
    fs.read(fd,0,9,3,(err,bytes,buffer) => {
        console.log(buffer.slice(0,bytes).toString())
    })
})
```

```javascript
//从指定位置写入文件
fs.write(fd,buffer,offset,length,position,callback)
fs.writeSync(fd,buffer,offset,length,position)
```

```
//关闭文件
fs.close(fd,[callback])
```
> 在使用write方法或者writeSync方法写入文件时,操作系统的做法是先将该部分数据读取到内存中,再把数据写到文件中,数据读取完并不代表数据已经写完,因为可能有一部分数据在内存缓冲区中.如果使用close方法,可能这部分数据会丢失.我们可以使用```fsync```方法对文件进行同步操作,将内存缓冲区中的剩余数据全部写入文件. 

```javascript
 fs.fsync(fd,[callback])
```

eg:
```javascript
var fs = require('fs')
var buf = new Buffer("我爱前端!");
fs.open('./message.txt','r',(err,fd) => {
    fs.write(fd,0,9,3,(err,written,buffer) => {
        fs.fsync(fd);
        fs.close(fd);
    })
})
```

<h3 style="color:red;font-weight:bold">创建读取目录</h3>

```javascript
fs.mkdir(path,[mode],callback)
```
> 参数
- path: 路径
- mode:该目录的权限,默认:0777(任何人可读写该目录)
- callback: ```function(err) {}```

```javascript
//读取目录
fs.readdir(path,callback)
```

> 回调函数

```
//files表示读取到目录的数组
function(errr,files) {}
```
<h3 style="color:red;font-weight:bold">查看与修改文件或目录的信息</h3>

#### 查看文件或目录的信息

> 在fs模块中,可以使用stat或lstat查看文件或目录的信息.唯一的区别是当查看符号连接文件时,必须使用lstat.
```javascript
fs.stat(path,callback)
fs.lstat(path,callback)

```
> 回调函数 ```function(err,stats){}```,stats返回的是一个fs.Stats对象,该对象拥有下面的方法:

- isFile:判断查看的对象是不是文件
- isDirectory:判断查看的对象是不是目录
- isBlockDevice:判断查看的文件是不是设备连接
- isCharacterDevice: 判断查看的文件是不是符号设备文件
- isSymbolicLink:用于判断查看的文件是不是一个符号连接文件
- isFIFO:用于判断查看的文件是不是FIFO文件
- isSocket:用于判断查看的文件是不是socket文件
- size:文件尺寸
- atime:文件的访问时间
- mtiem:文件的修改时间
- ctime:文件的创建时间

#### 文件或目录是否存在

```javascript
//如果存在回调参数的参数exist为true
fs.exists(path,function(exist){})
```
#### 获取文件文件夹或文件的绝对路径

```javascript
//cache放预定设好的路径
fs.realpth(path,[cache],function(err,resolvePath){})

var cache = {'/etc':'/private/etc'};
fs.realpath('/etc/index',cache,function(err,resolvePath){})
```
#### 获取文件文件夹或文件的访问权限

```javascript
fs.chmod(path,mode,function(err){})

```

#### 监控文件或目录

```javascript
fs.watchFile(filename,[options],function(curr,prev){})
//对文件或目录的监控
fs.watch(fileame,[options],[listener])

```
> 参数
- curr:改值为一个fs.Stats对象,表示修改后的文件
- prev:改值为一个fs.Stats对象,表示修改之前的文件


### 文件流

> 流:流是一组有序 有起点  有终点的字节数据的输出手段

<b style="text-align:center;">fs模块读取文件的区别</b>

|用途 | 使用异步方式|使用同步方式|
- | :-: | -:
| 将文件完整读入缓冲区      |  readFile | readFileSunc|
| 将文件部分读入缓冲区      |  read     | readSunc     |
| 将文件完整写入缓冲区      |  writeFile| writeFileSunc|
| 将缓冲区文件部分写入缓冲区 | write     | writeSunc    |

<hr/>
<p style="text-indent:2em;">
    readFile在读取文件时,Nodejs先是将文件完整读入缓存区,再从缓存区中读取文件.writeFile写入文件时,Nodejs先将文件完整读入缓存区,然后一次性写入到文件.
</p>
<p style="text-indent:2em;">
    使用read方法读取文件内容时,Nodejs将文件一小块一小块读入缓存区,最后从缓存区读取文件内容.Nodejs执行下面过程:①将要书写的内容读入内存缓冲区②待缓冲区写满后,再将缓冲区的内容写入文件③反复执行①②步操作
</p>

```javascript
fs.createReadStream(path,[options])
```
> options参数
- flags
- encoding
- autoClose: 默认true
- start:开始读取位置
- end:结束读取位置

eg:
```javascript
var fs = require('fs')
var file = fs.createReadFile('./message.txt',{start:3,end:12});
file.on('open',function(fd) {
    console.log('开始读取文件')
})
file.on('data',function(data){
    console.log(data)
})
file.on('end',function(){
    console.log("文件读取完成")
})
file.on('close',function(){
    console.log("文件关闭")
})
file.on('error',function(err){
    console.log(err)
})
```

```javascript
fs.createWriteStream(path,[options])
```
> writeStream具有一个write方法,将书记刘写入目标对象
>> `writeable.write(chunk,[encoding],[callback])`