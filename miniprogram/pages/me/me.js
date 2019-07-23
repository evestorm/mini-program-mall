// pages/me/me.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onTapLogin(event) {
    const userInfo = event.detail.userInfo
    console.log(event)
    this.setData({
      userInfo
    })
  },

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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    }).catch(err => console.log('Not Authenticated yet'))
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})