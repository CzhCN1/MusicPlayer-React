import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/app.scss';
// 引入CD组件
import CD from './CD.js';
//引入music组件
import Music from './Music.js';
//引入Controller组件
import Controller from './Controller.js';


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
  //键盘事件处理函数
  handleKeyPress(e){
    console.log('key press');
    e.stopPropagation();
    e.preventDefault();
  }

  //CD随机排布函数
  rearrange(centerIndex){
    var CDsArr = this.state.CDsArr,
        constant = this.props.constant,
        centerPos = constant.centerPos,
        otherPos = constant.otherPos,

        //取出要居中的图片数组
        CDsCenterArr = CDsArr.splice(centerIndex,1);

    //布局要居中的图片,居中图片不需要旋转,图片居中true
    CDsCenterArr[0] = {
      pos: centerPos,
      isCenter: true,
      isPlay: false,
      isPause : true,
      isInverse : false
    };

    //布局其他位置的图片
    CDsArr.forEach(function(img,index){
      let position = otherPos[index];
      CDsArr[index] = {
        pos: {
          top: getRangeRandom(position[2],position[3]),
          left: getRangeRandom(position[0],position[1])
        },
        isCenter: false,
        isPlay: false,
        isPause : true,
        isInverse : false
      }

    });
    //恢复回原数组
    CDsArr.splice(centerIndex,0,CDsCenterArr[0]);

    //设置状态，重新渲染view
    this.setState({
      CDsArr: CDsArr,
      index: centerIndex
    });

    //点击了其他CD,重载歌曲
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.load();
  }

  /**
   * 点击非居中图片，该图片居中并且播放
   * @param  {[type]} index 被点击图片的索引
   * @return {Function}      待执行函数
   */
  center (index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }


  /**
   *点击播放函数 负责更新播放状态
   */
  play (index){
    return function(){
      var CDsArr = this.state.CDsArr;
      //更新播放状态
      CDsArr[index].isPause = CDsArr[index].isPlay;
      CDsArr[index].isPlay = !CDsArr[index].isPlay;

      //设置state状态，重新渲染
      this.setState({
        CDsArr : CDsArr,
        index : index
      });

      //点击播放或者停止
      var audio = ReactDOM.findDOMNode(this.refs.audio);
      if(CDsArr[index].isPlay){
        audio.play();
        console.log('play');
      }else{
        audio.pause();
        console.log('paused');
      }

    }.bind(this);
  }

  //右键CD翻转状态更新
  inverse(index) {
    return function(){
      var CDsArr = this.state.CDsArr;
      //更新翻转状态
      CDsArr[index].isInverse = !CDsArr[index].isInverse;
      //设置state状态，重新渲染
      this.setState({
        CDsArr : CDsArr
      })
    }.bind(this);
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
      temp.push(-halfImgH/2);
      temp.push(unitH*1.1 - halfImgH * 3);
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
      CDsArr : [
        //默认格式
        // {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   },
        //   isPlay: false,
        //   isPause : true,
        //   isCenter: false,
        //   isInverse : false
        // }
      ],
      index : 0
    };
  }

  //APP组件渲染函数
  render() {
    //CD组件列表、控制组件列表
    var CDs = [],
        controllerUnits = [];

    musicDatas.forEach(function(value,index){
      //状态初始化
      if(!this.state.CDsArr[index]){
        this.state.CDsArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          isPlay: false,
          isPause : true,
          isCenter: false,
          isInverse : false
        }
      }
      //添加CD组件
      CDs.push(<CD data={value} key={index} ref={'CD'+index} arrange={this.state.CDsArr[index]} center={this.center(index)} play={this.play(index)} inverse={this.inverse(index)}/>);

      //添加控制组件
      controllerUnits.push(<Controller key={index} arrange={this.state.CDsArr[index]} center={this.center(index)} play={this.play(index)}/>)

      //只添加八首歌
      if(this.props.musics.length<8){
          this.props.musics.push(value.mp3URL);
      }

    }.bind(this));
    return (
      <section className="player" ref="app" onKeyPress = {this.handleKeyPress.bind(this)}>
        {CDs}
        <Music data={this.props.musics[this.state.index]} index={this.state.index} ref="audio" play={this.play(this.state.index)}/>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
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
    ]
  },
  musics : [
  ]
};

export default AppComponent;
