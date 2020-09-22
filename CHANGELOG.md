## V1.0.0 (2020-09-22)
- 添加`mAjax`、`md5`模块
- 百度统计模块添加配置项hm_key：`lay-module/layuimini/miniTongji.js`配置项添加`hm_key`百度统计的key
- 页面版本号：`lay-module/layuimini/miniPage.js`配置项`renderPageVersion`改动为：  
  a) 如果是具体的字符串，则用该字符串；  
  b) 如果是true，则用时间戳；  
  c) 如果是false，则为false;
- 初始化接口返回格式修改：`lay-module/layuimini/miniAdmin.js`的`render`方法`init`请求返回格式见[init.json](./api/init.json)
- 修改`./api/`接口的默认`code`为0，可在`miniAdmin`的`render`配置项设置
- `miniAdmin`模块添加登录校验、成功状态校验
- 其它细节