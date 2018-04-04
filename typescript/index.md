## typescript踩坑

1. 使用typescript引入图片，如果要使用import方式，需要新增`.d.ts`文件，具体如下：
```javascript
  declare module "*.png" {
    const value: string;
    export default value;
  }
```
然后就可以在对用的文件引用`import image from 'a.png`