
# 小程序云开发

## 全局配置

### tabBar设置

#### 图标引入

图标文件目录：`miniprogram/images`

#### 更改 app.json 配置

来到 `miniprogram/app.json` 文件，将 "pages" 列表下的值替换为四个 tabBar 页面：

```json
"pages": [
  "pages/home/home",
  "pages/order/order",
  "pages/cart/cart",
  "pages/me/me"
],
```

保存后会自动在 `miniprogram/pages` 目录下生产四个文件夹，删除无用文件夹，只留上述4个新建文件夹。

`"window"` 下修改小程序顶部显示名称：`"navigationBarTitleText": "商城",` 其他属性不变。然后在 `"window"` 后追加如下代码：

```json
  "window": {
    ...
  },
  "tabBar": {
    "color": "#5D5F64",
    "selectedColor": "#5D5F64",
    "backgroundColor": "#fff",
    "position": "bottom",
    "borderStyle": "white",
    "list": [
      {
        "text": "Home",
        "pagePath": "pages/home/home",
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home-sel.png"
      },
      {
        "text": "Order",
        "pagePath": "pages/order/order",
        "iconPath": "images/order.png",
        "selectedIconPath": "images/order-sel.png"
      },
      {
        "text": "Cart",
        "pagePath": "pages/cart/cart",
        "iconPath": "images/cart.png",
        "selectedIconPath": "images/cart-sel.png"
      },
      {
        "text": "Me",
        "pagePath": "pages/me/me",
        "iconPath": "images/me.png",
        "selectedIconPath": "images/me-sel.png"
      }
    ]
  }
```

#### 重置 app.wxss 整体样式

覆盖 `miniprogram/app.wxss` 下整体样式：

```css
/**app.wxss**/
page {
  padding-bottom: 30rpx;
  background: #f9f9f9;
}

.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 144rpx;
  z-index: -1;
}
```

## 首页

### 首页UI

#### 虚拟数据

将虚拟数据放入到 `home.js` 中的 `data` 中：

```js
data: {
  productList: [{
    id: 1,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
    name: 'Wallet',
    price: 100,
    source: 'CHINA',
  }, {
    id: 2,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
    name: 'Guitar',
    price: 200,
    source: 'SWEDEN',
  }, {
    id: 3,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
    name: 'Stapler',
    price: 300,
    source: 'GERMANY',
  }, {
    id: 4,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
    name: 'Leafy vegetables',
    price: 400,
    source: 'NEW ZEALAND',
  }, {
    id: 5,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product5.jpg',
    name: 'Compass',
    price: 500,
    source: 'USA',
  }], // Products List
},
```

#### 组件搭建

```html
<!--pages/home/home.wxml-->
<!-- 背景图 -->
<image src='/images/bg.png' class='bg'></image>
<!-- 热门商品 -->
<navigator class='hot-card'>
  <view class='hot-name'>
    <image class='hot-name-line' src='/images/line-red.png'></image>
    <view class='hot-name-text'>{{productList[0].name}}</view>
    <view class='product-meta'>
      <view class='product-money'>$</view>
      <view class='product-price'>{{productList[0].price}}</view>
    </view>
    <image class='hot-name-line' src='/images/line-red.png'></image>
  </view>
  <image class='hot-info' src='/images/discount.png'></image>
  <image class='hot-image' src='{{productList[0].image}}'></image>
</navigator>

<!-- 标题 -->
<view class='list-title'>
  <image class='list-title-line' src='/images/line-black.png'></image>
  <view class='list-title-text'>Promotion</view>
  <image class='list-title-line' src='/images/line-black.png'></image>
</view>

<!-- 列表（从数组下标1开始，因为0已经作为热门商品占用了） -->
<!-- 两个一循环【1,2】【3,4】 -->
<!-- 第一行：index=1 => (1%2===1, 显示下标1和2) -->
<!-- 第二行：index=3 => (3%2===1, 显示下标3和4) -->
<!-- 以此类推... -->
<view class="product-row" wx:for='{{productList}}' wx:key='id' wx:if='{{index%2 === 1}}'>
  <navigator class='product-card' wx:for='{{[productList[index], productList[index+1]]}}' wx:key='id' wx:for-index='pindex' wx:for-item='pitem'>
    <image class='product-image' src='{{pitem.image}}' mode='widthFix'></image>
    <view class='product-name'>{{pitem.name}}</view>
    <view class='product-meta'>
      <view class='product-money'>$</view>
      <view class='product-price'>{{pitem.price}}</view>
    </view>
  </navigator>
</view>
```

#### 设置样式

将下面的样式代码复制到 `home.wxss` 中：

```css
/* pages/home/home.wxss */

.hot-card {
  position: relative;
  margin: 32rpx 52rpx 0;
  height: 326rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.hot-name {
  position: absolute;
  display: flex;
  align-items: center;
  left: 44rpx;
  top: 30rpx;
  width: 500rpx;
}

.hot-name-line {
  width: 24rpx;
  height: 39rpx;
}

.hot-price {
  flex: 1;
  margin: 0 10rpx;
  font-size: 40rpx;
  font-weight: bold;
  color: rgba(29, 29, 38, 0.8);
}

.hot-meta {
  display: flex;
  align-items: baseline;
  margin: 9rpx 21rpx 15rpx;
}

.hot-money {
  font-size: 25rpx;
}

.hot-name-text {
  margin: 0 20rpx;
  font-size: 28rpx;
  color: #34373D;
  font-weight: bold;
}

.hot-info {
  position: absolute;
  width: 259rpx;
  height: 188rpx;
  left: 42rpx;
  bottom: 0;
}

.hot-image {
  position: absolute;
  bottom: 0rpx;
  right: 50rpx;
  width: 240rpx;
  height:240rpx;
}

.list-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 90rpx 0 35rpx;
}

.list-title-line {
  width: 21rpx;
  height: 34rpx;
}

.list-title-text {
  margin: 0 20rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.product-row {
  display: flex;
  justify-content: space-around; 
  margin: 0 52rpx 28rpx;
}

.product-card {
  width:45%;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.product-card:first-child {
  margin-right: 27rpx;
}

.product-image {
  width: 100%;
  border-radius: 13rpx 13rpx 0 0;
}

.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 21rpx;
  font-size: 20rpx;
  color: rgba(29, 29, 38, 0.8);
  line-height: 40rpx;
}

.product-meta {
  display: flex;
  align-items: center;
  margin: 9rpx 21rpx 15rpx;
}

.product-money {
  font-size: 20rpx;
}

.product-add {
  font-size: 32rpx;
}

.product-price {
  flex: 1;
  margin: 0 10rpx;
  font-size: 28rpx;
}
```

### 上传资源到云存储

将 `miniprogram/images/products` 下的产品图片上传到云存储新建的「products」文件夹中。

### 上传数据库文件到云数据库

将 `data` 下的 `product.json` 导入到云数据库新建的「product」集合中：

```json
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product1.jpg",
  "name": "Toy Holster",
  "price": 132.00,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product2.jpg",
  "name": "Golden Acoustic Guitar",
  "price": 480.50,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product3.jpg",
  "name": "Red Iron Stapler",
  "price": 28.00,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product4.jpg",
  "name": "Fresh Organic Vegetables",
  "price": 30.90,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product5.jpg",
  "name": "Imitation Iron Plate Clock",
  "price": 45.00,
  "source": "SWEDEN"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product6.jpg",
  "name": "Fresh Grapes",
  "price": 24.80,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product7.jpg",
  "name": "Fruit and Vegetable Spree",
  "price": 158.00,
  "source": "NEW ZEALAND"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product8.jpg",
  "name": "Red Retro Car Model",
  "price": 35.00,
  "source": "GERMANY"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product9.jpg",
  "name": "Winding Electric Motorcycle",
  "price": 249.00,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product10.jpg",
  "name": "Red Apples",
  "price": 29.80,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product11.jpg",
  "name": "Durable Men's Shoes",
  "price": 335.00,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product12.jpg",
  "name": "Religious Place Tourism Memorial",
  "price": 1668.00,
  "source": "INDIA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product13.jpg",
  "name": "High Quality Pump",
  "price": 2000.80,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product14.jpg",
  "name": "King Kong Rings",
  "price": 34.00,
  "source": "CHINA"
}
{
  "image": "cloud://mall-jd5go.6d61-mall-jd5go/products/product15.jpg",
  "name": "Halloween Pumpkin",
  "price": 29.90,
  "source": "USA"
}
```

别忘了设置集合的权限为「所有用户可读，仅创建者可读写」。

### 读取云端数据库中真实数据

回到 `home.js` 文件，编写如下代码：

```js
// pages/home/home.js

// 连接数据库
const db = wx.cloud.database({
  env: 'mall-jd5go'
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // Products List
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList()
  },

  getProductList() {
    wx.showLoading({
      title: '正在加载...',
    })

    db.collection('product').get().then(result => {
      wx.hideLoading()
      const data = result.data
      data.forEach(v => v.price = parseFloat(Math.round(v.price * 100) / 100).toFixed(2))
      if (data.length > 0) {
        this.setData({
          productList: data
        })
      }
    }).catch(err => {
     console.log(err)
     wx.hideLoading()
    })
  },
})
```

## 商品详情页

### app.json 中配置详情页信息

首先来到 `miniprogram/app.json` 文件，配置详情页信息：

```json
"pages": [
  ...
  "pages/detail/detail"
],
```

### 添加编译模式

保存编译后开发者工具会自动帮我们创建好相应文件夹。

由于小程序按照 "pages" 数组中的页面顺序展示第一个页面，导致每次编译默认显示首页。为了方便调试，我们可以在开发者工具顶部的「普通编译」中新增条自定义编译条件，路径设置为 `pages/detail/detail` ，这样下次编译后默认展示的就是详情页了。

![添加编译模式](https://s3.cn-north-1.amazonaws.com.cn/u-img/eeaf1306-52cc-44de-93a7-c13d7c20a32f)

![detail](https://s3.cn-north-1.amazonaws.com.cn/u-img/afde9a4b-85e9-497b-a66f-2319fa5cfae7)

### 详情页模拟数据

```js
data: {
  product: {
    id: 2,
    image: 'https://product-1256088332.cos.ap-guangzhou.myqcloud.com/product2.jpg',
    name: 'Guitar',
    price: 480.50,
    source: 'SWEDEN'
  }
},
```

### 详情页html

```html
<!--pages/detail/detail.wxml-->
<!-- 产品顶部信息 -->
<view class="product-card">
  <image class="product-image" src="{{product.image}}" mode="widthFix"></image>
  <view class="product-name">{{product.name}}</view>
  <view class="product-source">{{product.source}}</view>
  <view class="product-meta">
    <view class="product-money">$</view>
    <view class="product-price">{{product.price}}</view>
  </view>
</view>

<!-- 更多详情 -->
<view class="info-card">
  <!-- 特性 -->
  <view class="advantage-list">
    <view class="advantage-item">
      <image class="advantage-icon" src="/images/check-yellow.png"></image>
      <view class="advantage-text">Free Return in 7 Days.</view>
    </view>
    <view class="advantage-item">
      <image class="advantage-icon" src="/images/check-yellow.png"></image>
      <view class="advantage-text">Get it within 24 Hours.</view>
    </view>
  </view>
  <!-- 评价 -->
  <view class="review-entry">
    <view class="review-btn">
      <view class="review-title">Reviews</view>
      <view class="review-count">{{1}} review(s)</view>
      <image class="review-arrow" src="/images/grey-arrow.png"></image>      
    </view>
    <view class='review-preview'>test</view>
  </view>

</view>

<!-- 添加公务车按钮 -->
<view class="opr-cnt">
  <view class="opr-cart">Add to Cart</view>
  <view class="opr-buy">Buy it Now</view>
</view>
```

### 详情页样式

```css
/* pages/detail/detail.wxss */
.product-card {
  padding-bottom: 15rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
}

.product-image {
  display: block;
  margin: 0 auto;
  width: 370rpx;
  height: 370rpx;
}

.product-name {
  margin: 42rpx 49rpx 0;
  font-size: 38rpx;
  line-height: 53rpx;
  color: rgba(29, 29, 38, 0.8);
  font-weight: bold;
}

.product-source {
  margin: 5rpx 49rpx 0;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #8B8B8B;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 29rpx;
}

.product-money {
  width: 47rpx;
  height: 47rpx;
  line-height: 47rpx;
  text-align: center;
  border-radius: 50%;
  color: #34373D;
  font-size: 34rpx;
  font-weight: bold;
}

.product-price {
  margin: 0 10rpx;
  font-size: 38rpx;
}

.info-card {
  margin: 26rpx 27rpx;
  padding: 0 26rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.advantage-list {
  padding: 43rpx 15rpx 39rpx;
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
}

.advantage-item {
  display: flex;
  align-items: center;
}

.advantage-icon {
  width: 22rpx;
  height: 16rpx;
}

.advantage-text {
  margin-left: 15rpx;
  font-size: 28rpx;
  color: #34373D;
  line-height: 47rpx;
}

.review-entry {
  padding: 26rpx 10rpx 21rpx;
}

.review-btn {
  display: flex;
  align-items: center;
}

.review-title {
  font-size: 30rpx;
  line-height: 42rpx;
  color: rgba(29, 29, 38, 0.8);
  font-weight: bold;
}

.review-count {
  flex: 1;
  margin-right: 16rpx;
  text-align: right;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #8B8B8B;
}

.review-arrow {
  width: 11rpx;
  height: 18rpx;
}

.review-preview {
  margin-top: 26rpx;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #8B8B8B;
}

.opr-cnt {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}

.opr-cart,
.opr-buy {
  flex: 1;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 30rpx;
  color: #34373D;
  font-weight: bold;
}

.opr-cart {
  background: rgba(245, 224, 105, 0.6);
}

.opr-buy {
  background: #F5E069;
}
```

### 设置详情页顶部标题

来到 `detail/detail.json` 文件中添加如下代码：

```json
{
  "navigationBarTitleText": "Detail"
}
```

这句代码告诉我们此页导航栏显示 "Detail" 的标题。如果没有这样一句代码，那么该页的导航显示和全局导航显示一致。就像我们在首页中，并没有设置这样的代码。一旦在每个页面中的 json 文件中加入这行代码，标题栏文字显示会覆盖全局的导航设置，所以详情页也这里会显示不同的导航标题。

### 如何声明和调用云函数

#### 声明云函数

在 `cloudfunctions` 下新建一个云函数 `add` ，删除入口函数中所有代码，修改为：

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event) 包含event和userInfo
  return event.a + event.b
}
```

修改完毕后记得右键此 `index.js` 文件选择「上传更新后的文件」。

#### 调用云函数

来到 `detail/detail.js` 文件，在 `onLoad` 函数中调用：

```js
onLoad: function (options) {
  wx.cloud.callFunction({
    name: 'test',
    data: {
      a: 2,
      b: 7
    },
    success(res) {
      console.log(res.result)
    }
  })
},
```

我们会看到打印结果为 9 。

#### 详情页数据请求和逻辑处理

首先将虚拟数据删掉。

然后进入 `onLoad(options)` 生命周期函数修改代码如下：

```js
onLoad: function (options) {
  this.getProductDetail(options.id)
},

