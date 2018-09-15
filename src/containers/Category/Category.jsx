import React, {Component} from "react"
import {connect} from 'react-redux'
import BScroll from 'better-scroll'

import SpecialItem from './SpecialItem/SpecialItem'
import CategoryItem from './CategoryItem/CategoryItem'
import './Category.styl'



import {getCategoryData} from '../../rudex/actions'


class Category extends Component {
  state = {
    isActive:0,
  };
  switchCategory=(index)=>{
    this.setState({
      isActive:index,
    })
  };
  _initScroll(){
    const navScroll = document.querySelector('.navScroll');
    const catetScroll = document.querySelector('.catetScroll');
    this.navScroll = new BScroll(navScroll,{
      click: true,
      scrollX:false,
      scrollY:true,
      probeType: 1,
      scrollbar:true
    });
    this.catetScroll = new BScroll(catetScroll,{
      click: true,
      scrollX:false,
      scrollY:true,
      probeType: 1,
      scrollbar:true
    });
  }
  componentWillMount(){
    this.props.getCategoryData()
  }
  componentDidUpdate(){
    if(!this.navScroll){
      this._initScroll()
    }
  }
  render() {
    const {category_data} = this.props;
    if(!category_data.length){
      return <div>
      </div>
    }

    const {isActive} = this.state;
    const showcategory = category_data[isActive];
    return <div className="category">
      <header className="header">
        <div className="search">
          <div className="content">
            <i className="icon"></i>
            搜索商品, 共13230款好物
          </div>
        </div>
      </header>
      <section className="section">
        <div className="navContiner">
          <div className="navScroll">
            <ul className="navList">
              {category_data.map((category,index)=>(
                <li className={isActive === index?'active':''} key={index} onClick = {()=>this.switchCategory(index)}>
                  <a className="txt" href="javascript:;">{category.name}</a>
                </li>
              ))}
          </ul>
        </div>
    </div>
    <div className="cateContiner">
      <div className="catetScroll">
        <div className="cates">
          <div className="banner" style={{backgroundImage: 'url('+showcategory.bannerUrl+')'}}></div>
        <div className="cateList" v-if="category_data.length">
          {showcategory.level?
            <CategoryItem showcategory = {showcategory}/>:
            <SpecialItem  showcategory = {showcategory}/>
          }
    </div>
  </div>
  </div>
  </div>
  </section>
  </div>
  }
}

export default connect(
  state => ({category_data:state.category_data}),
  {getCategoryData}
)(Category)