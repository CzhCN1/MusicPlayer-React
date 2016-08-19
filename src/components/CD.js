import React from 'react';

class CD extends React.Component {
  //CD点击事件执行函数
  handleClick(e){
    if(this.props.arrange.isCenter){
      this.props.play();
    }else{
      this.props.center();
      this.props.play();
    }
    e.stopPropagation();
    e.preventDefault();
  }

  //右键处理函数
  //翻转CD，显示其背后内容
  handleRight(e){
    this.props.inverse();
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    //设置CD的位置样式
    var  CDstyle= this.props.arrange.pos;

    //设置中心图片的样式
    var styleObj = {
      backgroundImage : 'url(' + this.props.data.imageURL +')'
    };

    //添加类名
    var CDClassName = 'CD';
    CDClassName += this.props.arrange.isCenter ? ' isCenter' : '';
    CDClassName += (this.props.arrange.isCenter && this.props.arrange.isPlay) ? ' isPlay' : '';
    CDClassName += (this.props.arrange.isCenter && this.props.arrange.isPause) ? ' isPause' : '';

    CDClassName += this.props.arrange.isInverse ? ' isInverse' : '';

    return (
      <section className = {CDClassName} style={CDstyle} onClick={this.handleClick.bind(this)} onContextMenu={this.handleRight.bind(this)}>
        <div className = "centerImg" style={styleObj} />
        <div className = "centerBack">
          <h1>{this.props.data.name}</h1>
          <p>歌手: {this.props.data.singer}</p>
        </div>
      </section>
    );
  }
}

CD.defaultProps = {
};


export default CD;