getProductDetail(id) {
  wx.showLoading({
    title: '正在加载...',
  })

  wx.cloud.callFunction({
    name: 'productDetail',
    data: {
      id
    }
  }).then(result => {
    wx.hideLoading()
    const data = result.result

    if (data) {
      this.setData({
        product: data
      })
    } else {
      setTimeout(() => wx.navigateBack(), 2000)
    }
  }).catch(err => {
    console.log(err)
    wx.hideLoading()
    setTimeout(() => wx.navigateBack(), 2000)
  })
},
```

然后根据业务需求去声明云函数，在 `cloudfunctions` 下新建 `productDetail.js` 文件，代码如下：

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取 db 实例
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id

  const productRes = await db.collection('product').doc(id).get()
  const product = productRes.data
  return product
}
```

为了得到 `onLoad` 中 options 传入的 id 参数。我们需要返回 `home/home.wxml` 文件，为热点图板块的 `<navigator>` 添加 `url` 属性：

```js
url="/pages/detail/detail?id={{productList[0]._id}}"
```

为商品列表的 `<navigator>` 添加 `url` 属性：

```js
url="/pages/detail/detail?id={{pitem._id}}"
```

### 封装db函数和公共代码

在 `miniprogram` 文件夹下新建 `utils` 文件夹，创建两个文件：

- db.js 数据库调用方法集合
- util.js 公共方法集合（e.g. 价格保留两位）

> db.js

```js
const db = wx.cloud.database({
  env: 'test-e90305'
})

module.exports = {
  getProductList() {
    return db.collection('product').get()
  },

  getProductDetail(id) {
    return wx.cloud.callFunction({
      name: 'productDetail',
      data: {
        id: id
      },
    })
  },
}
```

> util.js

```js
module.exports = {
  priceFormat(price) {
    return parseFloat(Math.round(price * 100) / 100).toFixed(2)
  }
}
```

#### 修改对应文件代码

> home.js

```js
// pages/home/home.js
const db = require('../../utils/db.js')
const util = require('../../utils/util.js')
Page({
  ...
  getProductList() {
    ...
    db.getProductList().then(result => {
      wx.hideLoading()
      const data = result.data
      data.forEach(v => v.price = util.priceFormat(v.price))
      ...
    })
  },
  ...
})
```

> detail.js

```js
// pages/detail/detail.js
const db = require('../../utils/db.js')
Page({
  ...
  onLoad: function (options) {
    this.getProductDetail(options.id)
  },
  getProductDetail(id) {
    ...
    db.getProductDetail(id).then(result => {
      ...
    })
  },
})
```

## 个人中心

### 未登录状态展示的内容

利用条件渲染的方式，通过判断 `me.js`中 `data` 的 `userInfo` 来决定展示什么样的页面，是登陆页面，还是展示个人信息的页面。

判断逻辑：

```js
<image class="bg" src="/images/bg.png"></image>

<view wx:if="{{!userInfo}}">
</view>

<view class="user-card" wx:else>
</view>
```

在 `me.js` 中初始化 userInfo：

```js
data: {
  userInfo: null,
},
```

登录页面主要有两部分组成。一个是信息区，另一个为按钮。信息区又分为头像区域和文字提示区域。文字提示区域又分为标题和描述两部分:

```html
<view wx:if="{{!userInfo}}">
  <view class="login-card">
    <view class="login-head"></view>
    <view class="login-info">
      <view class="login-text">Not Login</view>
      <view class="login-tips">Click "Login" with WeChat account to shop</view>
    </view>
  </view>
  <button class="login-btn">Login</button>
</view>
```

在 `me.wxss` 中填入样式：

```css
.login-card {
  display: flex;
  align-items: center;
  margin: 50rpx 27rpx 0;
  height: 200rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.login-head {
  flex-shrink: 0;
  margin-left: 53rpx;
  height: 100rpx;
  width: 100rpx;
  background: #F5E069;
  border-radius: 50%;
}

.login-info {
  flex: 1;
  margin-left: 31rpx;
}

.login-text {
  line-height: 48rpx;
  font-size: 34rpx;
  color: rgba(29, 29, 38, 0.8);
  font-weight: bold;
}

.login-tips {
  margin-top: 6rpx;
  line-height: 33rpx;
  font-size: 24rpx;
  color: #8B8B8B;
}

.login-btn {
  margin: 34rpx auto 0;
  width: 250rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: #F5E069;
  outline: none;
  border: none;
  border-radius: 10rpx;
  font-size: 30rpx;
  text-align: center;
  color: #34373D;
  font-weight: bold;
}

.login-btn::after {
  border: none;
}
```

最后在 `me.json` 中加入标题栏：

```json
{
  "navigationBarTitleText": "Me"
}
```

### 如何获取用户信息

#### 点击 button 获取用户信息

微信小程序的 `button` 按钮附加了很多开发功能。通过设置 `open-type` 属性为 `getUserInfo` 来实现获取用户信息的功能。

在这一功能触发之后，小程序会自动为用户弹出授权提示窗口，以便在用户授权后方可以跳转到登录后的页面。如果用户拒绝授权，用户看到的任然是之前的登录页面。

用户授权之后我们如何获取用户信息呢？我们可以在 `button` 加入属性 `bindgetuserinfo="onTapLogin">` 来设置事件来获取用户信息并更新我们的数据。综上，我们完善 `buttton` 组件的设置。

```html
<button class="login-btn" open-type="getUserInfo" bindgetuserinfo="onTapLogin">Login</button>
```

在 `me.js` 中添加：

```
onTapLogin(event) {
  this.setData({
    userInfo: event.detail.userInfo
  })
},
```

`userInfo`我们可以通过 `console.log` 打印出来它的信息。里面有用户昵、头像、城市、省会、性别等一系列的个人信息。

### 已登录所展示的内容

个人中心页面由两部分组成。第一部分为用户的微信头像与昵称，第二部分为用户的收货地址与售后联系方式。

其代码如下：

```html
<view class="user-info">
  <image class="user-head" src="{{userInfo.avatarUrl}}"></image>
  <view class="user-name">{{userInfo.nickName}}</view>
</view>
<view class="user-split"></view>
<view class="user-options">
  <view class="option" bindtap="onTapAddress">
    <view class="option-title">Your Addresses</view>
    <image class="option-arrow" src="/images/grey-arrow.png"></image>
  </view>
  <view class="option" bindtap="onTapService">
    <view class="option-title">Contact Customer Service</view>
    <image class="option-arrow" src="/images/grey-arrow.png"></image>
  </view>
</view>
```

我们在微信头像和微信昵称中，需要绑定 `userInfo` 中不同的数据。 而在收货地址和联系方式中我们需要设定两个事件。

同样，我们将其使用到的样式添加到 `me.wxss` 中。

```css
.user-card {
  margin: 50rpx 27rpx 0;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.user-info {
  display: flex;
  align-items: center;
  height: 200rpx;
}

.user-head {
  flex-shrink: 0;
  margin-left: 53rpx;
  height: 100rpx;
  width: 100rpx;
  background: #F5E069;
  border-radius: 50%;
}

.user-name {
  flex: 1;
  margin: 0 31rpx;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-split {
  height: 8rpx;
  background: #F9F9F9;
}

.user-options .option {
  display: flex;
  align-items: center;
  margin-left: 46rpx;
  margin-right: 27rpx;
  height: 128rpx;
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
}

.user-options .option:last-child {
  border-bottom: none;
}

.user-options .option-title {
  flex: 1;
  font-size: 30rpx;
  color: rgba(29, 29, 38, 0.8);
}

.user-options .option-arrow {
  width: 11rpx;
  height: 18rpx;
}
```

#### 弹窗提醒功能

利用微信的 API 接口 `wx.showToast` 设置两个提示告诉用户，此功能暂时未开放，请耐心等待。来到 `me.js` 中，来定义两个事件。

```js
onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: 'This function is not open yet.'
    })
  },

  onTapService() {
    wx.showToast({
      icon: 'none',
      title: 'This function is not open yet.'
    })
  }
```

其中我们的 `wx.showToast` 图标设置为空，标题告诉用户现在功能暂未开放。

### 检查用户授权信息

目前每当进行重新编译切换到个人中心页面时，都需要点击登录小程序按钮才可以获取我们的信息，这样的用户体验可不好。

我们更希望用户在第一次点击微信账号登录并同意授权后，后面的几次重新编译进入个人中心页面时，无需再登录。系统会自动找到用户信息并进行自动跳转，从未登录状态跳转到登陆之后的个人中心页面。

从我们现在的代码来看，当进入到小程序后，只有触发了 `onTapLogin` 事件，页面才会进行授权弹窗、获取用户信息等操作。

首先，想加入一项功能：系统在到登录页面后，先检查一下我们的授权信息，如果用户的授权信息已经显示被同意，那我们直接获取用户的昵称和头像，无需需要触发点击登录按钮实现。

我们认为这样的一个检查授权并获取用户信息的功能可以在其他页面中进行复用，所以将这一功能实现放在了 `utils/util.js` 中。在 `module.exports` 下再加入一个功能：

```js
getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === false) {
            // 已拒绝授权
            reject()
          } else {
            wx.getUserInfo({
              success(res) {
                const userInfo = res.userInfo
                resolve(userInfo)
              }
            })
          }
        }
      })
    })
  },
```

先调用微信的设置接口，并在调用成功后判断授权信息。如果显示 `"false"`，无授权，暂时不做任何处理；如果授权信息显示 `"true"`，代表用户同意授权个人信息，那么就去获取用户信息。获取信息成功后，进行用户信息的赋值，并返回。

```js
const util = require('../../utils/util')
```

然后在 `onShow` 中添加：

```js
onShow: function {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
  },
```

在不清除缓存的情况下，重新编译看看效果。

当进入到个人页面时会发现，页面刚开始在未登录的状态停留了一些时间，然后就切换到了登陆之后的个人中心页面。

