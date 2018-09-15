import React, {Component} from "react"

import './PersonnelCenter.styl'
import logo1 from "../../assets/images/logo/logo1.png"

export default class PersonnelCenter extends Component {
  state = {
    phone:'',
    mail:'',
    password:'',
    smsNumber:'',
    ifSendSMS:false,
    showPage:''
  };
  isRightPhone=()=>{
    if (!this.state.phone.trim()) return false;
    return /^((13[0-9]{1})|(14[5|7]{1})|(15([0-3]|[5-9]){1})|(18[0,5-9]{1}))\d{8}$/.test(this.state.phone)
  };
  isRightPassword=()=>{
    if (!this.state.password.trim()) return false;
    return /^[a-zA-Z]+\d+\w{5,}$/.test(this.state.password)
  };
  isRightMail=()=>{
    if (!this.state.mail.trim()) return false;
    return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.state.mail)
  };
  isRightsmsNumber=()=>{
    return /\d{6}/.test(this.state.smsNumber)
  };
  AllInputRight=()=> {
    if(this.isRightPhone() && this.isRightPassword()){
      return true
    }
    return false
  };
  switchPage=(page)=>{
    this.setState({
      password:'',
      showPage:page
    })
  };
  toggolePhoneLogin=()=>{
    this.setState({
      password:'',
      smsNumber:'',
      ifSendSMS:!this.state.ifSendSMS
    })
  };
  getInPut = (type,e)=>{
    this.setState({
      [type]:e.target.value
    });
  };
  render() {
    const {showPage,ifSendSMS,phone,mail,password,smsNumber} = this.state;
    return <div className="loginContiner">
            {!showPage?
              <div className="loginTypesWrap">
                <div className="typesWarp">
                  <div className="logoWarp">
                    <img src={logo1}/>
                  </div>
                  <div className="btnWarp">
                    <div className="loginPhone-button redBtn" onClick={()=>this.switchPage('phone')}>
                      <i className="icon-loginPhone"></i>
                      <span>手机号码登录</span>
                    </div>
                    <div className="loginMail-button writeBtn" onClick={()=>this.switchPage('mail')}>
                      <i className="icon-loginMail"></i>
                      <span>邮箱帐号登录</span>
                    </div>
                    <div className="register-button" onClick={()=>this.switchPage('mail')}>
                      <span>手机号快捷注册</span>
                      <i className="icon-arrow-right"></i>
                    </div>
                  </div>
                  <div className="partnerWarp">
                    <div className="itemWarp">
                              <span className="item">
                                <i className="iconfont icon-weixin"></i>
                                <span className="name">微信</span>
                              </span>
                    </div>
                    <div className="itemWarp middleWarp">
                              <span className="item">
                                <i className="iconfont icon-qq"></i>
                                <span className="name">QQ</span>
                              </span>
                    </div>
                    <div className="itemWarp">
                              <span className="item">
                                <i className="iconfont icon-weibo"></i>
                                <span className="name">微博</span>
                              </span>
                    </div>
                  </div>
                </div>
              </div>:
              <div className="loginTypes">
                {showPage === 'phone'?
                  <div className="phoneLogin fromContiner">
                    <div className="logo">
                      <img src={logo1}/>
                    </div>
                    <div className="userForm">
                      <div className={this.isRightPhone()?'inputWarp inputRight':'inputWarp'}>
                        <input type="text" className="phone" placeholder="请输入手机号" maxLength="11" value={phone} onChange={(e)=>this.getInPut('phone',e)}/>
                      </div>
                      {!ifSendSMS?
                        <div className={this.isRightPassword()?'inputWarp inputRight':'inputWarp' }>
                          <input type="password" className="password" placeholder="请输入密码" value={password} onChange={(e)=>this.getInPut('password',e)}/>
                        </div>:
                        <div className={this.isRightPassword()?'inputWarp inputRight':'inputWarp' }>
                          <input type="password" className="password" placeholder="请输入短信验证码" maxLength="6" value={smsNumber} onChange={(e)=>this.getInPut('smsNumber',e)}/>
                          <a className="sendCode">获取验证码</a>
                        </div>
                      }
                      <div className="switchTypes smallWrod">
                          <span className="forgetPassword small">
                            忘记密码？
                          </span>
                        <span className="useSMS" onClick={()=>this.toggolePhoneLogin()}>
                      使用{ifSendSMS?'密码':'短信'}验证登录
                    </span>
                      </div>
                      <div className="loginBtnWarp">
                        <div className={this.isRightPassword()?"login-button redBtn right":"login-button redBtn"}>
                          <span>登录</span>
                        </div>
                        <div className="login-otherTypes writeBtn" onClick={()=>this.switchPage('')}>
                          <span>其他登录方式</span>
                        </div>
                      </div>
                    </div>
                  </div>:
                  <div className="mailLogin fromContiner">
                    <div className="logo">
                      <img src={logo1}/>
                    </div>
                    <div className="userForm">
                      <div className={this.isRightMail()?"inputWarp inputRight":"inputWarp"}>
                        <input type="text" className="mail" placeholder="邮箱账号" value={mail} onChange={(e)=>this.getInPut('mail',e)}/>
                      </div>
                      <div className={this.isRightPassword()?"inputWarp inputRight": "inputWarp"}>
                        <input type="password" className="password" placeholder="密码" value={password}  onChange={(e)=>this.getInPut('password',e)}/>
                      </div>
                      <div className="register smallWrod">
                          <span className="register small">
                            注册账号
                          </span>
                        <span className="forgetPassword small">
                            忘记密码
                          </span>
                      </div>
                      <div className="loginBtnWarp">
                        <div className={this.AllInputRight()?"login-button redBtn right":"login-button redBtn"}>
                          <span>登录</span>
                        </div>
                        <div className="login-otherTypes writeBtn" onClick={()=>this.switchPage('')}>
                          <span>其他登录方式</span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

}
}
