import React, {Component} from "react"
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'

import './SpecialItem.styl'

export default class SpecialItem extends Component {
  static propTypes = {
    showcategory:PropTypes.object.isRequired
  };
  render() {
    const {showcategory} = this.props;
    return   <ul className="cateListL2">
      {showcategory.subCateList.map((cate,index)=>(
        <li className="cateItem"  key={index}>
          <a href="javascript:;">
            <div className="imgWarp">
              <img src={cate.bannerUrl}/>
            </div>
            <div className="name">{cate.name}</div>
          </a>
        </li>
      ))}
  </ul>
  }
}