提示：`onShow` 生命周期函数表示页面被打开时触发的功能，`onLoad` 函数表示页面在加载时触发的功能。也就是说，前者在页面加载、反复打开的过程中，会触发多次。而后者则只会被触发一次。更多的区别请查看 [文档](https://developers.weixin.qq.com/miniprogram/en/dev/framework/app-service/page.html)。

### 组定义组件

首先在 `miniprogram` 中新建一个 `components` 目录，然后创建 `login` 目录。鼠标右键这个目录可以看见 "New Component" 选项，选择该选项，输入 component 的名字 `login` ,微信开发者工具会帮我们创建好一个 Component 所需要的文件（js, json, wxml, wxss）。

然后在 `me.json` 文件里在 `”usingComponents”` 属性里提供自定义组件的标签名 (`“login”`) 和对应的自定义组件文件路径 (“/components/login/login”)。

```json
{
  "navigationBarTitleText": "Me",
  "usingComponents": {
    "login": "/components/login/login"
  }
}
```

在 `me.wxml` 里像引用基础组件一样使用自定义组件。节点名即自定义组件的标签名。(删除掉之前的内容)

```html
<view wx:if="{{!userInfo}}">
  <login></login>
</view>
```

现在我们来丰富 `login` 的内容，将登录页面的代码从 `me.wxml` 中删除了的代码粘贴到 `login.wxml` 里。

```html
<view class="login-card">
  <view class="login-head"></view>
  <view class="login-info">
    <view class="login-text">Not Login</view>
    <view class="login-tips">Click "Login" with WeChat account to shop</view>
  </view>
</view>
<button class="login-btn" open-type="getUserInfo" bindgetuserinfo="onTapLogin">Login</button>
```

在 个人中心 页面中，根据 `userInfo` 来判断用户是否登录，而现在获取 `userInfo` 的 `<button>`在 `login` 里。所以需要把 `userInfo` 从 `login` 传递到 个人中心页面 里，这就用到了组件 `triggerEvent` 方法。找到 `login.js` 模板下的 `methods` 填入以下代码。

```js
 methods: {
    onTapLogin(event) {
      const loginDetail = {
        userInfo: event.detail.userInfo
      } // detail object, Provided to the event listener function

      this.triggerEvent('onLogin', loginDetail)
    },
  }
```

在回调函数 `onTapLogin` 里，我们把 `userInfo` 存到 `loginDetail` 中，并调用 `this.triggerEvent` 把 `loginDetail` 传递给 `onLogin` 函数。`onLogin` 函数的作用就是拿到 `userInfo`。

要想监听 `onLogin`，我们就需要 `bindonLogin` 属性，因此回到 `me.wxml`，在 `<login></login>` 里添加这一属性。

```
<view wx:if="{{!userInfo}}">
  <login bindonLogin="onTapLogin"></login>
</view>
```

这样，当 `login` 里 `onLogin` 这个事件被触发的时候，`Me` 页面里的 `bindonLogin` 就监听到事件并调用了 `onTapLogin`。`UserInfo` 也就被传递到了 `Me` 里。

更多详情请查阅 [Inter-component communication and events 文档](https://developers.weixin.qq.com/miniprogram/en/dev/framework/custom-component/events.html?t=19021321)

最后，删除 `me.wxml` 中注释的部分删除，并将与登录页面相关的样式进行剪切，粘贴到 `login.wxss` 里。

```css
.login-card {
  display: flex;
  align-items: center;
  margin: 50rpx 27rpx 0;
  height: 200rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.login-head {
  flex-shrink: 0;
  margin-left: 53rpx;
  height: 100rpx;
  width: 100rpx;
  background: #F5E069;
  border-radius: 50%;
}

.login-info {
  flex: 1;
  margin-left: 31rpx;
}

.login-text {
  line-height: 48rpx;
  font-size: 34rpx;
  color: rgba(29, 29, 38, 0.8);
  font-weight: bold;
}

.login-tips {
  margin-top: 6rpx;
  line-height: 33rpx;
  font-size: 24rpx;
  color: #8B8B8B;
}

.login-btn {
  margin: 34rpx auto 0;
  width: 250rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: #F5E069;
  outline: none;
  border: none;
  border-radius: 10rpx;
  font-size: 30rpx;
  text-align: center;
  color: #34373D;
  font-weight: bold;
}

.login-btn::after {
  border: none;
}
```

最后，清除缓存，重新编译，看看进入个人中心页面和未登录的状态是否一样？

### 登录组件复用

订单和购物车页面同样需要登录组件的复用。

以订单的页面为例，我们首先在 `order.json` 中设置 `usingComponents`：

```json
{
  "navigationBarTitleText": "Order",
  "usingComponents": {
    "login": "/components/login/login"
  }
}
```

然后同样在order.wxml里引用。

```html
<view wx:if="{{!userInfo}}">
  <login bindonLogin="onTapLogin"></login>
</view>
```

之后，我们来到 `order.js` 文件中，复制下列代码。

```js
// pages/order/order.js
const util = require('../../utils/util')

Page({
/**
* Page initial data
*/
data: {
  userInfo: null,
},

onShow() {
  util.getUserInfo().then(userInfo => {
    this.setData({
    userInfo
    })
  })
},

onTapLogin(event) {
  this.setData({
    userInfo: event.detail.userInfo
  })
},
```

这里，我们只复制 `onShow` 生命周期函数，和 `onTapLogin` 事件。

这样简单的订单页面复用就完成啦！

## 订单页面

### 无订单的订单页面

通过判断订单列表的长度来决定是否展现无订单的订单页面。所以需要在 `order.js` 中绑定这个数据，并赋值为空。

```js
data: {
  userInfo: null,
  orderList: []
},
```

来到 `order.wxml` 中，首先删除：

```html
<view wx:else>
  <text>pages/order/order.wxml</text>
</view>
```

然后输入：

```html
<view class="order-empty" wx:elif="{{orderList.length === 0}}">
  <image class="empty-image" src="/images/order.png"></image>
  <view class="empty-text">You don't have any order yet.</view>
</view>
```

最后在 `order.wxss` 中输入：

```css
.order-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 37rpx 27rpx;
  height: 431rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.empty-image {
  margin-bottom: 29rpx;
  width: 90rpx;
  height: 90rpx;
  opacity: 0.4;
}

.empty-text {
  font-size: 28rpx;
  line-height: 40rpx;
  color: rgba(139, 139, 139, 0.8);
}
```

### 有订单的订单页面

如果有订单的情况下，订单列表的长度就要大于 0 ！我们在 `order.js` 中 填入虚拟数据：

```js
orderList: [{
    id: 0,
    productList: [{
      count: 1,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
      name: 'Product 1',
      price: "50.50",
    }]
  },
  {
    id: 1,
    productList: [{
        count: 1,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
        name: 'Product 2',
        price:  "40.10",
      },
      {
        count: 1,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
        name: 'Product 3',
        price: "30.50",
      }
    ]
  },
  {
    id: 2,
    productList: [{
      count: 2,
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
      name: 'Product 4',
      price: "70.40",
    }]
  }
],
```

注意，这里一共添加了三个订单。第一个订单和第三个订单只有一件商品，数量分别为 1 和 2。而第二个订单中有两种不同的商品。

我们希望不同订单间的间距比较大，而同一订单不同商品之间是用一条横线代替的。思路是建立两个列表渲染。首先，循环每一个订单，然后在每个订单中循环每一件商品。最后 在每一件商品中去填写各种元素。

```html
<view wx:else>

  <view class="order-head">
    <image class="order-head-line" src="/images/line-black.png"></image>
    <view class="order-head-text">Completed</view>
  </view>

  <view class="order-block" wx:for="{{orderList}}" wx:for-item="block" wx:key="id">

    <view class="order-card" wx:for="{{block.productList}}" wx:key="name">
      <image class="order-image" mode="widthFix" src="{{item.image}}"></image>

      <view class="order-info">
        <view class="order-name">{{item.name}}</view>
        <view class="order-price">$ {{item.price}}</view>
      </view>

      <view class="order-opr">
        <view class="order-btn">Reviews</view>
        <view class="order-count">x{{item.count}}</view>
      </view>

    </view>

  </view>
</view>
```

添加样式：

```css
.order-head {
  display: flex;
  align-items: center;
  padding: 26rpx 29rpx 14rpx;
}

.order-head-line {
  width: 21rpx;
  height: 34rpx;
}

.order-head-text {
  margin-left: 10rpx;
  font-size: 24rpx;
  line-height: 33rpx;
  color: rgba(52, 55, 61, 0.8);
}

.order-block {
  margin: 0 26rpx 26rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.order-card {
  display: flex;
  align-items: center;
  margin-left: 20rpx;
  margin-right: 20rpx;
  height: 200rpx;
  border-bottom: 1rpx solid rgba(151, 151, 151, 0.2);
}

.order-card:last-child {
  border-bottom: none;
}

.order-image {
  flex-shrink: 0;
  width: 160rpx;
  height: 160rpx;
}

.order-info {
  flex: 1;
  padding: 27rpx;
  height: 100%;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 40rpx;
}

.order-name {
  color: rgba(29, 29, 38, 0.8);
}

.order-price {
  margin-top: 12rpx;
  font-weight: bold;
}

.order-opr {
  flex-shrink: 0;
  margin-left: 59rpx;
  padding-top: 34rpx;
  height: 100%;
  box-sizing: border-box;
  font-size: 28rpx;
}

.order-btn {
  width: 140rpx;
  height: 52rpx;
  line-height: 52rpx;
  background: #F5E069;
  border-radius: 8rpx;
  text-align: center;
}

.order-count {
  margin-top: 49rpx;
  line-height: 40rpx;
  font-weight: bold;
  text-align: right;
}
```

这里注意，对于每一个订单卡片设置 `border-bottom`。但是只有在每一个卡片中的最后一个元素时，这条边界线消失。这里用 `last-child` 来表示。

```css
.order-card:last-child {
  border-bottom: none;
}
```

重新编译。这样，我们就完成了订单页面的的组件搭建。

### 回到商品详情页的立即购买

首先，在 `detail.wxml` 中绑定事件 `bindtap="buy"`

然后，来到 `detail.js` 中，定义 `buy` 事件。

在 `getProductDetail(id) {... },` 下方我们来输入：

```js
buy() {

}
```

在函数体中，首先给出页面提示：

```js
wx.showLoading({
  title: 'Purchasing...',
})
```

之后，我们输入：

```js
const productToBuy = Object.assign({
  count: 1
}, this.data.product)
```

这里，我们定义了 `productToBuy` 变量，并且将 `this.data.product` 中的值赋给这个变量。之后判断`this.data.product` 中是否存在 `count`。如果有，则不改变 `count` 取值。但是如果没有，建立这个属性并赋值为 1。具体 `Object.assign` 请看 [文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

之后，为了更好地便于理解，我们将 `productToBuy._id` 复制给新建的属性 `productToBuy.productId` 。

```js
productToBuy.productId = productToBuy._id
```

然后，调用 `utils/db.js` 中的加入订单函数：

```js
db.addToOrder({
  list: [productToBuy]
}).then(result => {
  wx.hideLoading()

  const data = result.result

  if (data) {
    wx.showToast({
      title: 'Succeed'
    })
  }
}).catch(err => {
  console.error(err)
  wx.hideLoading()

  wx.showToast({
    icon: 'none',
    title: 'Failed'
  })
})
```

这个函数传入刚才的 `productToBuy`。注意，这里我们用 `list` 呈现。因为，一个订单可能存在多个商品。虽然在详情页立即购买的功能中，每次只有一个商品会加入到订单中，但是为了良好的扩展性，我们将这个变量放入一个列表中。

执行完加入订单函数之后我们验证是否数据正确，并给到相应的提示之后，我们的 `detail.js` 立即购买功能就完善了。

### 共享云函数 `addToOrder`

进入到 `utils/db.js` 中声明刚才调用的 `addToOrder` 函数。在 `module.exports` 里面的最后加入:

```js
addToOrder(data) {
  return wx.cloud.callFunction({
    name: 'addToOrder',
    data,
  })
},
```

这个函数是一个名为 `addToOrder` 的云函数的调用，这里注意，传入的参数和变量名字一致时，我们可以进行简写。比如这里的 `data`。

### 编写云函数 `addToOrder`

#### 创建云函数 `addToOrder`

在文件夹 `cloudfunctions` 新建一个云函数命名和 `utils/db.js` 一致的云函数 `addToOrder`。

在 `index.js` 模板中的 `cloud.init()` 下，输入数据库调用：

```js
const db = cloud.database()
```

接着，我们在模板中摘取可以获取用户 `OPENID` 的相关语句，并复制在云函数入口函数中。

```js
const wxContext = cloud.getWXContext()
const user = wxContext.OPENID
```

当然，除了这种方式，也可以用 `const user = event.userInfo.openId` 获得 `openId`。

下一步，获取我们的商品列表。

```js
const productList = event.list || []
```

接着，我们将商品的信息加入到云数据库 `order` 订单中。

```js
await db.collection('order').add({
  data: {
    user,
    createTime: +new Date(),
    productList,
  },
})

return {}
```

这个订单中，我们有三个变量。一个是用户的信息，一个是创建的时间，另一个就是商品的列表。并且，我们无需返回任何数据。

这样，我们的云函数就声明完毕。之后，我们进行云端安装部署。

#### 创建 `Order` 集合数据库

由于在数据库中目前还没有建立 `order` 数据库，所以我们需要在数据库中新建这个集合。在 `Cloud Base`中的 `数据库` 中点击 `+添加集合`

然后输入集合名字 `order`。这里的名字一定要和云函数中的 `db.collection('order')` 一致。

这样，我们重新编译，试试看从详情页立即购买后，云数据库中的 `order` 集合是什么样的。

若系统运行成功，集合中会自动附上一个 `_id` 的属性。其余三个属性是我们在云函数加入 `order` 集合中自定义的。

### 封装用户是否已授权

来到 `util.js` 中，在 `module.exports` 中加入一个判断用户是否已授权的函数。

```js
isAuthenticated() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === true) {
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  },
```

当我们拿到用户的授权信息时返回 `resolve()`，没有拿到返回 `reject()`。

之后，我们去到 `db.js` 中，首先引入 `util.js` 的功能。

```js
const util = require('./util')
```

然后找到 `addToOrder(data)`函数。这时，我们先要加入判断是否授权的功能。然后再根据不同结果，打出不同的提示。

```js
addToOrder(data) {
  return util.isAuthenticated()
  .then(() => {
      return wx.cloud.callFunction({
        name: 'addToOrder',
        data,
      })
  })
  .catch(() => {
    wx.showToast({
      icon: 'none',
      title: 'Please Login First'
    })
    return {}
  })
},
```

这样我们的判断用户是否授权功能就已经完成啦。

我们来测试一下。

我们清除一下缓存。

然后选一件商品，点击 `Buy it Now`。

若运行成功，会出现 `"Please Login First"` 的提示。

最后，我们试着再登录后，然后再去点击 `Buy it Now`，看看是否和之前实现的功能一样。

### 授权后优化其他代码

完成了立即购买的授权用户判断。回过头来看看，添加了新功能，之前的代码是否也需要跟着优化。

其实，在 `getUserInfo()` 函数中，我们其实已经应用到了 `isAuthenticated()` 的功能。那么根据模块化的思想，我们在`getUserInfo()` 中调用 `isAuthenticated()`，重写这部分代码。

```js
getUserInfo() {
  return new Promise((resolve, reject) => {
    this.isAuthenticated().then(() => {
      wx.getUserInfo({
        success(res) {
          const userInfo = res.userInfo
          resolve(userInfo)
        }
      })
    }).catch(() => {
      reject()
    })
  })
},
```

另外，我们在各自页面的生命周期函数 `onShow()` 中，都调用了 `util.getUserInfo()`。这时，如果用户未授权，就会出现拒绝的情况。所以，在 `order`、`cart`、`me` 页面各自的 `util.getUserInfo()` 相关部分，加入 `catch` 处理。

```js
util.getUserInfo().then(userInfo => {
  this.setData({
    userInfo
  })
}).catch(err => {
  console.log('Not Authenticated yet');
})
```

清除缓存，看看各个页面下在未登录时的状态。

### 获取订单

当我们在云数据库中存储了订单的信息后，我们下一步就是去除 `order.js` 中的虚拟数据，而是创建 `getOrders()` 函数来从云数据库中获取这些订单。

首先引入 `db.js` 中的函数：

```js
const db = require('../../utils/db')
```

置空 `data` 中的 `orderList`:

```js
data: {
  userInfo: null,
  orderList: [],
},
```

在 `order.js` 中，`onShow` 生命周期函数中加入函数：

```js
this.getOrders()
```

在`onShow` 生命周期函数体外，定义 `getOrders()`：

```js
getOrders() {
  wx.showLoading({
    title: 'Loading...'
  })

  db.getOrders().then(result => {
    wx.hideLoading()

    const data = result.result

    if (data) {
      this.setData({
        orderList: data
      })
    }
  }).catch(err => {
    console.error(err)
    wx.hideLoading()

    wx.showToast({
      icon: 'none',
      title: 'Failed',
    })
  })
}
```

可以看到，这和我们之前实现直接购买的功能时的流程基本一致。首先展现给用户 `Loading...` 的提示。然后调用 `db.js` 库中的函数，获取到订单。检查订单数据，如果订单存在，那么将赋值给 `data` 变量。若不存在，给予用户 `Failed` 的提示。

然后我们来到 `db.js` 中来定义这个 `getOrders()` 函数。同样，我们想利用调运云函数的方式来完成这个任务。

在 `module.exports` 里的最后加入：

```js
getOrders() {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'getOrders',
      })
    })
    .catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
},
```

这个思路也比较清楚。首先，查看用户是否授权。然后授权的情况下调用名为 `getOrders` 的云函数，若查到没有授权，则提示用户 `'Please Login First'`。

最后一步，新建一个云函数，名字为 `getOrders`。

之后在 `index.js` 中，第一步获取数据库。

```js
const db = cloud.database()
```

然后在入口函数中，输入：

```js
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID

  // 订单列表
  const orderRes = await db.collection('order').where({
    user,
  }).get()
  const orderList = orderRes.data

  return orderList
}
```

首先获取用户的 OPENID， 然后从数据库中提取该用户的订单信息，返回订单列表。

重新上传并部署 `getOrders` 云函数。

上传成功后，我们编译之后，然后点击 `order` Tab, 看看是否如我们预期的一样。

## 购物车页面

### 无商品时展示页面

首先，先调整一下编译模式。新建一个 `cart` 编译模式。

![img](https://s3.cn-north-1.amazonaws.com.cn/u-img/b655c511-1633-4452-adfb-e8838580c4ae)

之后来到 `cart.wxml` 最下面填入以下的代码：

```html
<view class="cart-empty" wx:elif="{{cartList.length === 0}}" >
  <image class="empty-image" src="/images/cart.png"></image>
  <view class="empty-text">Your cart is empty.</view>
  <view class="empty-text">Let's get shopping!</view>
</view>
```

这里面涉及到的样式，我们填充到 `cart.wxss` 中：

```css
.cart-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 37rpx 27rpx;
  height: 431rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.empty-image {
  margin-bottom: 29rpx;
  width: 90rpx;
  height: 90rpx;
  opacity: 0.4;
}

.empty-text {
  font-size: 28rpx;
  line-height: 40rpx;
  color: rgba(139, 139, 139, 0.8);
}
```

然后我们给 `cart.js` 添加 `cartList`:

```js
data: {
  userInfo: null,
  cartList: [],
},
```

### 有商品时展示页面

#### 页面结构分析

![img](https://s3.cn-north-1.amazonaws.com.cn/u-img/4a816159-35e0-4b8d-9c9d-27ad6b6dcde6)

整体上我们把这个页面分为三部分。

- 第一部分为全选，和可编辑选项。
- 第二部分为可纵向滚动的商品信息。
- 第三部分为结算区域。

#### 全选以及编辑选项

来到我们的 `cart.wxml`，输入：

```html
<view wx:else>

  <view class="cart-top">
    <view class="cart-total">
      <view class="cart-check-wrapper white {{isSelectAllChecked ? 'check' : ''}}">
        <image class="cart-check" src="/images/check.png" wx:if="{{isSelectAllChecked}}"></image>
      </view>
      <view class="cart-total-text">Select All</view>
    </view>
    <view class="cart-edit">{{isCartEdit ? 'Done' : 'Edit'}}</view>
  </view>

</view>
```

我们在这里绑定了 `isSelectAllChecked`， 它是一个判断是否全选商品的 bool 数据。在 `cart.js`中加在数据中：

```js
data: {
  userInfo: null,
  cartList: [],
  isSelectAllChecked: false,
},
```

##### `isSelectAllChecked ? 'check' : ''` 含义

这是一个判断逻辑的简单写法。如果说 `isSelectAllChecked` 为真，我们返回 `'check'`；如果`isSelectAllChecked` 为假，我们返回 `''`，也就是什么都不返回。

所以以上的情况我们只会出现两种情况。

一种是：

```html
<view class="cart-check-wrapper white check">
```

另一种是：

```html
<view class="cart-check-wrapper white">
```

同样地，我们也看到了有另一个变量 `isCartEdit`。它代表是否需要编辑购物车的 bool 数据。我们在 `cart.js` 中加在数据中：

```js
data: {
  userInfo: null,
  cartList: [],
  isSelectAllChecked: false,
  isCartEdit: false,
},
```

这个变量依然在一个判断语句中，会输出不同的结果。

将虚拟数据也加在 `cart.js` 中：

```js
data: {
  userInfo: null,
  cartList: [{
    id: 1,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
    name: 'Wallet',
    price: '100.00',
    source: 'CHINA',
    count: 1,
  }, {
    id: 2,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
    name: 'Guitar',
    price: '200.00',
    source: 'SWEDEN',
    count: 3,
  }, {
    id: 3,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
    name: 'Stapler',
    price: '300.00',
    source: 'GERMANY',
    count: 4,
  }, {
    id: 4,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
    name: 'Leafy vegetables',
    price: '400.00',
    source: 'NEW ZEALAND',
    count: 2,
  }, {
    id: 5,
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product5.jpg',
    name: 'Compass',
    price: '500.00',
    source: 'USA',
    count: 1,
  }],
  isSelectAllChecked: false,
  isCartEdit: false,
},
```

这样可以使得 `cartList` 的长度大于 0，进入到有商品的购物车页面。

接着加入此页面的样式：

```css
.cart-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24rpx;
  margin-top: 20rpx;
}

.cart-total {
  display: flex;
  align-items: center;
  padding-left: 35rpx;
  font-size: 32rpx;
}

.cart-check-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width:36rpx;
  height: 36rpx;
  border-radius: 50%;
  background: #ECECEE;
}

.cart-check-wrapper.white {
  background: #FFFFFF;
}

.cart-check-wrapper.check {
  background: #F5E069;
}

.cart-check {
  width: 22rpx;
  height: 16rpx;
}

.cart-total-text,
.cart-edit {
  margin-left: 18rpx;
  margin-right: 33rpx;
  color: rgb(52, 55, 61, 0.8);
  font-size: 24rpx;
  line-height: 33rpx;
}
```

这里面我们重点来看这一段代码：

```css
.cart-check-wrapper.white {
  background: #FFFFFF;
}

.cart-check-wrapper.check {
  background: #F5E069;
}
```

我们拿出对应的 `cart.wxml` 对应的代码进行讲解。依然拿刚刚讲到的 `<view class="cart-check-wrapper white {{isSelectAllChecked ? 'check' : ''}}">`举例。

当最终为 `<view class="cart-check-wrapper white">` 我们执行：

```css
.cart-check-wrapper.white {
  background: #FFFFFF;
}
```

这是因为当内容既属于 `cart-check-wrapper` 类也属于 `white` 类时，那么系统就会将其背景设为白色。

可是当最终为 `<view class="cart-check-wrapper white check">` 时，这时就会出现问题。

因为内容同属于三类样式。而样式代码中，内容只要属于两类，那么都会对背景的属性进行操作。

微信小程序中规定，若出现矛盾状况，哪一类样式在后面，就会覆盖前面的属性样式。所以，在这里：

```css
.cart-check-wrapper.check {
  background: #F5E069;
}
```

写在了下面，所以当内容只要同属于 `cart-check-wrapper` 类和 `check` 类时，我们执行这个代码。将背景颜色设置为 `#F5E069` 的色号。

#### 购物车列表

首先需要建立一个新的组件 `scroll-view`。它是一个可以滚动的视图组件：

```html
<scroll-view class="product-list" scroll-y scroll-with-animation enable-back-to-top>

</scroll-view>
```

这里我们可以看到我们设置了滚动方向的属性为 `scroll-y`，代表整个的区域滚动方向是纵向的。然后也会添加滚动时的进度提示动画 `scroll-with-animation`，以及 可以回到顶部的属性 `enable-back-to-top`。更多的资料请参考微信小程序开发 [官方文档](https://developers.weixin.qq.com/miniprogram/en/dev/component/scroll-view.html?t=19022220)。

接着我们来填充内容：

```html
<scroll-view class="product-list" scroll-y scroll-with-animation enable-back-to-top>
  <view class="product-card" wx:for="{{cartList}}" wx:key="productId">
    <view class="cart-check-wrapper {{cartCheckMap[item.productId] ? 'check' : ''}}">
      <image class="cart-check" src="/images/check.png" wx:if="{{cartCheckMap[item.productId]}}"></image>
    </view>
    <image class="product-img" mode="aspectFit" src="{{item.image}}"></image>
    <view class="product-info">
      <view class="product-name">{{item.name}}</view>
      <view class="product-price">$ {{item.price}}</view>
      <view class="product-count-edit" wx:if="{{isCartEdit}}">
        <view class="count-minus">-</view>
        <view class="count-now">{{item.count}}</view>
        <view class="count-add">+</view>
      </view>
      <view class="product-count" wx:else>x {{item.count}}</view>
    </view>
  </view>
</scroll-view>
```

这里，我们新加入的数据为 `cartCheckMap`。它是代表所有选中商品的一个集合。我们在 `cart.js`中添加进去：

```js
    ...
    isSelectAllChecked: false,
    isCartEdit: false,
    cartCheckMap: {},
    ...
```

目前，我们设置为空。代表目前还没有选中的商品。

其他的一些内容与前几章类似，大家可以仔细阅读。

然后填入对应的样式：

```css
.product-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 70rpx;
  bottom: 100rpx;
  padding-bottom: 30rpx;
}

.product-card {
  display: flex;
  align-items: center;
  margin: 0 26rpx 26rpx;
  padding-left: 32rpx;
  height: 200rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 13rpx;
}

.product-img {
  flex-shrink: 0;
  margin-left: 31rpx;
  width: 160rpx;
  height: 160rpx;
}

.product-info {
  flex: 1;
  padding: 38rpx 28rpx 0 36rpx;
  height: 100%;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 40rpx;
}

.product-name {
  color: rgba(29, 29, 38, 0.8);
}

.product-price {
  margin-top: 3rpx;
  font-weight: bold;
}

.product-count {
  text-align: right;
  font-weight: bold;
}

.product-count-edit {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
```

#### 结算区域

最后来搭建结算区域。这一部分元素比较少，也比较简单。

```html
<view class="cart-checkout">
    <view class="cart-total">
      <view class="cart-check-wrapper {{isSelectAllChecked ? 'check' : ''}}">
        <image class="cart-check" src="/images/check.png" wx:if="{{isSelectAllChecked}}"></image>
      </view>
      <view class="cart-total-text">Select All</view>
    </view>
    <view class="cart-checkout-text"><text>Total</text><text class="cart-checkout-now">$ {{cartTotal}}</text></view>
    <view class="pay-btn {{cartTotal>0 ? 'pay-avalible' : ''}}">Checkout</view>
  </view>
```

为了提升用户的体验，我们在页面上下两端都设置了全选的快捷选项，所以这一部分与上面的代码一致。

这里多了一个 `cartTotal` 变量的判断，我们在 `cart.js` 中加进去。

```js
  ...
    isSelectAllChecked: false,
    isCartEdit: false,
    cartCheckMap: {},
    cartTotal: '00.00',
    ...
```

最后加入样式代码：

```css
.count-minus,
.count-add {
  width: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  border-radius: 50%;
  border: 3rpx solid #F6E474;
  text-align: center;
  font-size: 28rpx;
  font-weight: 900;
}

.count-now {
  margin: 0 18rpx;
}

.cart-checkout {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding-left: 24rpx;
  height: 100rpx;
  background: #fff;
}

.cart-checkout::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  box-shadow: 0 -2rpx 9rpx 8rpx rgba(0, 0, 0, 0.02);
}

.cart-checkout-text {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 29rpx;
  color: rgba(52, 55, 61, 0.8);
  font-size: 24rpx;
  line-height: 33rpx;
}

.cart-checkout-now {
  margin-left: 12rpx;
  font-size: 34rpx;
  line-height: 48rpx;
  color: #000000;
}

.pay-btn {
  width: 250rpx;
  height: 100%;
  background: #F5E069;
  color: rgba(52, 55, 61, 0.5);
  line-height: 100rpx;
  text-align: center;
  font-size: 30rpx;
}

.pay-btn.pay-available {
  color: #34373D;
}
```

### 加入购物车

首先来到 `detail.wxml` 中，在最下面的 button 按钮中添加一个点击事件 `addToCart`。

打开 `detail.js` 文件，创建 `addToCart` 函数：

填写：

```js
addToCart() {
  wx.showLoading({
    title: 'Loading...',
  })

  db.addToCart(this.data.product).then(result => {
    wx.hideLoading()

    const data = result.result

    if (data) {
      wx.showToast({
        title: 'Succeed'
      })
    }
  }).catch(err => {
    console.error(err)
    wx.hideLoading()

    wx.showToast({
      icon: 'none',
      title: 'Failed'
    })
  })
},
```

首先给用户提示 `Loading...`。然后，几乎和加入订单的思路一样，调用 `db.js` 中的 `addToCart` 函数，进行商品数据的传输，并根据结果，给予用户相应的提示。

我们移步到 `db.js` 中来声明 `db.addToCart` 函数：

```js
addToCart(data) {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'addToCart',
        data,
    })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
},
```

函数体首先检查用户是否已经授权，若用户已经授权，调用云名为 `addToCart` 的云函数；若用户没有授权，提示用户请先登录。

那么，我们就需要新建一个名为 `addToCart` 的云函数。

创建好之后，在 `addToCart/index.js` 中输入：

```js
const db = cloud.database()
```

在入口函数中，输入：

```js
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const productId = event._id

}
```

首先需要获取用户的 `OPENID` 以及商品的 `productId`。

接着，我们通过从云数据库中名为 `cart` 的数据，来获取购物车列表中对应用户以及商品 ID 的列表。

```js
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const productId = event._id

  const cartRes = await db.collection('cart').where({
    productId,
    user,
  }).get()
  const cartList = cartRes.data
}
```

最后通过这一商品的列表长度，来更新商品的数量。这主要分两种情况。第一种情况，如果列表长度为 0，那么需要填充该商品所有的信息；另一种情况，若商品列表长度大于0，那么只需要在该商品的数量上 +1 即可完成更新。

```js
if (!cartList.length) {
  await db.collection('cart').add({
    data: {
      productId,
      count: 1,
      user,
      image: event.image,
      name: event.name,
      price: event.price,
    },
  })
} else {
  const count = cartList[0].count + 1
  await db.collection('cart').doc(cartList[0]._id).update({
    data: {
      count,
    },
  })
}

return {}
```

上传并部署新修改的 `addToCart` 云函数。

最后，前往 `Cloud Base` 中的云数据库，添加一个新的数据库，命名为 `cart`。

重新编译，得到结果。试试去加入一些商品，并在后台云数据库查看一下自己的成果。

### 获取购物车商品列表

首先在运数据库中添加 `cart` 集合，然后来到 `cart.js` 中，将数据中的商品信息置空。并将商品价格总和设为初始值 `0`。

```js
data: {
  userInfo: null,
  cartList: [],
  isSelectAllChecked: false,
  isCartEdit: false,
  cartCheckMap: {},
  cartTotal: 0,
},
```

在页面里设置一个名为 `getCart` 的函数。

```js
getCart() {
  wx.showLoading({
    title: 'Loading...',
  })

  const cartCheckMap = this.data.cartCheckMap
  db.getCart().then(result => {
    wx.hideLoading()

    const data = result.result

    if (data.length) {
      // update the total price for cart
      let checkout = 0;
      data.forEach(product => {
        checkout+= product.price * product.count
      })

      this.setData({
        cartTotal: checkout,
        cartList: data
      })
    }
  }).catch(err => {
    console.error(err)
    wx.hideLoading()

    wx.showToast({
      icon: 'none',
      title: 'Failed'
    })
  })
},
```

这里，整体的思路我们都很熟悉。需要注意的是，我们通过 `db.js` 中的同名函数 `getCart` 拿到数据之后，需要结算总价格。这个总价格通过得到 `data` 中的属性进行计算得到。也就是：

声明好函数之后，我们分别在 `onShow` 生命周期函数和 `onTapLogin` 事件中调用该函数。

```js
onShow: function (options) {
  util.getUserInfo().then(userInfo => {
    this.setData({
      userInfo
    })

    this.getCart()

  }).catch(err => {
    console.log('Not Authenticated yet');
  })
},

onTapLogin(event) {

  this.setData({
    userInfo: event.detail.userInfo
  })

  this.getCart()
},
```

最后不要忘了在 `cart.js` 最上方加入对于 `db.getCart` 的引用。

```js
const db = require('../../utils/db')
```

进入 `db.js` ，来到 函数 `addToCart` 的下方，声明 `getCart` 函数。

```js
getCart() {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
        name: 'getCart',
    })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
},
```

这一步告诉我们去调用名为 `getCart` 的云函数，并且根据结果给出相应的提示。

接着，新建名为 `getCart` 的云函数。

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID

  // cart list
  const cartRes = await db.collection('cart').where({
    user,
  }).get()
  const cartList = cartRes.data

  return cartList
}
```

这一步比较简单。就是从名为 `cart` 的云数据库中找到用户对应的购物车商品信息，并返回数据。

完成好后，上传部署函数。然后重新编译编译，看看最终效果。

### 选择购物车中的商品

这一步我们要完成商品的全选或单选。并让结算栏自动计算出结账金额。

![img](https://s3.cn-north-1.amazonaws.com.cn/u-img/732739f6-a228-4fe0-8c6f-25cf7b4d5c3a)

来到 `cart.wxml` 在三个部分来加入点击事件，其中第一和第三部分是完全相同的。

```html
<view class="cart-check-wrapper white {{isSelectAllChecked ? 'check' : ''}}" bindtap="onTapCheck" data-id="selectAll">
```

```html
<view class="cart-check-wrapper {{cartCheckMap[item.productId] ? 'check' : ''}}" bindtap="onTapCheck" data-id="{{item.productId}}">
```

```html
<view class="cart-check-wrapper white {{isSelectAllChecked ? 'check' : ''}}" bindtap="onTapCheck" data-id="selectAll">
```

通过点击图中商品前不同的按钮，来改变购物车商品选择的状态。我们希望通过一个 `onTapCheck` 事件来实现。但在实际情况，全选与单选是有区别的。所以，我们就为它们设置不同的 `data-id` 用以区分。一个为 `"selectAll"` 另一个为 绑定数据 `"{{item.productId}}"`

设置好了 `cart.wxml` 来到 `cart.js`，来声明 `onTapCheck` 事件。

在页面里的最下面先输入：

```js
onTapCheck(event) {
  const checkId = event.currentTarget.dataset.id
  const cartCheckMap = this.data.cartCheckMap
  let isSelectAllChecked = this.data.isSelectAllChecked
  const cartList = this.data.cartList
  let cartTotal = 0

},
```

这一步我们现获取这一事件我们所需要的一些变量。其中，`checkId` 可以获取我们的商品唯一的 `ID`。这是事件获取数据的方法。更多的信息请查阅 [文档](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)

其余的变量都是我们的 `data` 中获取的。另外，由于我们购物车结算的总价也要根据选择做出不同的计算，所以我们上小节计算总价的方法也要重写，并纳入到 `onTapCheck` 事件中，初始值设为 0。

我们选择商品的情况大致分为两类。一个是点选全选按钮，另一个是单点商品按钮。我们先从简单的全选按钮做起。

```js
onTapCheck(event) {
  const checkId = event.currentTarget.dataset.id
  const cartCheckMap = this.data.cartCheckMap
  let isSelectAllChecked = this.data.isSelectAllChecked
  const cartList = this.data.cartList
  let cartTotal = 0

  if (checkId === 'selectAll') {
    // 设置全选按钮自身状态
    isSelectAllChecked = !isSelectAllChecked
    cartList.forEach(product => {
      cartCheckMap[product.productId] = isSelectAllChecked
    })
  }

},
```

我们来分析这段代码。首先，点击全选按钮，自身状态肯定要发生变化。所以需要 **布尔值** 需要反转：

```js
isSelectAllChecked= !isSelectAllChecked
```

另外，无论其他商品按钮选项是什么样的状态，在点击全选按钮之后，所有按钮的状态都是一样的。所以，我们便利其他的商品按钮，并用全选按钮状态进行赋值。

```js
cartList.forEach(product => {
  cartCheckMap[product.productId] = isSelectAllChecked
})
```

这样点击全选按钮就轻松搞定了。

后面的商品按钮逻辑稍微有些复杂。没关系，我们一步一步来。

```js
onTapCheck(event) {
  const checkId = event.currentTarget.dataset.id
  const cartCheckMap = this.data.cartCheckMap
  let isSelectAllChecked = this.data.isSelectAllChecked
  const cartList = this.data.cartList
  let cartTotal = 0

  if (checkId === 'selectAll') {
    isSelectAllChecked = !isSelectAllChecked
    cartList.forEach(product => {
      cartCheckMap[product.productId] = isSelectAllChecked
    })
  } else {
    cartCheckMap[checkId] = !cartCheckMap[checkId]
    // 首先假设目前是全选中
    isSelectAllChecked = true
    // 然后遍历所有商品，只要有一个状态不是选中，则设置全选自身状态为false
    cartList.forEach(product => {
      if (!cartCheckMap[product.productId]) {
        // not all product selected
        isSelectAllChecked = false
      }
    })
  }
},
```

首先，和全选按钮一样，点击自己，必定自己的状态会发生反转。

```js
cartCheckMap[checkId] = !cartCheckMap[checkId]
```

然后，我们来判断这时全选按钮的状态。我们知道，只有当所有的按钮必须都是选中的状态，那么全选按钮才可以选中。否则，全选按钮就不能为选中状态。所以，我们先假设`Select All` 在其他选择按钮按下之后的状态为 `True` 的状态。然后循环遍历所有的商品按钮状态，只要有一个按钮没有被选中，那么再将全选按钮的状态设置为 `False`。

之后，我们重新计算我们选中商品的总价，然后将各个变量的值重新赋值给我们的 `data` 变量。

```js
onTapCheck(event) {
  const checkId = event.currentTarget.dataset.id
  const cartCheckMap = this.data.cartCheckMap
  let isSelectAllChecked = this.data.isSelectAllChecked
  const cartList = this.data.cartList
  let cartTotal = 0

  if (checkId === 'selectAll') {
    isSelectAllChecked = !isSelectAllChecked
    cartList.forEach(product => {
      cartCheckMap[product.productId] = isSelectAllChecked
    })
  } else {
    cartCheckMap[checkId] = !cartCheckMap[checkId]
    isSelectAllChecked = true
    cartList.forEach(product => {
      if (!cartCheckMap[product.productId]) {
        // not all product selected
        isSelectAllChecked = false
      }
    })
  }

  cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

  this.setData({
    cartTotal,
    isSelectAllChecked,
    cartCheckMap
  })
},
```

接下来，我们来重新计算一下我们的商品价格。

```js
updateTotalPrice(cartList, cartCheckMap) {
  let checkout = 0
  cartList.forEach(product => {
    if (cartCheckMap[product.productId]) checkout += product.price * product.count
  })

  return util.priceFormat(checkout)
},
```

我们将原来计算总价的部分去掉，简化为：

```js
if (data.length) {
  // update the total price for cart
  this.setData({
    cartTotal: util.priceFormat(0),
    cartList: data
  })
}
```

到此，我们可以任意选择商品，并自动为购物车商品进行总价的计算。

### 编辑购物车

首先，我们设置了一个编辑按钮。只有编辑按钮在编辑的状态下，商品的数量才可以进行编辑。我们在之前的 `cart.wxml` 已经设置过了非编辑状态下页面会显示 `Edit`，表示若想改变商品数量，需要先点选此按钮；在编辑状态下页面会显示 `Done`，表示若编辑完成后，需要锁定当前状态。

进一步完善 `cart.wxml` ，增加一个点击事件：

```html
<view class="cart-edit" bindtap='onTapEditCart'>{{isCartEdit ? 'Done' : 'Edit'}}</view>
```

接着来到 `cart.js` 中定义事件。

```js
onTapEditCart() {
  this.setData({
    isCartEdit: !this.data.isCartEdit
  })
},
```

重新编译，我们来看一下结果。当我们点击 `Edit` 时，商品数量的左右两侧会分别显示 `+` 与 `-` 。

之后，我们来实现商品数量上的改变，同时影响着结算价格。

回到 `cart.wxml`，我们增加 `adjustCartProductCount` 事件。

```html
<view class="product-count-edit" wx:if="{{isCartEdit}}">
  <view class="count-minus" bindtap="adjustCartProductCount" data-type="minus" data-id="{{item.productId}}">-</view>
  <view class="count-now">{{item.count}}</view>
  <view class="count-add" bindtap="adjustCartProductCount" data-type="add" data-id="{{item.productId}}">+</view>
</view>
```

我们针对 `+` 与 `-` 分别添加了不同的 `data-type`。

再次切换到 `cart.js` 中，我们来定义如何实现改变商品数量的`adjustCartProductCount` 事件。

```js
adjustCartProductCount(event) {
  const dataset = event.currentTarget.dataset
  const adjustType = dataset.type
  const productId = dataset.id
  const cartCheckMap = this.data.cartCheckMap
  let cartList = this.data.cartList
  const productToAdjust = cartList.find(product => product.productId === productId) || {}

  if (adjustType === 'add') {
    productToAdjust.count++
  } else {
    if (productToAdjust.count >= 2) {
      productToAdjust.count--
    } else {
      delete cartCheckMap[productId]
      cartList = cartList.filter(product => product.productId !== productId)
    }
  }

  const cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

  this.setData({
    cartTotal,
    cartList,
  })

},
```

首先，我们还是先定义各个变量。

这里面比较简单的是商品的增加逻辑。只要点一次 `+`，商品的数量 `+1` 就好了。

但是，对于想减少物品的数量而言，逻辑会稍微复杂。

- 在商品数量大于等于 2 时，每点击一次 `-` 时，商品的数量 `-1`。
- 当商品数量等于 1 时，点击 `-` 之后，直接在页面中删除这个商品。

之后，调用上节课的重新结算账单的函数，完成对于账单的更新。并更新我们的数据。

重新编译一下，随意编辑我们的购物车，看看所有功能是否实现成功。

### 更新购物车清单

在编辑完购物车之后，除了结账的金额发生了改变，其实我们也需要更新我们云数据库中的 `cart` 集合。

首先，我们要选择一个更新购物车清单的时机。这个时机可以防止我们频繁的操作导致客户端和云端的传输数据次数过于频繁。这里，我们选择在购物车页面编辑阶段，点击 `Done` 按钮之后，发生更新购物车清单的事件。

来到 `cart.js` 中，重新编写一下 `onTapEditCart()` 事件。首先，我们从非编辑状态变为编辑状态，`isCartEdit` 值直接反转。

```js
onTapEditCart() {
    if (!this.data.isCartEdit) {
      this.setData({
        isCartEdit: true
      })
    }
  },
```

而反过来，当编辑状态点击按钮变为非编辑状态 `Done` 之前，我们需要更新购物车中的数据。我们调用更新购物车函数来实现。

```js
onTapEditCart() {
  if (!this.data.isCartEdit) {
    this.setData({
      isCartEdit: true
    })
  } else {
    this.updateCart()
  }
},
```

另外，我们还需要注意一个细节。那就是，当我们在编辑购物车商品时，如果我们删减所有商品的数量变为 0 时，所有商品都会清空。由于购物车页面判断 `cartList` 长度为 0，所以页面会变购物车无商品的页面，也会自动跳出出编辑的状态。所以在这个状态到来之前，我们也需要更新我们的购物车清单。我们在 `adjustCartProductCount(event)` 事件的最后加入：

```js
if (!cartList.length) {
  this.updateCart()
}
```

所以整体的 `adjustCartProductCount(event)` 事件为：

```js
adjustCartProductCount(event) {
  const dataset = event.currentTarget.dataset
  const adjustType = dataset.type
  const productId = dataset.id
  const cartCheckMap = this.data.cartCheckMap
  let cartList = this.data.cartList
  const productToAdjust = cartList.find(product => product.productId === productId) || {}

  if (adjustType === 'add') {
    productToAdjust.count++
  } else {
    if (productToAdjust.count >= 2) {
      productToAdjust.count--
    } else {
      delete cartCheckMap[productId]
      cartList = cartList.filter(product => product.productId !== productId)
    }
  }

  const cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

  this.setData({
    cartTotal,
    cartList,
  })

  if (!cartList.length) {
    this.updateCart()
  }

},
```

接着，我们来定义 `updateCart()` 函数。

```js
updateCart() {
  wx.showLoading({
    title: 'Loading...',
  })

  const cartList = this.data.cartList

  db.updateCart(cartList).then(result => {
    wx.hideLoading()

    const data = result.result

    if (data) {
      this.setData({
        isCartEdit: false
      })
    }
  }).catch(err => {
    console.error(err)
    wx.hideLoading()

    wx.showToast({
      icon: 'none',
      title: 'Failed'
    })
  })
},
```

上述代码首先是给用户加载的提示。然后调用 `db.js` 的 `updateCart()` 函数，之后返回数据。若返回数据为真，则改变编辑状态，由编辑状态变为非编辑状态 `Done`；若返回数据为空，则给用户失败的提示。

来到 `db.js` 文件，定义 `updateCart()` 函数。

```js
updateCart(list) {
  return util.isAuthenticated()
  .then(() => {
    return wx.cloud.callFunction({
      name: 'updateCart',
      data: {
        list,
      },
    })
  }).catch(() => {
    wx.showToast({
      icon: 'none',
      title: 'Please Login First'
    })
    return {}
  })
},
```

这个步骤大家也已经非常熟悉。先检查用户是否授权，若授权则调用云函数 `updateCart`；若没有授权，提示用户先登录。

最后，创建新的云函数 `updateCart`:

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  const productList = event.list

  // delete all the data from cart
  await db.collection('cart').where({
    user,
  }).remove()

  // fill cart with updated data
  for (const product of productList) {
    await db.collection('cart').add({
      data: {
        productId: product.id,
        count: product.count,
        user,
        image: product.image,
        name: product.name,
        price: product.price,
      },
    })
  }

  return {}
}
```

这个云函数首先得到用户信息 OPENID， 接着删除该用户现在所有的购物车商品清单。最后重新传入最新的购物车商品清单。

我们上传部署云函数，我们重新编译一下。随便改变购物车的商品数量。编辑完成后，切换到云数据库。看看信息是否对应的上。

## 评论页

### 搭建添加评论页面

首先，我们在 `app.json` 中添加 添加评论页。

```json
"pages": [
    "pages/home/home",
    "pages/order/order",
    "pages/cart/cart",
    "pages/me/me",
    "pages/detail/detail",
    "pages/add-review/add-review"
  ],
```

修改我们的编译模式命名为 `add-review`。

![img](https://s3.cn-north-1.amazonaws.com.cn/u-img/ca4a638f-85af-4d33-88f8-538a6b672ade)

打开 `add-review.json` 填入导航栏名称：

```json
{
  "navigationBarTitleText": "Review"
}
```

#### 商品信息

来到 `add-review.wxml` 中，填写：

```html
<view class="product-card">
  <image class="product-image" mode="widthFix" src="{{product.image}}"></image>
  <view class="product-info">
    <view class="product-name">{{product.name}}</view>
    <view class="product-price">$ {{product.price}}</view>
  </view>
</view>
```

注意这里的 `mode` 设置为 `"widthFix"`， 意为图像宽度不变，高度自动变化，保持原图宽高比不变。

在 `add-review.js` 中填入虚拟数据。

```js
data: {
  product: {
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
    name: 'Product 1',
    price: '50.50',
  },
},
```

最后来到 `add-review.wxss` 中填入对应的样式。

```css
.product-card {
  display: flex;
  align-items: center;
  padding-left: 26rpx;
  height: 200rpx;
  background: #FFFFFF;
}

.product-image {
  flex-shrink: 0;
  width: 160rpx;
  height: 160rpx;
}

.product-info {
  flex: 1;
  padding: 27rpx;
  height: 100%;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 40rpx;
}

.product-name {
  color: rgba(29, 29, 38, 0.8);
}

.product-price {
  margin-top: 12rpx;
  font-weight: bold;
}
```

#### 填写评论区域

来到 `add-review.wxml` 中，继续填写`text` 组件：

```html
<view class="review-content">
  <textarea class="review-input" placeholder-class="review-placeholder" placeholder="Please leave your public comment..." maxlength="255"></textarea>
</view>
```

我们设置了属性 `placeholder`，表示在用户未填入内容时所显示的内容，这里为：`Please leave your public comment...`。当然，你也可以自定义你所想填写的内容。

在 `add-review.wxss` 中完善样式的设定：

```css
.review-content {
  margin: 29rpx 27rpx 0;
  padding-bottom: 26rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
  border-radius: 10rpx;
}

.review-input {
  width: 100%;
  height: 207rpx;
  padding: 29rpx 34rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 40rpx;
}

.review-placeholder {
  color: rgba(29, 29, 38, 0.4);
}
```

#### 发送按钮

```html
<view class="review-button">Submit</view>
```

在 `add-review.wxml` 中，继续填写：

```css
<view class="review-button">Submit</view>
.review-button {
  margin: 34rpx auto;
  width: 250rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #F5E069;
  border-radius: 10rpx;
  font-size: 30rpx;
  color: #34373D;
}
```

#### 完善订单页面

把编译模式设为 `order` 页面。

![img](https://s3.cn-north-1.amazonaws.com.cn/u-img/0dc06400-9a95-4ad1-9562-758a60e77071)

在 `order.wxml` 中，改写：

```html
<view class="order-btn">Reviews</view>
```

为：

```html
<navigator class="order-btn" url="/pages/add-review/add-review?productId={{item.productId}}&price={{item.price}}&name={{item.name}}&image={{item.image}}">Reviews</navigator>
```

这里我们的组件换成了导航组件，并且传进来的商品是从订单列表中找到所对应的商品。这一内容我们在首页点击商品跳转到相对应的详情页中见到过。

接着，我们在 `add-review.js` 将导入到的商品信息放到一个 `setProduct` 函数中。

```js
onLoad: function (options) {
  this.setProduct()
},

setProduct(options) {
  let product = {
    productId: options.productId,
    name: options.name,
    price: options.price,
    image: options.image
  }
  this.setData({
    product,
  })
},
```

这里我们多加了一个 `productId`。接着我们置空虚拟数据。

### 获取用户输入的评论

首先在 `add-review.wxml` 中调用事件。

```html
<view class="review-content">
  <textarea class="review-input" placeholder-class="review-placeholder" placeholder="Please leave your public comment..." maxlength="255" bindinput='onInput'></textarea>
</view>
```

然后我们在 `add-review.js` 中定义变量，并设置为空：

```js
data: {
  product: { },
  reviewContent: ''
},
```

接着我们定义 `onInput` 事件。

```js
onInput(event) {
  this.setData({
    reviewContent: event.detail.value.trim()
  })
},
```

这里的 `event.detail.value.trim()` 可以获取输入的信息，而 `trim()` 代表去除前后的空格。

在 `add-review.wxml` 中完善：

```html
<view class="review-button {{!reviewContent ? 'disable' : ''}}">Submit</view>
```

在 `add-review.wxss` 中完善:

```css
.review-button.disable {
  color: rgba(52, 55, 61, 0.5);
}
```

### 获取用户信息

在 `add-review.js` 中首先引入共享库。

```js
const util = require('../../utils/util')
```

接着，在数据中增加用户信息变量，并初始化为 `null`。

```js
data: {
  product: {},
  reviewValue: '',
  userInfo: null,
},
```

接着改写 `onLoad` 函数。调用共享库中的获取用户信息函数，并分别设置调用成功与失败的行为。

```js
onLoad(options) {
  util.getUserInfo().then(userInfo => {
    this.setData({
      userInfo
    })

    this.setProduct(options)
  }).catch(err => {
    console.log('Not Authenticated yet')
  })
},
```

可以看到，当调用了用户的信息后，重置了我们数据中的用户信息，并且调用了我们的订单商品信息 `setProduct` 函数。

### 编写 `addReview` 云函数

#### `addReview` 事件

在 `add-review.wxml` 中设置一个点击事件 `addReview`。

```html
<view class="review-button {{!reviewContent ? 'disable' : ''}}" bindtap="addReview">Submit</view>
```

回到 `add-review.js`，定义事件。

```js
addReview(event) {
  let content = this.data.reviewContent
  if (!content) return

  wx.showLoading({
    title: 'Submitting...'
  })

  db.addReview({
    username: this.data.userInfo.nickName,
    avatar: this.data.userInfo.avatarUrl,
    content,
    productId: this.data.product.productId
  }).then(result => {
    wx.hideLoading()

    const data = result.result

    if (data) {
      wx.showToast({
        title: 'Succeed'
      })

      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  }).catch(err => {
    console.error(err)
    wx.hideLoading()

    wx.showToast({
      icon: 'none',
      title: 'Failed'
    })
  })
},
```

其实大部分内容我们都很熟悉。这里我们调用 `db.js` 中的 `addReview` 函数，然后进行传参。这里的参数有 `username`、`avatar`、`content`、`productId`。

这里别忘了在文件开头引用 `db.js`。

```js
const db = require('../../utils/db')
```

来到 `db.js` 中来定义 `addReview` 函数。

```js
addReview(data) {
  return util.isAuthenticated()
    .then(() => {
      return wx.cloud.callFunction({
          name: 'addReview',
          data,
        })
    }).catch(() => {
      wx.showToast({
        icon: 'none',
        title: 'Please Login First'
      })
      return {}
    })
},
```

这个函数与 addToCart 极为相似，只是改了一个需要调用的云函数的名字。

虽然当我们的添加评论页面是从订单页进入的。按照常规来说，小程序已经获取了用户的权限登录才可以进入到订单页，那么进入到添加评论页也应该带有用户的信息，极少出现用户没有授权的情况。但是为了代码的严谨性，在处理错误时，我们依然会设计提示 `'Please Login First'`。

新建云函数 `addReview`。

另外，当我们调用函数成功后，要退回到原来的页面，也就是订单页面。

#### 新建云函数 `addReview`

之后我们去新建云函数 `addReview`。写入如下内容：

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID

  await db.collection('review').add({
    data: {
      user,
      username: event.username,
      avatar: event.avatar,
      content: event.content,
      productId: event.productId,
      createTime: +new Date(),
    },
  })

  return {}
}
```

这里，我们的云函数将 `username`、`avatar`、`content`、`productId` 以及创建时间 `createTime`等信息放在了云数据库中 `review` 的集合里。

我们上传部署这个云函数。打开 `Cloud Base` 添加新集合 `review`。

我们重新编译，试着写入几行评论，看看我们的数据库中的变化，是否储存了我们的信息。

### 搭建评论列表页

来到 `app.json`，开始加入评论列表页面：

```json
"pages": [
    "pages/home/home",
    "pages/order/order",
    "pages/cart/cart",
    "pages/me/me",
    "pages/detail/detail",
    "pages/add-review/add-review",
    "pages/review/review"
  ],
```

然后在 `review` 文件夹下，我们打开 `review.json`，写入：

```json
{
  "navigationBarTitleText": "Review"
}
```

添加编译模式 `review`：

![img](https://s3.cn-north-1.amazonaws.com.cn/u-img/12b4af2a-2258-4055-9eb9-732d29bfe159)

#### `product` 自定义组件

我们在 `components/` 文件夹下新建文件夹 `product/`。然后新建组件命名 `product`。

打开 `product.wxml`，首先填入商品信息，这一次和添加评论页面的排版基本一致。

```html
<view class="product-card">
  <image class="product-image" mode="widthFix" src="{{productImage}}"></image>
  <view class="product-info">
    <view class="product-name">{{productName}}</view>
    <view class="product-price">$ {{productPrice}}</view>
  </view>
</view>
```

这里，我们会遇到一种新的情况，那就是在 `components` 中会绑定相应 .js 文件中的数据。

我们看到有{{productImage}}，{{productName}} {{productPrice}} 三类数据。

这时，我们来到 `product.js` 中，在 `properties` 中写入：

```js
properties: {
  productImage: String,
  productName: String,
  productPrice: String
},
```

这就是我们在 `components` 写入绑定数据的方法。注意，这里我们必须为每一个数据写明类型。

之后我们在 `product.wxss` 中添加相应的样式：

```css
.product-card {
  display: flex;
  align-items: center;
  padding-left: 26rpx;
  height: 200rpx;
  background: #FFFFFF;
}

.product-image {
  flex-shrink: 0;
  width: 160rpx;
  height: 160rpx;
}

.product-info {
  flex: 1;
  padding: 27rpx;
  height: 100%;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 40rpx;
}

.product-name {
  color: rgba(29, 29, 38, 0.8);
}

.product-price {
  margin-top: 12rpx;
  font-weight: bold;
}
```

接着我们回到 `review.json` 中补充：

```js
{
  "navigationBarTitleText": "Review",
  "usingComponents": {
    "product": "/components/product/product"
  }
}
```

来到 `review.wxml` 中， 填写：

```html
<product product-image="{{product.image}}" product-name="{{product.name}}" product-price="{{product.price}}"></product>
```

这里，需要注意我们看到的 `product-image`、`product-name`、`product-price` 并不是 `class` 的名字。他们实际上就是刚刚我们在 `product.js` 中定义的 属性 `properties`: productImage, productName, productPrice

这样的命名改变是因为 `.js` 文件定义变量的时候要用驼峰定义 camel case，但是在wxml里要转成 `dash` 规则，这个是框架的设定，记住它就好啦！

之后我们在 `review.js` 中添加相应的虚拟数据。

```js
data: {
  product: {
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
    name: 'Product 1',
    price: '50.50',
  }

},
```

## 评论列表

回到 `review.wxml`：

```html
<view class="review-list">
  <view class="review-title">{{reviewList.length}}reviews</view>
  <view wx:for="{{reviewList}}" wx:key="id" class="review-card">
    <image class="review-avatar" src="{{item.avatar}}"></image>
    <view class="review-cnt">
      <view class="review-top">
        <view class="review-username">{{item.username}}</view>
        <view class="review-time">{{item.createTime}}</view>
      </view>
      <view class="review-content">{{item.content}}</view>
    </view>
  </view>
</view>
```

这里我们是用列表渲染绑定 `reviewList` 去呈现评论列表。

来到 `review.js` 补充虚拟数据：

```js
data: {
  product:{
    image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
    name: 'Product 1',
    price: '50.50',
  },

  reviewList: [{
    avatar: '/images/me-sel.png',
    username: 'test1',
    createTime: '2019/01/01',
    content: 'test comment',
  },
  {
    avatar: '/images/me-sel.png',
    username: 'test2',
    createTime: '2019/01/01',
    content: 'test comment'
  }],

},
```

在 `review.wxss` 中填入这一部分需要的样式：

```css
.review-list {
  margin-top: 16rpx;
  background: #FFFFFF;
  box-shadow: 0 2rpx 13rpx 5rpx rgba(0, 0, 0, 0.02);
}

.review-title {
  padding: 25rpx 26rpx 14rpx;
  font-size: 30rpx;
  line-height: 42rpx;
  color: rgba(29, 29, 38, 0.8);
  font-weight: bold;
}

.review-card {
  display: flex;
  padding: 30rpx 23rpx 0 26rpx;
}

.review-card:last-child .review-cnt {
  border-bottom: none;
}

.review-avatar {
  flex-shrink: 0;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}

.review-cnt {
  flex: 1;
  margin-left: 24rpx;
  padding-bottom: 30rpx;
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
}

.review-top {
  display: flex;
  font-size: 25rpx;
  line-height: 36rpx;
  color: rgba(29, 29, 38, 0.5);
}

.review-username {
  flex: 1;
}

.review-content {
  font-size: 28rpx;
  line-height: 40rpx;
  color: #1D1D26;
}
```

### 优化添加评论页

来到 `add-review.json` 文件，添加使用组件：

```json
{
  "navigationBarTitleText": "Review",
  "usingComponents": {
    "product": "/components/product/product"
  }
}
```

之后，在 `add-review.wxml` 中，将：

```html
<view class="product-card">
  <image class="product-image" mode="widthFix" src="{{product.image}}"></image>
  <view class="product-info">
    <view class="product-name">{{product.name}}</view>
    <view class="product-price">$ {{product.price}}</view>
  </view>
</view>
```

改换成：

```html
<product product-image="{{product.image}}" product-name="{{product.name}}" product-price="{{product.price}}"></product>
```

再来到 `add-review.wxss` 中，将相同的样式带有 `.product` 开头的样式去掉。

### 详情页导航

在 `detail.wxml` 中，找到：

```html
<view class="review-btn">
```

添加事件 `bindtap="onTapReviewEntry"`

我们在 `detail.js` 中，定义这个事件：

```js
onTapReviewEntry() {
  const product = this.data.product
  wx.navigateTo({
    url: `/pages/review/review?productId=${product._id}&price=${product.price}&name=${product.name}&image=${product.image}`,
  })
},
```

所以我们带着商品的信息进入到相应的商品评论页面。我们利用这一信息，进行商品信息的赋值。

在 `onLoad` 生命周期函数中，写入：

```js
onLoad(options) {
  this.setProduct(options)
},
```

定义 `setProduct(options)`

```js
setProduct(options) {
  let product = {
    productId: options.productId,
    name: options.name,
    price: options.price,
    image: options.image
  }
  this.setData({
    product,
  })
},
```

置空 `data` 中的 `product` 变量：

```js
data: {
    product:{},

    reviewList: [{
      avatar: '/images/me-sel.png',
      username: 'test1',
      createTime: '2019/01/01',
      content: 'test comment',
    },
    {
      avatar: '/images/me-sel.png',
      username: 'test2',
      createTime: '2019/01/01',
      content: 'test comment'
    }],
  },
```

### 评论页从云端获取数据

从云端获取评论思路与 `getOrder` 和 `getCart` 一致。但是我们并不需要新建云函数。我们先只需要在 `review.js` 中定义 `getReviews` 函数，并在函数体中调用 `db.js`中的 `getReviews` 函数，并在 `db.js` 中的 `getReviews` 函数中调用名 `review` 集合的数据即可。

在 `review.js` 中，在 `onLoad()` 中添加：

```js
onLoad(options) {
  this.setProduct(options)
  this.getReviews(options.productId)
},
```

然后定义 `getReviews`。

```js
getReviews(productId) {
  db.getReviews(productId).then(result => {
    const data = result.data
    if (data.length) {
      this.setData({
        reviewList: data
      })
    }
  }).catch(err => {
    console.error(err)
  })
},
```

别忘了在文件上方加入：

```js
const db = require('../../utils/db')
```

并清空 `data` 中的 `reviewList`：

```js
data: {
    product:{},
    reviewList: [],
  },
```

来到 `db.js`，加入函数定义：

```js
getReviews(productId) {
  return db.collection('review').where({
    productId,
  }).get()
},
```

注意：这一步中，如果没有显示出评论，有可能对于这一商品没有添加评论。若是这样，请在 `add-review` 中先添加简单的评论。还有一种可能，是 `review` 集合的权限没有设置好。请在该集合的权限中设置如下：

![img](https://s3.cn-north-1.amazonaws.com.cn/u-img/1de92d9a-05f2-438d-a966-a0e5fb663446)

#### 日期编码

日期编码是一个功能函数，于是我们决定在 `util.js` 中进行定义。

```js
formatTime(time, reg) {
  const date = typeof time === 'string' || typeof time === 'number' ? new Date(time) : time;
  const map = {};
  map.yyyy = date.getFullYear();
  map.yy = ('' + map.yyyy).substr(2);
  map.M = date.getMonth() + 1
  map.MM = (map.M < 10 ? '0' : '') + map.M;
  map.d = date.getDate();
  map.dd = (map.d < 10 ? '0' : '') + map.d;
  map.H = date.getHours();
  map.HH = (map.H < 10 ? '0' : '') + map.H;
  map.m = date.getMinutes();
  map.mm = (map.m < 10 ? '0' : '') + map.m;
  map.s = date.getSeconds();
  map.ss = (map.s < 10 ? '0' : '') + map.s;

  return reg.replace(/\byyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s\b/g, $1 => {
    return map[$1];
  });
},
```

这一部分并不是我们课程的重点，感兴趣的小伙伴可以咨询查询里面的详细信息。

回到我们的 `review.js` 中，我们先添加调用命令：

```js
const util = require('../../utils/util')
```

接着修改刚才的 `getReviews` 函数：

```js
getReviews(productId) {
  db.getReviews(productId).then(result => {
    const data = result.data
    if (data.length) {
      this.setData({
        reviewList: data.map(review => {
          review.createTime = util.formatTime(review.createTime, 'yyyy/MM/dd')
          return review
        })
      })
    }
  }).catch(err => {
    console.error(err)
  })
},
```

### 商品详情页获取评论信息

来到我们的云函数 `productDetail/index.js` ，在入口函数中我们添加获取评论总数的功能：

```js
// get the total count of reviews for current product
const reviewCountRes = await db.collection('review').where({
  productId: id,
}).count()
product.reviewCount = reviewCountRes.total
```

然后我们再获取评论信息中的第一条评论：

```js
// get the first review of current product
const firstReviewRes = await db.collection('review').where({
  productId: id,
}).limit(1).get()
product.firstReview = firstReviewRes.data[0]
```

这里我们用 `limit(1)` 来获取只包含第一个对象。但是由于 `firstReviewRes.data` 还是一个数组，所以我们需要 `firstReviewRes.data[0]` 来获取第一个评论。

所以整体的入口函数为：

```js
exports.main = async(event, context) => {
  const id = event.id

  // product detail
  const productRes = await db.collection('product').doc(id).get()
  const product = productRes.data

  // get the total count of reviews for current product
  const reviewCountRes = await db.collection('review').where({
    productId: id,
  }).count()
  product.reviewCount = reviewCountRes.total

  // get the first review of current product
  const firstReviewRes = await db.collection('review').where({
    productId: id,
  }).limit(1).get()
  product.firstReview = firstReviewRes.data[0]

  return product
}
```

注意：这一步中，如果你看到在详情页进入之后，显示的评论数是所有 `review` 列表中的评论总数之和，或者第一条评论并不是自己商品的评论，很可能是编译模式是从 `detail` 模式进入，这个时候，商品的 `id` 是丢失的。所以在上述代码中 `const id = event.id` 是没有任何意义的。当下面查找评论数量和第一条评论时，`productId: id` 没有定义的情况下，系统默认找全局的值代替。

如果上面的原因没有听懂也没有关系。我们改变编译模式从首页进入，然后点击商品。这个时候 `const id = event.id` 就会存在。然后就可以开心地看到想要的结果啦！

重新上传部署，来到 `detail.wxml` 中找到：

```html
<view class="review-count">{{1}} review(s)</view>
```

绑定真实数据：

```html
<view class="review-count">{{product.reviewCount}} review(s)</view>
```

找到：

```html
<view class='review-preview'>test</view>
```

替换为：

```html
<view class='review-preview'>{{product.firstReview.content}}</view>
```

最后，回到 `detail.js`，重新修改 `onTapReviewEntry` 事件。通过判断评论数决定是否跳转。当评论数大于 0 时，允许跳转；当没有评论数时，不做任何操作。

```js
onTapReviewEntry() {
  if (this.data.product.reviewCount) {
    const product = this.data.product
    wx.navigateTo({
      url: `/pages/review/review?productId=${product._id}&price=${product.price}&name=${product.name}&image=${product.image}`,
    })
  }
},
```

### 选择图片

来到 `add-review.wxml` 中，在文字输入框的下方添加一个上传图片的按钮。

```html
<image class="opr-upload" src="/images/upload.png" bindtap="chooseImage"></image>
```

其中，我们也定义了一个点击事件 `chooseImage`。

我们来到 `add-review.js` 中，首先在 `data` 中新增变量 `previewImages`。

```js
data: {
    product: {},
    reviewValue: '',
    userInfo: null,
    previewImages: []
  },
```

由于用户上传的图片可能是多张，所以我们初始化是一个空的列表。注意这个列表里面的元素我们希望是一个路径，而非图片。图片的路径可以作为 `src` 属性传入给 `<image>` 组件。

接着，我们就来定义 `chooseImage` 事件。

```js
chooseImage() {
  wx.chooseImage({
    count: 3,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: res => {
      this.setData({
        previewImages: res.tempFilePaths
      })
    }
  })
},
```

这里，我们用到了小程序提供的接口 `wx.chooseImage`。这个接口从本地相册选择图片或使用相机拍照。

具体的细节我们可以参考 [文档](https://developers.weixin.qq.com/miniprogram/en/dev/api/media-picture.html)

我们可以让用户最多上传 3 张图片。这里选择的大小为 `'compressed'` 大小，来源可以选择相册，也可以选择相机拍摄。

在 `add-review.wxss` 中加入相应的样式。

```css
.opr-upload {
  display: block;
  margin-top: 29rpx;
  margin-left: 29rpx;
  width: 43rpx;
  height: 43rpx;
}
```

### 预览评论

预览图片的位置，我们定在上传图片的按钮之上。所以我们需要判断 `data` 中是否有选择的图片。若有则挪出空间展示图片。

回到 `add-review.wxml`。

```html
<view class="preview-content" wx:if="{{previewImages.length}}">
  <image class="preview-image" wx:for="{{previewImages}}" wx:key="*this" src="{{item}}" mode="aspectFill" bindtap="previewImage" data-src="{{item}}"></image>
</view>
```

这里， `data-src` 会给到事件中的数据。

来到 `add-review.js` 中定义 `previewImage` 事件。

```js
previewImage(event) {
  const target = event.currentTarget
  const src = target.dataset.src

  wx.previewImage({
    current: src,
    urls: [src]
  })
},
```

这里，我们用到了小程序提供的接口 `wx.previewImage`。这个接口可以在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。具体参数可以参考 [文档](https://developers.weixin.qq.com/miniprogram/en/dev/api/media-picture.html#wxpreviewimageobject)

加入这一部分的样式：

```css
.preview-content {
  display: flex;
  margin-top: 20rpx;
  margin-left: 20rpx;
}

.preview-image {
  margin-right: 10rpx;
  width: 180rpx;
  height: 180rpx;
  border-radius: 5rpx;
}
```

### 上传图片到云端

在 `add-review.js` 中定义一个 `uploadImage` 的函数。

```js
uploadImage(callback) {
  const previewImages = this.data.previewImages
  const images = []

  if (previewImages.length) {
    let imageCount = previewImages.length
    for (let i = 0; i < imageCount; i++) {
      db.uploadImage(previewImages[i]).then(result => {
        images.push(result.fileID)
        if (i === imageCount - 1) {
          callback && callback(images)
        }
      }).catch(err => {
        console.log('err', err)
      })
    }
  } else {
    callback && callback(images)
  }
},
```

这里，首先获取到现在图像的路径列表。然后建立一个空数组用以储存图像的一个 ID。这个就是用在云存储中的文件唯一 ID。这个 ID 会从调用 `db.uploadImage` 中获得。

遍历整个上传图的地址，然后将它们的 ID 放在这个 `imgaes` 列表中。

然后修改 `addReview`，调用 `uploadImage` 将图片和文字评价以及所有的商品信息都传到云端中。

```js
addReview(event) {
  let content = this.data.reviewContent
  if (!content) return

  wx.showLoading({
    title: 'Submitting...'
  })

  this.uploadImage(images => {
    db.addReview({
      username: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content,
      productId: this.data.product.productId,
      images,
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })

        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  })
},
```

之后，来到 `db.js`，来构建刚刚 `uploadImage` 所调用的 `db.uploadImage` 函数。

```js
uploadImage(imgPath) {
  return wx.cloud.uploadFile({
    cloudPath: `review/${util.getId()}`,
    filePath: imgPath,
  })
},
```

这个是云开发上传文件的用法。我们传进去一个用 `review/` 加上一个随机的 `Id` 来定义一个云文件存储地址。

这个随机的 `util.getId`，我们在 `util.js` 中进行定义：

```js
getId() {
  return Math.floor((1 + Math.random()) * 0x100000000).toString(16).slice(1)
},
```

这样就可以生成一个复杂的随机数。

来到云函数 `addReview/index.js`，来进行最后的修改。

```js
images: (event.images || []).join(';'),
```

这句标明我们将不同的图像云存储地址用分号连接，用以区别不同的图像云存储地址。当然，我们也考虑到了没有图像上传的可能性。我们用 `event.images||[]` 来表示。

### 评论页查看图片

在 `review.wxml` 中填入：

```html
<view class="preview-list" wx:if="{{item.images.length}}">
  <image class="preview-item" wx:for="{{item.images}}" wx:for-item="pitem" wx:for-index="pindex" wx:key="*this" src="{{pitem}}" mode="aspectFit"  bindtap="previewImage" data-src="{{pitem}}"></image>
</view>
```

可以看到我们绑定了 `review.js` 的 `images` 的数据，我们需要设置这个数据。

在 `review.js` 中：

```js
this.setData({
  reviewList: data.map(review => {
    review.createTime = util.formatTime(review.createTime, 'yyyy/MM/dd'),
    review.images = review.images ? review.images.split(';') : []
    return review
  })
})
```

其中 `review.images = review.images ? review.images.split(';') : []` 是后加的内容。

之后，我们在最后加入 `previewImage` 事件函数。

```js
previewImage(event) {
  let target = event.currentTarget
  let src = target.dataset.src

  wx.previewImage({
    current: src,
    urls: [src]
  })
},
```

加入样式：

```css
.preview-list {
  display: flex;
  margin-top: 16rpx;
}

.preview-item {
  margin-right: 10rpx;
  width: 180rpx;
  height: 180rpx;
  border-radius: 10rpx;
}
```

重新编译，我们在首页进入到有图像评论的商品页详情页中，再进入到详情页中，看看最后的效果。
