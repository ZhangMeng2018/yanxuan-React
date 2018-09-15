import React, {Component} from "react"
import PropTypes from 'prop-types'

import './MinorPosItem.styl'

export default class MinorPosItem extends Component {
  static propTypes = {
    minorData:PropTypes.object.isRequired
  };

  render() {
    const {minorData} = this.props;
    return <a className="minorPosItem" href="javascript:;">
              <div className="topicInfo">
                <div className="author">
                  <div className="avatar">
                    <img src={minorData.avatar}/>
                  </div>
                  <div className="nickname">{minorData.nickname}</div>
                </div>
                <div className="line1">
                  {minorData.title}
                </div>
                <div className="line2">
                  {minorData.subTitle}
                </div>
              </div>
              <div className="minorPic" style={{backgroundImage:"url("+minorData.picUrl+")"}}>
                <div className="topicTag">
                  <div className="tag">{minorData.typeName}</div>
                </div>
              </div>
          </a>
  }
}

