import React, {Component} from "react"
import {withRouter} from 'react-router-dom'

import './HeaderGuide.styl'

class HeaderGuide extends Component {


  render() {
    const history = this.props.history;
    return <div className="headerContiner">
      <div className="headerWarp">
        <a className="home-icon" href="javascript:;" onClick={()=>history.replace('/home')}></a>
        <a className="logoWarp" href="javascript:;" onClick={()=>history.replace('/home')}>
          <i className="logo-icon"></i>
        </a>
        <div className="rightWarp">
          <a className="searchWarp" href="javascript:;" onClick={()=>history.replace('/search')}>
            <i className="search-icon"></i>
          </a>
          <a className="shopcarWarp" href="javascript:;" onClick={()=>history.replace('/shopcar')}>
            <i className="shop-icon"></i>
          </a>
        </div>
      </div>
  </div>
  }
}
export default withRouter(HeaderGuide);

