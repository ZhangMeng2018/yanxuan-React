import React, {Component} from "react"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import BScroll from 'better-scroll'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import CateListContainer from './CateListContainer/CateListContainer'
import Items from './Items/Items'
import './Home.styl'

import {getHomeData} from '../../rudex/actions'


class Home extends Component {
  static propTypes = {
    home_data:PropTypes.object.isRequired
  };
  state = {
    isActive:'tuijian',
    remainTime:0,
    isShowNews:true,
    isShowGotoTop:false
  };
  sclectet = (bannerName,e)=>{
      this.setState({
        isActive:bannerName
      });
    this.navInnerBS.scrollToElement(e.target,1000)

  };
  gotoTop =()=>{
    this.homeContinerBS.scrollTo(0,0,1000)
  };
  hour = ()=>{
    const hour = Math.floor(this.state.remainTime/(1000*60*60));
    return hour>10? hour : '0'+hour
  };
  mins= ()=>{
    const mins = Math.floor(this.state.remainTime/(1000*60)%60);
    return mins>10? mins : '0'+mins
  };
  secs = ()=>{
    const secs = Math.floor(this.state.remainTime/1000%60);
    return secs>10? secs : '0'+secs
  };
  closeNews = ()=>{
    this.setState({isShowNews:false});
  };
  _initScroll =()=>{
    const navInner = document.querySelector('.nav .navInner');
    const homeContiner = document.querySelector('.scrollBox');
    const topicScrollBox = document.querySelector('.topicScrollBox');
    this.homeSwiper = new Swiper('.swiper-container', {
      centeredSlides: true,
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
      pagination: {
        el: '.swiper-pagination'
      },
      loop:true
    });
    this.navInnerBS = new BScroll(navInner,{
      click: true,
      scrollX:true,
      scrollY:false
    });
    this.homeContinerBS = new BScroll(homeContiner,{
      click: true,
      scrollX:false,
      scrollY:true,
      probeType: 1,
      scrollbar:true
    });
    this.topicScrollBox = new BScroll(topicScrollBox,{
      click: true,
      scrollX:true,
      scrollY:false
    });
    this.homeContinerBS.on('scroll',({y}) =>{
    this.setState({
        isShowGotoTop:(Math.abs(y) >500 ? 1 : 0)
      })
    });
    this.homeContinerBS.on('scrollEnd',({y}) =>{
      this.setState({
        isShowGotoTop:(Math.abs(y) >500 ? 1 : 0)
      })
    });
    if(!this.timer){
      const {remainTime} = this.props.home_data.flashSaleIndexVO;
      this.setState({
        remainTime,
      });
      this.timer = setInterval(()=>{
        const remainTime = this.state.remainTime-1000;
        if(remainTime>0){
          this.setState({
            remainTime
          });
        }else {
          this.timer = null;
          this.setState({
            remainTime:0
          });
          return
        }
      },1000);
    }
  };
  componentWillMount(){
    this.props.getHomeData();
  }
  componentDidMount(){
    if (this.props.home_data.flashSaleIndexVO){
      this._initScroll();
    }
  }
  componentDidUpdate(){
    if(!this.navInnerBS){
      this._initScroll()
    }
  }

