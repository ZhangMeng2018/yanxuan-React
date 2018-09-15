import React, {Component} from "react"
import PropTypes from 'prop-types'

import './CategoryItem.styl'

export default class CategoryItem extends Component {
  static propTypes = {
    showcategory:PropTypes.object.isRequired
  };
  render() {
    const {showcategory} = this.props;
    return <div className="cateListL2">
      <div className="title">{showcategory.name}</div>
      <ul className="list">
        {showcategory.subCateList.map((cate,index)=>(
          <li className="cateItem" key={index}>
            <a href="javascript:;">
              <div className="imgWarp">
                <img src={cate.wapBannerUrl}/>
              </div>
              <div className="name">{cate.name}</div>
            </a>
          </li>
        ))}
    </ul>
  </div>
  }
}

