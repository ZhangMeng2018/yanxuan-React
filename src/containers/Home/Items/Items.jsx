import React, {Component} from "react"
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'

import './Items.styl'

export default class Items extends Component {
  static propTypes = {
    className:PropTypes.string.isRequired,
    ItemList:PropTypes.array.isRequired
  };
  componentDidMount(){
    const BSbox =document.getElementById(this.props.className);
    new BScroll(BSbox,{
      click: true,
      scrollX:true,
      scrollY:false
    });
  }
  render() {
    const {className,ItemList} =this.props;
    return <div className="ItemWarp">
      <header className={"header " +className}>
        <a className={className!=='newItemList'?'haowu':''}>
              {
                className==='newItemList'?
                  <span>新品首发</span>:
                  <span>人气推荐·好物精选</span>
              }
            <div>
                <span>
                  <span>查看全部</span>
                  <i className="right-icon"></i>
                </span>
            </div>
          </a>
      </header>
      <div id ={className} className="ItemList">
      <ul>
        {ItemList.map((item,index)=>(
          <li key={index}>
            <a>
              <div className="img-warp">
                <img src={item.listPicUrl}/>
              </div>
              <div className="item-name">
              <span>
                {item.name}
              </span>
              </div>
              <div className="item-desc">
                {item.simpleDesc}
              </div>
              <div className="item-price">￥{item.retailPrice}</div>
            </a>
          </li>
        ))}
        <li className="item-more">
          <a>
            <span>查看全部</span>
          </a>
        </li>
      </ul>
      </div>
    </div>
  }
}
