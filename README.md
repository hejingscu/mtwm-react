### 命令
```bash
$ npm run build                 # Build
$ npm run pro                   # Launch dist, Listening at http://localhost:9200
$ npm run lint                  # Launch eslint
```

### 待解决问题
```bash
1.最大的问题，登录token的存取和身份验证。否则无法下单，查询个人信息（包括订单、购物车）
```

### 已解决问题
```bash
1.swiper最后一张回到第一张时的bug（生命周期问题，需在拿到数据后才能创建swiper实例）
2.店铺内的购物车样式问题：ios position:fixed  要给left默认值：0
```

### 联动项目
```bash
https://github.com/hejingscu/mtwm（提供1.管理端界面（admin） 2.数据接口支持（server） 3.与本项目相同的vue版本）
```
