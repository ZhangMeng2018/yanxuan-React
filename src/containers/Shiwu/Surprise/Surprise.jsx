import React, {Component} from "react"
import PropTypes from 'prop-types'

import './Surprise.styl'

export default class Surprise extends Component {
  static propTypes = {
    surpise:PropTypes.object.isRequired
  };
  render() {
    const {surpise} = this.props;
    return  <a className="surprise">

                {surpise.picList?
                  <div className="imgWarp">
                    <div className="left-img" style={{backgroundImage:"url("+surpise.picList[0]+")"}}></div>
                    <div className="right-img">
                      <div className="up" style={{backgroundImage:"url("+surpise.picList[1]+")"}}></div>
                      <div className="down" style={{backgroundImage:"url("+surpise.picList[2]+")"}}></div>
                    </div>
                  </div>
                :<div className="imgWarp">
                  <div className="one-img" style={{backgroundImage:"url("+surpise.itemPicUrl+")"}}></div>
                </div>
                }

              <div className="desc">{surpise.content? surpise.content:surpise.title}</div>
            </a>
  }
}
