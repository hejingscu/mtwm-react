### 命令
```bash
npm run build                 # 开发模式
npm run build                 # 打包
```

### 待解决问题
```bash
1.shopList组件代码优化
```

### 已解决问题
```bash
1.swiper最后一张回到第一张时的bug（生命周期问题，需在拿到数据后才能创建swiper实例）
2.店铺内的购物车样式问题：ios position:fixed  要给left默认值：0
```

### 联动项目
```bash
https://github.com/hejingscu/mtwm（提供1.管理端界面（admin） 2.数据接口支持（server） 3.与本项目相同的vue版本(暂不维护)）
```

# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 环境参数配置
├── dist                                        // 打包文件输出目录
├── src                                         // 源码目录
│   ├── action                                  // redux action
│   ├── api                                     // 所有接口请求
│   ├── common                                  // router store配置
│   ├── components                              // 组件&页面
│   │   ├── common                              // 公共组件
│   │   ├── shop                                // 店铺页面
│   ├── img                                     // 所有图片
│   ├── reducers                                // redux reducers
│   ├── App.scss                                // 全局样式
│   ├── page.scss                               // 页面样式
│   ├── component.scss                          // 组件样式
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件

```
