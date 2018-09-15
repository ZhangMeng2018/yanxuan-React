import React, {Component} from "react"
import PropTypes from 'prop-types'

import './MainPosItem.styl'

export default class MainPosItem extends Component {
  static propTypes = {
    mainData: PropTypes.object.isRequired
  };

  render() {
    const {mainData} = this.props;
    return  <a className="mainPosItem" href="javascript:;">
              <div className="imgContiner" style={{backgroundImage:"url("+mainData.picUrl+")"}}>
              <div className="topicTag">
                <div className="tag">{mainData.typeName}</div>
              </div>
              </div>
              <div className="topicInfo">
                <div className="line1">
                  <div className="desc">{mainData.title}</div>
                  <div className="price">{mainData.priceInfo}元起</div>
                </div>
                <div className="line2">
                  {mainData.subTitle}
                </div>
              </div>
            </a>
  }
}

