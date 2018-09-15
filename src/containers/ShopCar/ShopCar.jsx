import React, {Component} from "react"
import {withRouter} from 'react-router-dom'

import './ShopCar.styl'

export default class ShopCar extends Component {

  render() {
    return <div className="shopcar">
      <header className="header">
        <span className="logo">购物车</span>
        <div className="right">
          <a href="javascript:;">领券</a>
        </div>
      </header>
      <div className="serviceContiner">
        <ul className="servicePolicy">
          <li className="item">
            <i className="service-icon"></i>
            <span className="text">30天无忧退货</span>
          </li>
          <li className="item">
            <i className="service-icon"></i>
            <span className="text">48小时快速退款</span>
          </li>
          <li className="item">
            <i className="service-icon"></i>
            <span className="text">满88元免邮费</span>
          </li>
        </ul>
      </div>
      <div className="defaultPag">
        <div className="defaulContiner">
          <div className="img"></div>
          <div className="txt">
            <div className="noCart-login">
              <div className="noCart-title">去添加点什么吧</div>
              <div className="noCart-btn" onClick = {()=>this.props.history.replace("/personnelcenter")}>登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  }
}

withRouter(ShopCar);