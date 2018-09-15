import React, {Component} from "react"
import PropTypes from 'prop-types'

import './CateListContainer.styl'

export default class CateListContainer extends Component {
  static propTypes = {
    cateData:PropTypes.object.isRequired
  };
  state = {
    itemList:this.props.cateData.itemList.splice(0,7)
  };

  render() {
    const {itemList} = this.state;
    const {cateData} = this.props;
    return  <div className="cateListContainer">
      <h3 className="title">{this.props.cateData.name}好物</h3>
      <div className="cateList">
        <ul>
          {itemList.map((item,index)=>(
            <li key={index}>
              <a href="javascript:;">
                <div className="cate-header">
                  <div className="img-warp">
                    <img src={item.listPicUrl}/>
                  </div>
                  <p className="cate-info">{item.simpleDesc}</p>
                </div>
                {item.promTag? <div className="support">
                  <p>{item.promTag}</p>
                </div>:''}
                <div className="cate-name">
                  <span>{item.name}</span>
                </div>
                <div className="price">
                  <span>￥{item.retailPrice}</span>
                </div>
              </a>
            </li>
          ))}
        <li className="cate-more" key='8'>
          <a href="javascript:;">
            <p>更多{cateData.name}好物</p>
            <i className="right-icon"></i>
          </a>
      </li>
    </ul>
  </div>
  </div>
  }
}

