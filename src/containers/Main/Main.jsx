import React, {Component} from "react"
import {connect} from 'react-redux'
import {Route, Switch,Redirect} from 'react-router-dom'

import './Main.styl'
import FooterGuide from '../../components/FooterGuide/FooterGuide'
import HeaderGuide from '../../components/HeaderGuide/HeaderGuide'
import Home from '../Home/Home'
import Shiwu from '../Shiwu/Shiwu'
import Category from '../Category/Category'
import ShopCar from '../ShopCar/ShopCar'
import PersonnelCenter from '../PersonnelCenter/PersonnelCenter'
import {getHomeData} from '../../rudex/actions'


class Main extends Component {
  render() {
    const {pathname} = this.props.location
    return (<div id='app'>
              <div className='contentContiner'>
                {(pathname ==='/shiwu'|| pathname==='/personnelcenter')? <HeaderGuide/>: '' }
                <Switch>
                  <Route path ='/home' component = {Home}/>
                  <Route path ='/shiwu' component = {Shiwu}/>
                  <Route path ='/category' component = {Category}/>
                  <Route path ='/personnelcenter' component = {PersonnelCenter}/>
                  <Route path ='/shopcar' component = {ShopCar}/>
                  <Redirect to = '/home'/>
                </Switch>
              </div>
              {pathname === '/personnelcenter' ? '' : <FooterGuide/>}
            </div>)
  }
}
export default connect(
  state=>({}),
  {}
)(Main)