import React, {Component} from "react"

import {withRouter} from 'react-router-dom'
import './FooterGuide.styl'
import '../../common/stylus/mixins.styl'

class FooterGuide extends Component {
  navList=[{'home':'首页'},{'shiwu':'识物'},{'category':'分类'},{'shopcar':'购物车'},{'personnelcenter':'个人'}];
  goto=(path)=>{
    this.props.history.replace(path)
  };
  render() {
    return <ul className="footer-guide">
                {
                  this.navList.map((nav,index) =>(
                    <li onClick={()=>this.goto("/"+Object.keys(nav)[0])} key={index}>
                      <a href="javascript:;">
                        <i className={this.props.location.pathname === "/"+Object.keys(nav)[0]?'icon '+Object.keys(nav)[0]+'-icon active':'icon '+Object.keys(nav)[0]+'-icon'}></i>
                        <span className = {this.props.location.pathname === "/"+Object.keys(nav)[0]?'active':''}>{Object.values(nav)[0]}</span>
                      </a>
                    </li>
                  ))
                }

          </ul>
  }
}

export default withRouter(FooterGuide)