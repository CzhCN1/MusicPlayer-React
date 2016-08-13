import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/app.scss';
// 引入CD组件
import CD from './CD.js';

var musicDatas = require('../data/music.json');

/**
 * 从json数据中得到路径
 * @type {[type]}
 */
 musicDatas = (function getImageURL(imageDatasArr){
   for(var i = 0, len = imageDatasArr.length; i < len ; i++){
     var singleImageData = imageDatasArr[i];
     singleImageData.imageURL = require('../images/' + singleImageData.name+'.jpg');
     imageDatasArr[i] = singleImageData;
   }
   return imageDatasArr;
 })(musicDatas);


 /**
  * 在区间内获取一个随机值
  * @param  {[type]} low  区间值左端点值
  * @param  {[type]} high 区间值右端点值
  * @return {[type]}      区间随机值
  */
 function getRangeRandom(low, high){
   return Math.ceil(Math.random() * (high - low ) + low)
 }

 /**
  * 生成一个随机角度(+30deg ~ -30deg)
  * @return {[type]} 生成的角度
  */
 function getDegRandom(){
   return (
     (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 31)
   )
 }


class AppComponent extends React.Component {
  //CD随机排布函数
  rearrange(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        constant = this.props.constant,
        centerPos = constant.centerPos,
        hPosApp = constant.hPosApp,
        vPosApp = constant.vPosApp,
        hPosAppLeftSecX = hPosApp.leftSecX,
        hPosAppRightSecX = hPosApp.rightSecX,
        hPosAppY = hPosApp.y,
        vPosAppTopY = vPosApp.topY,
        vPosAppX = vPosApp.x,

        //顶部区块的图片数组
        imgsArrangeTopArr = [],
        //顶部区块图片数 1
        topImgNum = 1,
        //顶部区块图片索引
        topImgSpliceIndex = 0,

        //取出要居中的图片数组
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

    //布局要居中的图片,居中图片不需要旋转,图片居中true
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    };

    //上部的图片索引
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
    //取出上部图片的数组
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
    //布局上部的图片
    imgsArrangeTopArr.forEach(function(value,index){
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosAppTopY[0],vPosAppTopY[1]),
          left: getRangeRandom(vPosAppX[0],vPosAppX[1])
        },
        rotate: getDegRandom(),
        isCenter: false
      }
    });

    //布局左右两侧的图片
    for(let i = 0,len = imgsArrangeArr.length,k = Math.floor(len / 2);i < len; i++){
      var hPosAppLORX = null;
      //前半部分布局在左侧,后半部分布局在右边
      if (i < k) {
          hPosAppLORX = hPosAppLeftSecX;
      } else {
          hPosAppLORX = hPosAppRightSecX;
      }
      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosAppY[0],hPosAppY[1]),
          left: getRangeRandom(hPosAppLORX[0],hPosAppLORX[1])
        },
        rotate: getDegRandom(),
        isCenter: false
      }
    }

    //把设置好状态的数组组合并成完整的图片列表
    if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
      imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

    //设置状态，重新渲染view
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });

  }
  //组件加载之后
  componentDidMount() {
    //获取视窗宽度和高度参数
    var appDOM = ReactDOM.findDOMNode(this.refs.app),
        appW = appDOM.scrollWidth,
        appH = appDOM.scrollHeight,
        halfAppW = Math.ceil(appW / 2),
        halfAppH = Math.ceil(appH / 2);

    //获取CD图片组件的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.CD0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    //计算中心图片位置
    this.props.constant.centerPos = {
      left: halfAppW - halfImgW,
      top: halfAppH - halfImgH
    };

    //计算左右区块位置范围(水平分布的CD)
    this.props.constant.hPosApp.leftSecX[0] = -halfImgW;
    this.props.constant.hPosApp.leftSecX[1] = halfAppW - halfImgW * 3;
    this.props.constant.hPosApp.rightSecX[0] = halfAppW + halfImgW;
    this.props.constant.hPosApp.rightSecX[1] = appW - halfImgW;
    this.props.constant.hPosApp.y[0] = -halfImgH;
    this.props.constant.hPosApp.y[1] = appH - halfImgH;

    //计算顶部区块位置范围
    this.props.constant.vPosApp.topY[0] = -halfImgH;
    this.props.constant.vPosApp.topY[1] = halfAppH - halfImgH * 3;
    this.props.constant.vPosApp.x[0] = halfAppW - imgW;
    this.props.constant.vPosApp.x[1] = halfAppW;

    this.rearrange(0);
  }

  //组件状态初始化
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr : [
        // {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   },
        //   rotate: 0,
        //   isInverse: false,
        //   isCenter: false,
        // }
      ]
    };
  }

  //APP组件渲染函数
  render() {
    //CD组件列表
    var CDs = [];

    musicDatas.forEach(function(value,index){
      //状态初始化
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      CDs.push(<CD data={value} key={index} ref={'CD'+index} arrange={this.state.imgsArrangeArr[index]}/>);
    }.bind(this));
    return (
      <section className="player" ref="app" >
        {CDs}
      </section>
    );
  }
}

AppComponent.defaultProps = {
  constant : {
    //中心位置
    centerPos: {
      left: 0,
      top: 0
    },
    //左右区块位置取值范围
    hPosApp: {
      leftSecX: [0,0],
      rightSecX: [0,0],
      y: [0,0]
    },
    //顶部区块的取值范围
    vPosApp: {
      x: [0,0],
      topY: [0,0]
    }
  }
};

export default AppComponent;