  render() {

    if (!this.props.home_data.freshmanFlag) {
      return <div>

      </div>;
    }

    const {headCateList,focusList,policyDescList,newItemList,popularItemList,flashSaleIndexVO,topicList,cateList} = this.props.home_data;
    const tagData = this.props.home_data.tagList.slice(0,4);
    const {isActive,isShowNews,isShowGotoTop} = this.state;
    return <div className="homeContiner">
      <header className="header">
        <div className="logo-search">
          <a href="javascript:;" className="logo"></a>
          <div className="search">
            <i className="search-icon"></i>
            <span>搜索商品，共13018款好物</span>
          </div>
        </div>
        <div className="nav">
          <div className="navInner">
            <ul className="navList">
              <li onClick={(e)=>this.sclectet("tuijian",e)}>
                <span className={isActive === 'tuijian'?'active':''}>推荐</span>
              </li>
              {headCateList.map((banner,index)=>(
                <li onClick = {(e)=>this.sclectet(banner.name,e)} key={index}>
                  <span className={isActive === banner.name ?'active':''}>{banner.name}</span>
                </li>
              ))}
            </ul>
        </div>
  </div>
  </header>
    <div className="scrollBox">
      <section className="section">
        <div className="swiper">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {
                focusList.map((slideItem,index)=>(
                  <div className="swiper-slide"  key={index}>
                    <img src={slideItem.picUrl}/>
                  </div>
                ))
              }
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="supports">
          <ul>
            {
                policyDescList.map((support,index)=>(
                <li key={index}>
                  <a>
                    <i></i>
                    <span>{support.desc}</span>
                  </a>
                </li>
              ))
            }
        </ul>
    </div>
  </div>
    <div className="brand">
      <header className="brand-header">
        <a>
          <span>品牌制造商直供</span>
          <i className="right-icon"></i>
        </a>
      </header>
      <div className="brand-goods">
        <ul>
          {tagData.map((tag,index)=>(
            <li className={!(index%2)/2?"goods left-goods":'goods'} key={index} >
              <a>
                <div className="content-goods">
                  <h4>{tag.name}</h4>
                  <div className="price">
                    <span className="price1">{tag.floorPrice}</span>
                    <span className="price2">元起</span>
                  </div>
                  {tag.newOnShelf? <i className="shangxin-icon"></i>:''}
                </div>
                <img src={tag.picUrl}/>
              </a>
            </li>
          ))}
      </ul>
    </div>
  </div>
    <Items className = 'newItemList' ItemList = {newItemList} v-if="home_data.newItemList"/>
    <Items className = 'popularItemList' ItemList = {popularItemList} v-if="home_data.popularItemList"/>
    <div className="limitTime" v-if="home_data.flashSaleIndexVO">
      <a>
        <div className="limitTime-warp">
          <div className="left-item">
            <div className="title">严选限时购</div>
            <div className="countdown">
              <span className="hours time" >{this.hour()}</span>
              <span className="colon" >:</span>
              <span className="mins time" >{this.mins()}</span>
              <span className="colon" >:</span>
              <span className="secs time" >{this.secs()}</span>
            </div>
            <div className="next-title">
              <span>下一场</span>
              <span >{moment(flashSaleIndexVO.nextStartTime).format("HH:mm")}</span>
              <span>开始</span>
            </div>
          </div>
          <div className="right-item">
            <div className="imgWarp">
              <img src={flashSaleIndexVO.primaryPicUrl}/>
            </div>
            <div className="price">
              <div className="nowPrice">
                <span className="rmb">￥</span>
                <span>{flashSaleIndexVO.activityPrice}</span>
              </div>
              <div className="originPrice">
                <span className="rmb">￥</span>
                <span>{flashSaleIndexVO.originPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div className="fuli">
      <a>
      </a>
    </div>
    <div className="topicList">
      <header className="topic-title">
        <a>
          <span>专题精选</span>
          <i className="icon-right"></i>
        </a>
      </header>
      <div className="topic-items">
        <div className="topicScrollBox">
          <ul>
            {topicList.map((topic,index)=>(
              <li key={index}>
                <a href="javascript:;">
                  <img src={topic.scenePicUrl}/>
                </a>
                <div className="item-price">
                  <h4>{topic.title}</h4>
                  <span>
                      {topic.priceInfo}元起
                    </span>
                </div>
                <div className="item-info">{topic.subtitle}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  </div>
        {
          cateList.map((cate,index)=>(
            <CateListContainer  cateData={cate} key={index}/>
          ))
        }
    <div className="downLoad-copyright">
      <div>
        <div className="downLoad">
          <a href="javascript:;">下载APP</a>
          <a href="javascript:;">电脑版</a>
        </div>
        <p className="copyright">
          <span>网易公司版权所有 © 1997-2018</span>
          <span>食品经营许可证：JY13301080111719</span>
        </p>
      </div>
    </div>
  </section>
  </div>
    {isShowGotoTop?<i className="gotoTop" onClick = {()=>this.gotoTop()}></i>:''}
    {isShowNews?
      <div className="newsWarp">
        <div className="mask"></div>
        <i className="close-button" onClick = {()=>this.closeNews()}></i>
        <div className="detail-wapr">
        <div className="content">
          <div className="xinren">
            <span className="title">新人专享礼</span>
          </div>
          <div className="subTitle">感谢使用网易严选, 已为你准备了一份专享礼</div>
          <div className="newItem">
            <div className="imgWarp">
              <img src="http://yanxuan.nosdn.127.net/15c8d56c8399c66338ca7a08bbb9ef9e.jpg?imageView&quality=85&thumbnail=232y232"/>
            </div>
            <div className="text">
              <div className="name">埃及进口长绒棉毛巾</div>
              <div className="manu">
                <span>Ralph Lauren</span>
              </div>
              <div className="price">
                <span className="nowPrice">￥32.00</span>
                <span className="originPrice">￥199.00</span>
              </div>
            </div>
          </div>
          <div className="actCouponBtn">
            <span>领券立减¥10.00</span>
          </div>
          <a href="javascript:;" className="checkMore">
            查看更多特惠商品
          </a>
        </div>
      </div>
    </div> :
      (<a href="javascript:;" className="newsEntrance">
        <i className="gift-icon"></i>
    </a>)}
  </div>
  }
}

export default connect(
  state => ({home_data:state.home_data}),
  {getHomeData}
)(Home)