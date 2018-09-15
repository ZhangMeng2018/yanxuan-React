import React, {Component} from "react"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import MainPosItem from './MainPosItem/MainPosItem'
import MinorPosItem from './MinorPosItem/MinorPosItem'
import Surprise from './Surprise/Surprise'

import './Shiwu.styl'

import {getShiwuData} from '../../rudex/actions'

class Shiwu extends Component {
  state={
    isShowGotoTop:0,
    isAtBottom:false,
    showSurprise:4,
    isOverLoad:false
  };
  static propTypes = {
    shiwu_data:PropTypes.object.isRequired
  };
  gotoTop=()=>{
    this.shiwuContinerBS.scrollTo(0,0,1000)
  };
  _initScroll=()=>{
    const shiwuContiner = document.getElementById('scrollBox');
    const articleScroll = document.getElementById('article-scroll');
    const tenFifteenBS = document.getElementById('tenFifteenBS');
    this.shiwuContinerBS = new BScroll(shiwuContiner,{
      click: true,
      scrollX:false,
      scrollY:true,
      probeType: 1,
    });
    this.articleScroll = new BScroll(articleScroll,{
      click: true,
      scrollX:true,
      scrollY:false,
      probeType: 1,
    });
    this.tenFifteenScroll = new BScroll(tenFifteenBS,{
      click: true,
      scrollX:true,
      scrollY:false,
      probeType: 1,
    });
    this.shiwuContinerBS.on('scroll',({y}) =>{
      this.setState({
        isShowGotoTop:(Math.abs(y) >500 ? 1 : 0)
      });
      y < this.shiwuContinerBS.maxScrollY ? this.setState({isAtBottom:true})  : this.setState({isAtBottom:false})
    });
    this.shiwuContinerBS.on('scrollEnd',({y}) =>{
      this.setState({
        isShowGotoTop:(Math.abs(y) >500 ? 1 : 0)
      });
      y < this.shiwuContinerBS.maxScrollY ? this.setState({isAtBottom:true})  : this.setState({isAtBottom:false})
    });
  };
  moreSurprise=()=>{
    let findMore = this.props.shiwu_data.findMore;
    let showSurprise = this.state.showSurprise;
    if(this.state.isAtBottom  && this.state.showSurprise<=findMore.length){
        showSurprise+=4;
        this.setState({
          isAtBottom:false,
          showSurprise
        })
    }

    return findMore.slice(0,showSurprise)
  };
  componentWillMount(){
    this.props.getShiwuData();
  }
  componentDidUpdate(){
    if(!this.shiwuContinerBS){
      this._initScroll();
      new Swiper('.swiper-container',{
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: -5,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        loop:true
      });
    }
    this.shiwuContinerBS.refresh()
  }
  render() {
    if (!this.props.shiwu_data.banner){
      return <div>
      </div>
    }
    const {banner,column,recommendOne,recommendTwo,recommendThree,tenfifteen,zhenOne,zhenTwo,zhenThree,yxLook} = this.props.shiwu_data;
    const findMore = this.moreSurprise();
    return <div className="shiwuContiner">
      <div id="scrollBox">
        <section className="contentWarp">
          <div className="swiper">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {banner.map((banner,index)=>(
                  <a className="swiper-slide" key={index}>
                    <img src={banner.picUrl}/>
                    <div className="content">
                      <div className="subTitle">{banner.subTitle}</div>
                      <div className="title">{banner.title}</div>
                      <div className="desc">{banner.desc}</div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
      </div>
          <div className="article">
        <div id="article-scroll">
          <ul className="article-list">
            {column.map((col,index)=>(
              <li key={index}>
                <div className="img-container" style={{backgroundImage:"url("+col.picUrl+")"}}></div>
                <div className="article-count">
                  <div>{col.articleCount}</div>
                </div>
                <div className="title">{col.title}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
          <div className="recommends">
      <div className="contentContiner">
        <div className="commonTitle">为你推荐</div>
          <MainPosItem mainData={recommendOne}/>
          <MinorPosItem minorData={recommendTwo}/>
          <MinorPosItem minorData={recommendThree}/>
      </div>
    </div>
          <div className="tenFifteen">
      <div className="inner">
        <div className="title">十点一刻</div>
        <div id="tenFifteenBS">
          <div className="list">
            {
              tenfifteen.map((item,index)=>(
                <a className="main" href="javascript:;" key={index}>
                  <div className="line-title">
                    <span>今日话题</span>
                  </div>
                  <div className="title">{item.title}</div>
                  <div className="desc">{item.desc}</div>
                  <div className="joinInfo">
                    <div className="joininner">
                      {item.participantAvatar?
                        <div className="avatars">
                          {item.participantAvatar.map((avatar,index)=>(
                            avatar?<div className="avatar" key={index} v-if="avatar">
                              <img src={avatar} alt=""/>
                            </div>:''
                          ))}
                        </div>:''
                      }
                      <div className="joincount">
                        {item.participantNum}人参与话题
                      </div>
                    </div>
                  </div>
                </a>
              ))
            }
          <a className="more" href="javascript:;">
          <div className="inner">
            <div className="text">查看全部话题</div>
            <i className="right-icon"></i>
          </div>
        </a>
        </div>
      </div>
    </div>
    </div>
          <div className="commonTitle">严选臻品</div>
          <MainPosItem mainData={zhenOne}/>
          <MinorPosItem minorData={zhenTwo}/>
          <MinorPosItem minorData={zhenThree}/>
          <div className="exploreLook">
            <div className="commonTitle">严选LOOK</div>
            <div className="imgWarp">
              <img src={yxLook.picUrl}/>
            </div>
            <div className="topicInfo">
              <div className="author">
                <div className="avatar">
                  <img src={yxLook.avatar}/>
                </div>
                <div className="nickname">{yxLook.nickname}</div>
              </div>
              <div className="desc">
                {yxLook.content}
              </div>
            </div>
          </div>
          <div className="moreSurprises">
            <div className="lineTitle">
              <div>
                更多精彩
              </div>
            </div>
            {findMore.map((surpise,index)=>(
              <Surprise surpise = {surpise} key={index}/>
            ))}
        </div>
        </section>
      </div>
        {this.state.isShowGotoTop? <i className="gotoTop" onClick ={()=>this.gotoTop()} v-show="isShowGotoTop"></i>: ''}

    </div>
  }
}

export default connect(
  state => ({shiwu_data:state.shiwu_data}),
  {getShiwuData}
)(Shiwu)