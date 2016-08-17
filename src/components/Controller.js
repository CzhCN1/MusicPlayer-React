import React from 'react';

class Controller extends React.Component {
  //点击事件执行函数
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
  render() {
    //如果对应的图片居中，显示控制按钮的居中态
    var controllerUnitClassName = 'contollerUnit';

    controllerUnitClassName += this.props.arrange.isCenter ? ' is-center' : '';
    controllerUnitClassName += (this.props.arrange.isCenter && this.props.arrange.isPlay) ? ' is-play' : '';
    controllerUnitClassName += (this.props.arrange.isCenter && this.props.arrange.isPause) ? ' is-pause' : '';
    
    return (
      <span className = {controllerUnitClassName} onClick={this.handleClick.bind(this)}/>
    );
  }
}

Controller.defaultProps = {
};

export default Controller;
