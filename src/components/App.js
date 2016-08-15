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


class AppComponent extends React.Component {
  //CD随机排布函数
  rearrange(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        constant = this.props.constant,
        centerPos = constant.centerPos,
        otherPos = constant.otherPos,

        //取出要居中的图片数组
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

    //布局要居中的图片,居中图片不需要旋转,图片居中true
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      isCenter: true
    };

    //布局其他位置的图片
    imgsArrangeArr.forEach(function(img,index){
      let position = otherPos[index];
      imgsArrangeArr[index] = {
        pos: {
          top: getRangeRandom(position[2],position[3]),
          left: getRangeRandom(position[0],position[1])
        },
        isCenter: false
      }

    });

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
        appW = appDOM.clientWidth,
        appH = appDOM.clientHeight,
        halfAppW = Math.ceil(appW / 2),
        halfAppH = Math.ceil(appH / 2);

    //获取CD图片组件的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.CD0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    //整个画布等分割为九块
    //[1,2,3]
    //[4,c,5]
    //[6,n,7]
    //计算单元格大小
    var unitW = Math.ceil((appW + imgW)/3),
        unitH = Math.ceil((appH + imgH)/3);

    //计算中心图片位置
    this.props.constant.centerPos = {
      left: halfAppW - halfImgW,
      top: halfAppH - halfImgH
    };

    //除中心外其他格子位置范围 [w1,w2,h1,h2] 1 < 2
    //第一行的单元格
    var temp;
    for(let i = 0;i < 3;i++){
      temp = new Array();
      temp.push(i * unitW - halfImgW);
      temp.push((i + 1) * unitW - halfImgW * 3);
      temp.push(-halfImgH);
      temp.push(unitH - halfImgH * 3);
      this.props.constant.otherPos.push(temp);
    }

    //第二第三行
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < 2; j++){
          temp = new Array();
          temp.push(j * 2 * unitW - halfImgW);
          temp.push((j * 2 + 1) * unitW - halfImgW * 3);
          temp.push(-halfImgH + unitH * (i + 1) );
          temp.push(-halfImgH * 3 + unitH * (i + 2) );
          this.props.constant.otherPos.push(temp);
      }
    }

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
    otherPos: [
      //[w1,w2,h1,h1]
    ],
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
